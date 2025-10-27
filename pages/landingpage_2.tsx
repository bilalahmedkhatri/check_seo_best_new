
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../animation_component';
import { useTheme } from '../contexts/ThemeContext';
import anime from 'animejs';
// FIX: Imported Footer component.
import Footer from '../components/Footer';
import Header from '../components/Header';

// --- Reusable Icon Components ---
const CheckIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
const ChevronDownIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;
const ArrowUpIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const StarIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;
const SEOIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ContentIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const AnalyticsIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

// --- Custom Hooks ---
const useTypingEffect = (text: string, duration: number, start: boolean) => {
    const [typedText, setTypedText] = useState('');
    useEffect(() => {
        if (start && typedText.length < text.length) {
            const timeout = setTimeout(() => {
                setTypedText(text.slice(0, typedText.length + 1));
            }, duration);
            return () => clearTimeout(timeout);
        }
    }, [typedText, text, duration, start]);
    return typedText;
};

const useCountUp = (target: number, duration = 2000) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);

    const animateCount = useCallback(() => {
        // FIX: Correctly call animejs by handling default export in ES modules.
        ((anime as any).default || anime)({
            targets: { value: 0 },
            value: target,
            round: 1,
            duration,
            easing: 'easeOutCubic',
            update: (anim) => {
                setCount(anim.animations[0].currentValue);
            }
        });
    }, [target, duration]);

    useEffect(() => {
        const element = countRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animateCount();
                    observer.disconnect();
                }
            }, { threshold: 0.5 }
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [animateCount]);

    return [count, countRef] as const;
};

// --- General UI Components ---
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

const ScrollProgressBar = () => {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const doc = document.documentElement;
            const winScroll = doc.scrollTop;
            const height = doc.scrollHeight - doc.clientHeight;
            setScroll((winScroll / height) * 100);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return <div className="fixed top-0 left-0 z-50 h-1 bg-brand-primary" style={{ width: `${scroll}%` }}></div>;
};

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

const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    button.getElementsByClassName("ripple")[0]?.remove();
    button.appendChild(circle);
};

// --- Section Components ---

const HeroSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const [startTyping, setStartTyping] = useState(false);
    const typedSubtitle = useTypingEffect("Automate your workflow from keyword research to content optimization and outrank your competitors.", 40, startTyping);

    useEffect(() => {
      const timer = setTimeout(() => setStartTyping(true), 500); // Start typing after intro animation
      return () => clearTimeout(timer);
    }, []);

    const titleText = "AI-Powered SEO Studio";

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
                    {titleText.split('').map((char, i) => <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char === ' ' ? '\u00A0' : char}</span>)}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto h-14 animate-on-scroll fade-in delay-200">
                    {typedSubtitle}
                    <span className="inline-block w-0.5 h-6 bg-brand-primary ml-1 animate-pulse" style={{ opacity: typedSubtitle.length === 0 || typedSubtitle.length === 95 ? 1 : 0 }}></span>
                </p>
                <div className="mt-10 animate-on-scroll fade-in delay-400">
                    <Link to="/keywordResearch" onClick={createRipple} className="ripple-btn inline-block bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105 btn-pulse">
                        Start Your Free Trial
                    </Link>
                </div>
            </div>
        </section>
    );
};

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

// FIX: Changed JSX.Element to React.ReactElement to resolve namespace issue.
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

const FeaturesSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const features = [
        { icon: <SEOIcon/>, title: "Keyword Research", description: "Uncover valuable long-tail, LSI, and question-based keywords." },
        { icon: <AnalyticsIcon/>, title: "SERP Monitoring", description: "Analyze real-time SERPs and get actionable recommendations." },
        { icon: <ContentIcon/>, title: "AI Content Briefs", description: "Generate comprehensive, SEO-optimized content briefs in seconds." },
        { icon: <SEOIcon/>, title: "On-Page Optimizer", description: "Analyze your content against SEO best practices and get scores." },
        { icon: <AnalyticsIcon/>, title: "AI Keyword Strategist", description: "Build powerful topic cluster strategies to establish topical authority." },
        { icon: <ContentIcon/>, title: "AI Website SEO Audit", description: "Conduct a comprehensive health check of your website." },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-on-scroll fade-in">One Platform, Endless SEO Power</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 animate-on-scroll fade-in delay-100">From initial research to final audit, our toolkit streamlines your entire SEO process.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => <FeatureCard key={i} {...f} delay={i * 100} />)}
                </div>
            </div>
        </section>
    );
};

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
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg animate-on-scroll slide-in-left" style={{transitionDelay: `${index * 100}ms`}}>
                            <button onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full flex justify-between items-center p-4 sm:p-6 text-left">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                                <ChevronDownIcon />
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


// --- Main Landing Page Component ---
const LandingPage2: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <Header />
            <ScrollProgressBar />
            <ScrollToTopButton />
            <main>
                <HeroSection />
                <StatsSection />
                <FeaturesSection />
                <FAQSection />
                 {/* Placeholder for other sections like Showcase, Testimonials, Pricing, CTA etc. */}
            </main>
            {/* Using the existing global footer */}
            <Footer />
        </div>
    );
};

export default LandingPage2;