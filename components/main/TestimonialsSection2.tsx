import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { StarIcon } from './Icons';

const TestimonialsSection2: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const testimonials = [
        { name: 'Alex Johnson', role: 'E-commerce Store Owner', quote: 'The on-page optimizer is like having an SEO expert on call 24/7. My product page rankings have seen a significant boost since I started using the recommendations.', color: 'bg-blue-50 dark:bg-blue-900/50' },
        { name: 'Maria Garcia', role: 'Freelance Content Writer', quote: 'This tool has streamlined my entire writing process. The AI briefs give me a perfect roadmap, and I can deliver SEO-optimized content to my clients with confidence every single time.', color: 'bg-green-50 dark:bg-green-900/50' },
        { name: 'Tom Iwinski', role: 'Founder, Startup SaaS', quote: 'As a startup, we need to be smart with our budget. This platform gives us the power of an entire SEO team at a fraction of the cost. It\'s been instrumental in our early-stage growth.', color: 'bg-yellow-50 dark:bg-yellow-900/50' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">More Praise From Our Users</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`p-8 rounded-xl shadow-lg flex flex-col animate-on-scroll scale-in delay-${i * 100 + 100} ${t.color}`}>
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

export default TestimonialsSection2;
