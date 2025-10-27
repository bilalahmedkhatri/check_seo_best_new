import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../animation_component';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import ParticleCanvas from './ParticleCanvas';
import { StarIcon } from './Icons';
import { createRipple } from '../../utils/ui';


const HeroSection: React.FC<{ ctaVariant: 'A' | 'B' }> = ({ ctaVariant }) => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const [startTyping, setStartTyping] = useState(false);
    const typedSubtitle = useTypingEffect("Automate your workflow from keyword research to content optimization and outrank your competitors.", 40, startTyping);

    useEffect(() => {
      const timer = setTimeout(() => setStartTyping(true), 500); // Start typing after intro animation
      return () => clearTimeout(timer);
    }, []);

    const titleText = "AI-Powered SEO Studio";
    const buttonText = ctaVariant === 'A' ? 'Start Your Free Trial' : 'Get Started for Free';

    return (
        <section ref={sectionRef} className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-brand-secondary animate-gradient-bg"></div>
            <ParticleCanvas />
            <div className="relative z-10 text-center w-full max-w-4xl px-4 py-20">
                <div className="animate-on-scroll fade-in mb-4">
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                        <div className="flex text-yellow-400"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                        <span className="text-sm font-medium">Rated 4.9/5 by 10,000+ Marketers</span>
                    </div>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight animate-on-scroll fade-in delay-100 animate-wave-text">
                    {titleText.split('').map((char, i) => <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char === ' ' ? ' ' : char}</span>)}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto h-14 animate-on-scroll fade-in delay-200">
                    {typedSubtitle}
                    <span className="inline-block w-0.5 h-6 bg-brand-primary ml-1 animate-pulse" style={{ opacity: typedSubtitle.length === 0 || typedSubtitle.length === 95 ? 1 : 0 }}></span>
                </p>
                <div className="mt-10 animate-on-scroll fade-in delay-400">
                    <Link to="/keywordResearch" onClick={createRipple} className="ripple-btn inline-block bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105 btn-pulse">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
