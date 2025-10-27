import React, { useState } from 'react';
import { useScrollAnimation } from '../../animation_component';
import { ChevronDownIcon } from './Icons';

const FAQSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const faqs = [
        { q: "Who is this SEO tool for?", a: "Our platform is designed for marketers, SEO agencies, content creators, and small business owners who want to improve their online visibility and drive organic traffic without the steep learning curve of traditional SEO tools." },
        { q: "Is there a free trial?", a: "Yes! We offer a 7-day free trial with full access to all our features. No credit card is required to get started. You can explore the entire platform and see the value for yourself before committing." },
        { q: "What makes your AI different?", a: "We leverage the latest models from Google's Gemini API, fine-tuned for SEO-specific tasks. This allows us to provide more nuanced, accurate, and actionable insights compared to generic AI writers or outdated SEO tools." },
        { q: "Can I cancel my subscription at any time?", a: "Absolutely. You can cancel your subscription at any time directly from your account dashboard. There are no long-term contracts or hidden fees. You have full control over your subscription." },
        { q: "Do you offer support?", a: "Yes, we offer 24/7 email support to all our customers. Our team of SEO experts is always ready to help you with any questions or issues you may have while using the platform." },
    ];

    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg animate-on-scroll slide-in-left shadow-sm" style={{transitionDelay: `${index * 100}ms`}}>
                            <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex justify-between items-center p-4 sm:p-6 text-left">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                                <span className={`${openFAQ === index ? 'transform rotate-180' : ''}`}><ChevronDownIcon /></span>
                            </button>
                            <div className={`faq-content ${openFAQ === index ? 'open' : ''}`}>
                                <p className="text-gray-600 dark:text-gray-300 px-4 sm:px-6">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
