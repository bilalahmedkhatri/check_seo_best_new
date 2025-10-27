import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { useCountUp } from '../../hooks/useCountUp';

const StatsSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const [users, usersRef] = useCountUp(10000);
    const [keywords, keywordsRef] = useCountUp(50);
    const [audits, auditsRef] = useCountUp(25000);
    const [roi, roiRef] = useCountUp(300);

    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="animate-on-scroll fade-in"><span ref={usersRef} className="text-4xl font-bold text-brand-primary">{users.toLocaleString()}+</span><p className="text-gray-600 dark:text-gray-400 mt-2">Happy Users</p></div>
                    <div className="animate-on-scroll fade-in delay-100"><span ref={keywordsRef} className="text-4xl font-bold text-brand-primary">{keywords}M+</span><p className="text-gray-600 dark:text-gray-400 mt-2">Keywords Analyzed</p></div>
                    <div className="animate-on-scroll fade-in delay-200"><span ref={auditsRef} className="text-4xl font-bold text-brand-primary">{audits.toLocaleString()}+</span><p className="text-gray-600 dark:text-gray-400 mt-2">Audits Performed</p></div>
                    <div className="animate-on-scroll fade-in delay-300"><span ref={roiRef} className="text-4xl font-bold text-brand-primary">{roi}%</span><p className="text-gray-600 dark:text-gray-400 mt-2">Average ROI Increase</p></div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
