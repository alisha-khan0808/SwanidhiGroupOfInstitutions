"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { levelColors } from "@/components/CourseCard";
import { departments, levels, feeRanges, formatINR, getDepartment, type Course } from "@/data/courses";
import {
  Search, SlidersHorizontal, X, ChevronDown, ChevronUp,
  LayoutGrid, List, ArrowUpDown, Clock, GraduationCap,
} from "lucide-react";

const eligibilityGroups = [
  { label: "After 10th", test: (e: string) => /10th/i.test(e) },
  { label: "After 12th / I.Sc.", test: (e: string) => /10\+2|I\.Sc/i.test(e) && !/with (GNM|D)/i.test(e) },
  { label: "After Diploma (Lateral)", test: (e: string) => /10\+2 with (D|GNM)/i.test(e) },
  { label: "After Graduation", test: (e: string) => /graduation|pass out|pass$|B\.Sc|BCA|B\.P\.T|B\.O|B\.R|B\.M/i.test(e) && !/10\+2/i.test(e) },
];

const durationGroups = [
  { label: "1 Year", min: 0, max: 1 },
  { label: "2 Years", min: 1.01, max: 2 },
  { label: "3 – 3½ Years", min: 2.01, max: 3.5 },
  { label: "4 Years +", min: 3.51, max: Infinity },
];

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedDept, setSelectedDept] = useState(searchParams.get("department") || "");
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "");
  const [selectedEligibility, setSelectedEligibility] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedFee, setSelectedFee] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.fullName.toLowerCase().includes(q) ||
          c.eligibility.toLowerCase().includes(q) ||
          (getDepartment(c.department)?.name.toLowerCase().includes(q) ?? false)
      );
    }
    if (selectedDept) result = result.filter((c) => c.department === selectedDept);
    if (selectedLevel) result = result.filter((c) => c.level === selectedLevel);
    if (selectedEligibility) {
      const g = eligibilityGroups.find((e) => e.label === selectedEligibility);
      if (g) result = result.filter((c) => g.test(c.eligibility));
    }
    if (selectedDuration) {
      const g = durationGroups.find((d) => d.label === selectedDuration);
      if (g) result = result.filter((c) => c.durationYears >= g.min && c.durationYears <= g.max);
    }
    if (selectedFee) {
      const range = feeRanges.find((r) => r.label === selectedFee);
      if (range) result = result.filter((c) => c.totalFee >= range.min && c.totalFee <= range.max);
    }

    result.sort((a, b) => {
      if (sortBy === "fees_asc") return a.totalFee - b.totalFee;
      if (sortBy === "fees_desc") return b.totalFee - a.totalFee;
      if (sortBy === "duration") return a.durationYears - b.durationYears;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [courses, searchQuery, selectedDept, selectedLevel, selectedEligibility, selectedDuration, selectedFee, sortBy]);

  const activeFilters = [
    selectedDept && { key: "dept", label: getDepartment(selectedDept)?.shortName ?? selectedDept, clear: () => setSelectedDept("") },
    selectedLevel && { key: "level", label: selectedLevel, clear: () => setSelectedLevel("") },
    selectedEligibility && { key: "elig", label: selectedEligibility, clear: () => setSelectedEligibility("") },
    selectedDuration && { key: "dur", label: selectedDuration, clear: () => setSelectedDuration("") },
    selectedFee && { key: "fee", label: selectedFee, clear: () => setSelectedFee("") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const clearAll = () => {
    setSearchQuery(""); setSelectedDept(""); setSelectedLevel("");
    setSelectedEligibility(""); setSelectedDuration(""); setSelectedFee("");
  };

  const radio = (name: string, options: string[], value: string, onChange: (v: string) => void, count?: (o: string) => number) => (
    <div className="space-y-1">
      {options.map((o) => (
        <label key={o} className="flex items-center gap-2.5 py-1 cursor-pointer group">
          <input type="radio" name={name} checked={value === o} onChange={() => onChange(value === o ? "" : o)} onClick={() => value === o && onChange("")} className="accent-blue-600" />
          <span className="text-sm text-gray-700 group-hover:text-blue-600 flex-1">{o}</span>
          {count && <span className="text-xs text-gray-400">{count(o)}</span>}
        </label>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <h1 className="text-2xl font-bold text-gray-900">All Courses — Fees, Duration &amp; Eligibility</h1>
            <p className="text-gray-500 text-sm mt-1">
              Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of {courses.length} courses &bull; Fees shown are as per the current fee structure
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex gap-6">
            {/* ── Sidebar Filters ── */}
            <aside className={`shrink-0 w-64 space-y-4 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-gray-900">Filters</h2>
                  {activeFilters.length > 0 && (
                    <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-600 font-medium">
                      Clear All
                    </button>
                  )}
                </div>

                <FilterSection title="Department">
                  <div className="space-y-1">
                    {departments.map((d) => (
                      <label key={d.slug} className="flex items-center gap-2.5 py-1 cursor-pointer group">
                        <input
                          type="radio"
                          name="dept"
                          checked={selectedDept === d.slug}
                          onChange={() => setSelectedDept(d.slug)}
                          onClick={() => selectedDept === d.slug && setSelectedDept("")}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 flex-1">{d.icon} {d.shortName}</span>
                        <span className="text-xs text-gray-400">{courses.filter((c) => c.department === d.slug).length}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Course Level">
                  {radio("level", levels, selectedLevel, setSelectedLevel, (o) => courses.filter((c) => c.level === o).length)}
                </FilterSection>

                <FilterSection title="Eligibility">
                  {radio("elig", eligibilityGroups.map((e) => e.label), selectedEligibility, setSelectedEligibility)}
                </FilterSection>

                <FilterSection title="Duration">
                  {radio("dur", durationGroups.map((d) => d.label), selectedDuration, setSelectedDuration)}
                </FilterSection>

                <FilterSection title="Total Course Fee">
                  {radio("fee", feeRanges.map((r) => r.label), selectedFee, setSelectedFee)}
                </FilterSection>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 min-w-0">
              {/* Search + Sort Bar */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search course, e.g. Nursing, BMLT, LLB..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Clear search">
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`lg:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilters ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"}`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2.5">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="default">By Department</option>
                    <option value="fees_asc">Fees: Low to High</option>
                    <option value="fees_desc">Fees: High to Low</option>
                    <option value="duration">Shortest Duration</option>
                    <option value="name">Name (A–Z)</option>
                  </select>
                </div>

                <div className="hidden sm:flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Filter Chips */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeFilters.map((f) => (
                    <span
                      key={f.key}
                      className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      {f.label}
                      <button onClick={f.clear} className="hover:text-blue-900" aria-label={`Remove ${f.label}`}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button onClick={clearAll} className="text-xs text-red-500 font-medium px-2 hover:text-red-600">
                    Clear All ×
                  </button>
                </div>
              )}

              {/* Department Quick Filter Chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
                <button
                  onClick={() => setSelectedDept("")}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 ${!selectedDept ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                >
                  All
                </button>
                {departments.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => setSelectedDept(selectedDept === d.slug ? "" : d.slug)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0 ${selectedDept === d.slug ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                  >
                    {d.icon} {d.shortName}
                  </button>
                ))}
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <p className="text-5xl mb-4">🔍</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                  <button onClick={clearAll} className="text-blue-600 font-semibold underline">Clear all filters</button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((course) => (
                    <CourseListCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ── Collapsible filter section ──
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

// ── List view card ──
function CourseListCard({ course }: { course: Course }) {
  const dept = getDepartment(course.department);
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all p-4 flex gap-4 cursor-pointer group">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
          <Image src={course.image} alt={course.name} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{course.name}</h3>
              <p className="text-gray-500 text-xs mt-0.5 truncate">{course.fullName}</p>
            </div>
            <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level] ?? "bg-gray-100 text-gray-700"}`}>
              {course.level}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{course.eligibility}</span>
          </div>
          <div className="flex flex-wrap gap-6 mt-2">
            <div>
              <p className="text-xs text-gray-400">Department</p>
              <p className="text-sm font-semibold text-gray-700">{dept?.shortName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">1st Year Fee</p>
              <p className="text-sm font-bold text-blue-600">{formatINR(course.yearlyFees[0] ?? 0)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Course Fee</p>
              <p className="text-sm font-bold text-green-600">{formatINR(course.totalFee)}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
