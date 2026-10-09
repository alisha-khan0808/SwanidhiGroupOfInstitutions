import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DepartmentSection from "@/components/DepartmentSection";
import CampusLifeSection from "@/components/CampusLifeSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import PromoBanners from "@/components/PromoBanners";
import ProgramsSection from "@/components/ProgramsSection";
import ReviewsSection from "@/components/ReviewsSection";
import HowItWorks from "@/components/HowItWorks";
import DeadlineBanner from "@/components/DeadlineBanner";
import CourseFinder from "@/components/CourseFinder";
import ScholarshipFinder from "@/components/ScholarshipFinder";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getBlogs, getCourses, getScholarships } from "@/lib/content";

export const revalidate = 3600;

// Section order follows the reference design (collegeforme.in).
export default async function HomePage() {
  const [courses, blogs, scholarships] = await Promise.all([getCourses(), getBlogs(), getScholarships()]);

  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />
      <DepartmentSection courses={courses} />
      <FeaturedCourses courses={courses} />
      <PromoBanners />
      <ProgramsSection courses={courses} />
      <CampusLifeSection />
      <ReviewsSection />
      <HowItWorks />
      <DeadlineBanner />
      <CourseFinder courses={courses} />
      <ScholarshipFinder scholarships={scholarships} />
      <BlogPreview blogs={blogs} />
      <CTASection />
      <Footer />
    </main>
  );
}
