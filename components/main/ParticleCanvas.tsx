import React, { useRef, useEffect } from 'react';

const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number;
        const particles: any[] = [];
        const particleCount = 70;
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        const createParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                    vx: Math.random() * 0.4 - 0.2, vy: Math.random() * 0.4 - 0.2,
                    radius: Math.random() * 1.5 + 0.5,
                });
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        setCanvasSize(); createParticles(); animate();
        window.addEventListener('resize', () => { setCanvasSize(); createParticles(); });
        return () => { cancelAnimationFrame(animationFrameId); };
    }, []);
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ParticleCanvas;
