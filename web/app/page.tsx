import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { UsersSection } from "@/components/users-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AppStoreSection } from "@/components/app-store-section"
import { FAQSection } from "@/components/faq-section"

export default function Home() {
  return (
    <>
      <main className="flex justify-center flex-col items-center">
        <HeroSection />
        <FeaturesSection id="features" />
        <UsersSection id="users" />
        <StatsSection />
        <TestimonialsSection id="testimonials" />
        <AppStoreSection />
        <FAQSection id="faq" />
      </main>

    </>
  )
}

