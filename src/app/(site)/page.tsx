import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DepartmentSection from "@/components/DepartmentSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import ScholarshipPreview from "@/components/ScholarshipPreview";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";
import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import CampusLifeSection from "@/components/CampusLifeSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import { getBlogs, getCourses, getScholarships } from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const [courses, blogs, scholarships] = await Promise.all([getCourses(), getBlogs(), getScholarships()]);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <DepartmentSection courses={courses} />
      <AboutSection />
      <AchievementsSection />
      <FeaturedCourses courses={courses} />
      <CampusLifeSection />
      <ReviewsSection />
      <ScholarshipPreview scholarships={scholarships} />
      <BlogPreview blogs={blogs} />
      <CTASection />
      <Footer />
    </main>
  );
}
