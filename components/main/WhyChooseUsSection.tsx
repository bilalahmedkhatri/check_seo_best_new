import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { CheckIcon, AnalyticsIcon } from './Icons';

const WhyChooseUsSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const advantages = [
        'Unified All-in-One Workflow',
        'Powered by Google\'s Gemini AI',
        'Actionable, Data-Driven Insights',
        'Automated Content Briefs & Audits',
        'Intuitive & Beginner-Friendly',
        'Cost-Effective vs. Multiple Tools'
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-on-scroll slide-in-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Smarter Way to Do SEO</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Stop juggling multiple, expensive, and complicated tools. Our integrated AI suite gives you a decisive edge by combining cutting-edge technology with a seamless user experience.</p>
                    <ul className="space-y-4">
                        {advantages.map((adv, i) => (
                            <li key={i} className="flex items-center text-lg animate-on-scroll fade-in" style={{transitionDelay: `${i * 100 + 200}ms`}}>
                                <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center mr-3"><CheckIcon /></span>
                                <span className="text-gray-800 dark:text-gray-200">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="animate-on-scroll slide-in-right">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl relative aspect-[4/3]">
                         <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop" alt="Dashboard analytics" className="rounded-lg w-full h-full object-cover" />
                         <div className="absolute -bottom-4 -right-4 bg-brand-primary text-white p-4 rounded-lg shadow-lg">
                            <AnalyticsIcon />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
