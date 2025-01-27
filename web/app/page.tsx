import { AppStoreSection } from "@/components/app-store-section";
import { FAQSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navigation } from "@/components/navigation";
import { StatsSection } from "@/components/ststs-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { UsersSection } from "@/components/users-section";

export default async function Home() {
  return (
    <main className="flex justify-center flex-col items-center bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection id="features" />
        <UsersSection id="users" />
        <StatsSection />
        <TestimonialsSection id="testimonials" />
        <AppStoreSection />
        <FAQSection id="faq" />
      </main>
      <Footer />
      
    </main>
  );
}
