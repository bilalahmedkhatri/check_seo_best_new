import React, { useRef } from 'react';

const FeatureCard: React.FC<{ icon: React.ReactElement, title: string, description: string, delay: number }> = ({ icon, title, description, delay }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        const rotateX = (y - 0.5) * 20;
        const rotateY = (x - 0.5) * -20;
        cardRef.current.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    };
    return (
        <div className="card-3d-wrapper animate-on-scroll scale-in" style={{ transitionDelay: `${delay}ms` }}>
            <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="card-3d bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center text-center">
                <div className="mb-4 bg-brand-primary/10 text-brand-primary p-4 rounded-full group-hover:rotate-[360deg] transition-transform duration-500">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
