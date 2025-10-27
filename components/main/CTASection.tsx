import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../animation_component';
import { createRipple } from '../../utils/ui';

const CTASection: React.FC<{ ctaVariant: 'A' | 'B' }> = ({ ctaVariant }) => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const buttonText = ctaVariant === 'A' ? 'Claim Your Free Trial' : 'Unlock All Features Now';

    return (
        <section ref={sectionRef} className="relative bg-gray-900 text-white overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary animate-gradient-bg"></div>
            <div className="relative w-full mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 animate-on-scroll fade-in">Ready to Dominate the SERPs?</h2>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 animate-on-scroll fade-in delay-100">
                    Join thousands of marketers who are saving time and getting better results. Start your free, no-risk 7-day trial today.
                </p>
                <div className="animate-on-scroll fade-in delay-200">
                    <Link to="/keywordResearch" onClick={createRipple} className="ripple-btn inline-block bg-white hover:bg-gray-200 text-brand-primary font-bold py-4 px-10 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all duration-300 transform hover:scale-105">
                        {buttonText}
                    </Link>
                    <p className="mt-4 text-sm text-gray-300">No credit card required.</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
