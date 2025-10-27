import React from 'react';
import { useScrollAnimation } from '../../animation_component';
import { CheckCircleIcon, XCircleIcon } from './Icons';

const ComparisonSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const comparisonPoints = [
        { feature: 'Core Technology', ours: 'AI-Powered (Gemini)', theirs: 'Manual / Rule-Based' },
        { feature: 'Workflow', ours: 'All-in-One Integrated Suite', theirs: 'Multiple Disconnected Tools' },
        { feature: 'Insights', ours: 'Actionable, Predictive', theirs: 'Raw Data & Metrics' },
        { feature: 'Ease of Use', ours: 'Intuitive for All Levels', theirs: 'Steep Learning Curve' },
        { feature: 'Cost', ours: 'Single, Affordable Subscription', theirs: 'Multiple Expensive Subscriptions' },
        { feature: 'Speed', ours: 'Near-Instant Analysis', theirs: 'Slow, Manual Research' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-on-scroll fade-in">The AI Studio Advantage</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll fade-in delay-100">See how our integrated AI-powered suite stacks up against traditional, fragmented SEO tools.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-green-50 dark:bg-green-900/50 rounded-xl shadow-lg border-2 border-green-500 p-8 animate-on-scroll slide-in-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">AI SEO Studio</h3>
                        <ul className="space-y-4">
                            {comparisonPoints.map((point, i) => (
                                <li key={i} className="flex items-start animate-on-scroll fade-in" style={{transitionDelay: `${i * 100 + 200}ms`}}>
                                    <CheckCircleIcon />
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{point.feature}</p>
                                        <p className="text-gray-600 dark:text-gray-300">{point.ours}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 animate-on-scroll slide-in-right">
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Traditional Tools</h3>
                         <ul className="space-y-4">
                            {comparisonPoints.map((point, i) => (
                                <li key={i} className="flex items-start animate-on-scroll fade-in" style={{transitionDelay: `${i * 100 + 300}ms`}}>
                                    <XCircleIcon />
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200">{point.feature}</p>
                                        <p className="text-gray-600 dark:text-gray-400">{point.theirs}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
