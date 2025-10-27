import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { StarIcon } from './Icons';

const TestimonialsSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const testimonials = [
        { name: 'Jessica Miller', role: 'Marketing Manager, TechCorp', quote: 'This tool is a game-changer. We consolidated three different subscriptions into this one platform and our content workflow has never been smoother. The AI briefs are incredibly accurate and save us hours each week.' },
        { name: 'David Chen', role: 'Owner, Digital Leap Agency', quote: 'As an agency, efficiency is everything. The SEO Audit and SERP analysis tools allow us to onboard new clients and deliver value faster than ever. The reports are comprehensive and easy for clients to understand.' },
        { name: 'Sophie Carter', role: 'Full-Time Blogger & Creator', quote: 'I was intimidated by SEO, but this tool makes it so accessible. The Keyword Strategist helped me build a content plan that doubled my organic traffic in three months. I finally feel like I\'m in control of my growth.' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">Don't Just Take Our Word For It</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col animate-on-scroll scale-in delay-${i * 100 + 100}`}>
                            <div className="flex text-yellow-400 mb-4"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 text-left flex-grow">"{t.quote}"</p>
                            <div className="flex items-center mt-auto">
                                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-4 flex-shrink-0"></div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-left">{t.name}</p>
                                    <p className="text-sm text-brand-primary text-left">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
