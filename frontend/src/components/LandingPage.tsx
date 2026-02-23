import LandingHeader from "./LandingHeader";
import HeroSection from "./landing/HeroSection";
import ProblemSection from "./landing/ProblemSection";
import BenefitsSection from "./landing/BenefitsSection";
import FeaturesSection from "./landing/FeaturesSection";
import SecurityFreeSection from "./landing/SecurityFreeSection";
import StatsSection from "./landing/StatsSection";
import HowItWorksSection from "./landing/HowItWorksSection";
import FAQSection from "./landing/FAQSection";
import CTASection from "./landing/CTASection";
import LandingFooter from "./LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <BenefitsSection />
        <FeaturesSection />
        <SecurityFreeSection />
        <StatsSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
