import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
    return (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-primary text-white shadow-lg hover:bg-brand-secondary transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Scroll to top">
            <ArrowUpIcon />
        </button>
    );
};

export default ScrollToTopButton;
