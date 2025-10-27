import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../animation_component';
import { createRipple } from '../../utils/ui';
import { CheckIcon } from './Icons';

const PricingSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const plans = [
        {
            name: 'Starter',
            price: '29',
            description: 'For individuals and small projects.',
            features: [
                '50 Keyword Lookups / mo',
                '25 SERP Analyses / mo',
                '10 Content Briefs / mo',
                '5 SEO Audits / mo',
                'Email Support'
            ],
            popular: false
        },
        {
            name: 'Pro',
            price: '79',
            description: 'For professionals & growing businesses.',
            features: [
                'Everything in Starter, plus:',
                '500 Keyword Lookups / mo',
                '200 SERP Analyses / mo',
                '100 Content Briefs / mo',
                '50 SEO Audits / mo',
                'Priority Email Support'
            ],
            popular: true
        },
        {
            name: 'Agency',
            price: '199',
            description: 'For agencies and large teams.',
            features: [
                'Everything in Pro, plus:',
                'Unlimited Keyword Lookups',
                'Unlimited SERP Analyses',
                'Unlimited Content Briefs',
                'Unlimited SEO Audits',
                'Dedicated Account Manager'
            ],
            popular: false
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-on-scroll fade-in">Find the Perfect Plan</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 animate-on-scroll fade-in delay-100">Simple, transparent pricing for teams of all sizes. Start your 7-day free trial now.</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full flex flex-col animate-on-scroll scale-in delay-${i * 100 + 200} ${plan.popular ? 'border-2 border-brand-primary transform lg:scale-105' : 'border border-gray-200 dark:border-gray-700'}`}>
                            {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">{plan.description}</p>
                            <div className="my-8">
                                <span className="text-5xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                                <span className="text-lg text-gray-500 dark:text-gray-400">/ month</span>
                            </div>
                            <ul className="space-y-4 text-left text-gray-600 dark:text-gray-300 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5"><CheckIcon /></span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/keywordResearch" onClick={createRipple} className={`ripple-btn block w-full text-center font-bold py-3 px-6 rounded-lg mt-8 transition-colors duration-300 ${plan.popular ? 'bg-brand-primary hover:bg-brand-secondary text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'}`}>
                                Choose Plan
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
