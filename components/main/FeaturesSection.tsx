import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { SEOIcon, AnalyticsIcon, ContentIcon } from './Icons';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const features = [
        { icon: <SEOIcon/>, title: "Keyword Research", description: "Uncover valuable long-tail, LSI, and question-based keywords." },
        { icon: <AnalyticsIcon/>, title: "SERP Monitoring", description: "Analyze real-time SERPs and get actionable recommendations." },
        { icon: <ContentIcon/>, title: "AI Content Briefs", description: "Generate comprehensive, SEO-optimized content briefs in seconds." },
        { icon: <SEOIcon/>, title: "On-Page Optimizer", description: "Analyze your content against SEO best practices and get scores." },
        { icon: <AnalyticsIcon/>, title: "AI Keyword Strategist", description: "Build powerful topic cluster strategies to establish topical authority." },
        { icon: <ContentIcon/>, title: "AI Website SEO Audit", description: "Conduct a comprehensive health check of your website." },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-on-scroll fade-in">One Platform, Endless SEO Power</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 animate-on-scroll fade-in delay-100">From initial research to final audit, our toolkit streamlines your entire SEO process.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 100} />)}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
