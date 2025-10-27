import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { InputIcon, InsightIcon, RankIcon } from './Icons';

const HowItWorksSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const steps = [
        { icon: <InputIcon />, title: 'Input & Analyze', description: 'Enter a topic, keyword, or URL. Our Gemini-powered AI gets to work instantly, analyzing SERPs and competitors in real-time.' },
        { icon: <InsightIcon />, title: 'Get AI Insights', description: 'Receive comprehensive reports, from long-tail keyword lists to full content briefs and technical audit checklists.' },
        { icon: <RankIcon />, title: 'Optimize & Rank', description: 'Implement our clear, actionable recommendations to optimize your content and technical SEO, then watch your rankings climb.' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">Achieve SEO Success in 3 Simple Steps</h2>
                <div className="relative grid md:grid-cols-3 gap-12">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                    {steps.map((step, i) => (
                        <div key={i} className={`relative animate-on-scroll fade-in delay-${i * 100 + 100}`}>
                            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-brand-primary/10 text-brand-primary border-4 border-white dark:border-gray-900">
                                <span className="text-4xl font-bold">{i + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
