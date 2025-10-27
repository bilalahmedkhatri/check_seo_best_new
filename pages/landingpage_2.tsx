import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useABTest } from '../hooks/useABTest';
import ScrollProgressBar from '../components/main/ScrollProgressBar';
import HeroSection from '../components/main/HeroSection';
import StatsSection from '../components/main/StatsSection';
import FeaturesSection from '../components/main/FeaturesSection';
import HowItWorksSection from '../components/main/HowItWorksSection';
import WhyChooseUsSection from '../components/main/WhyChooseUsSection';
import ComparisonSection from '../components/main/ComparisonSection';
import TestimonialsSection from '../components/main/TestimonialsSection';
import PricingSection from '../components/main/PricingSection';
import TestimonialsSection2 from '../components/main/TestimonialsSection2';
import FAQSection from '../components/main/FAQSection';
import CTASection from '../components/main/CTASection';


// --- Main Landing Page Component ---
const LandingPage2: React.FC = () => {
    const ctaVariant = useABTest('primaryCtaTest');
    return (
        <div className="bg-white dark:bg-gray-900">
            <Header />
            <ScrollProgressBar />
            <main>
                <HeroSection ctaVariant={ctaVariant} />
                <StatsSection />
                <FeaturesSection />
                <HowItWorksSection />
                <WhyChooseUsSection />
                <ComparisonSection />
                <TestimonialsSection />
                <PricingSection />
                <TestimonialsSection2 />
                <FAQSection />
                <CTASection ctaVariant={ctaVariant} />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage2;