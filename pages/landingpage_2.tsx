
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
const ChevronDownIcon = () => <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>;
const ArrowUpIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const StarIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;
const SEOIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ContentIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const AnalyticsIcon = () => <svg className="w-8 h-8" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

const InputIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const InsightIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>;
const RankIcon = () => <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;

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

const HowItWorksSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const steps = [
        { icon: <InputIcon />, title: 'Input & Analyze', description: 'Enter a topic, keyword, or URL. Our Gemini-powered AI gets to work instantly, analyzing SERPs and competitors in real-time.' },
        { icon: <InsightIcon />, title: 'Get AI Insights', description: 'Receive comprehensive reports, from long-tail keyword lists to full content briefs and technical audit checklists.' },
        { icon: <RankIcon />, title: 'Optimize & Rank', description: 'Implement our clear, actionable recommendations to optimize your content and technical SEO, then watch your rankings climb.' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">Achieve SEO Success in 3 Simple Steps</h2>
                <div className="relative grid md:grid-cols-3 gap-12">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                    {steps.map((step, i) => (
                        <div key={i} className={`relative animate-on-scroll fade-in delay-${i * 100 + 100}`}>
                            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-brand-primary/10 text-brand-primary border-4 border-white dark:border-gray-900">
                                <span className="text-4xl font-bold">{i + 1}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUsSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const advantages = [
        'Unified All-in-One Workflow',
        'Powered by Google\'s Gemini AI',
        'Actionable, Data-Driven Insights',
        'Automated Content Briefs & Audits',
        'Intuitive & Beginner-Friendly',
        'Cost-Effective vs. Multiple Tools'
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-on-scroll slide-in-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">The Smarter Way to Do SEO</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Stop juggling multiple, expensive, and complicated tools. Our integrated AI suite gives you a decisive edge by combining cutting-edge technology with a seamless user experience.</p>
                    <ul className="space-y-4">
                        {advantages.map((adv, i) => (
                            <li key={i} className="flex items-center text-lg animate-on-scroll fade-in" style={{transitionDelay: `${i * 100 + 200}ms`}}>
                                <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center mr-3"><CheckIcon /></span>
                                <span className="text-gray-800 dark:text-gray-200">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="animate-on-scroll slide-in-right">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl relative aspect-[4/3]">
                         <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop" alt="Dashboard analytics" className="rounded-lg w-full h-full object-cover" />
                         <div className="absolute -bottom-4 -right-4 bg-brand-primary text-white p-4 rounded-lg shadow-lg">
                            <AnalyticsIcon />
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    const testimonials = [
        { name: 'Jessica Miller', role: 'Marketing Manager, TechCorp', quote: 'This tool is a game-changer. We consolidated three different subscriptions into this one platform and our content workflow has never been smoother. The AI briefs are incredibly accurate and save us hours each week.' },
        { name: 'David Chen', role: 'Owner, Digital Leap Agency', quote: 'As an agency, efficiency is everything. The SEO Audit and SERP analysis tools allow us to onboard new clients and deliver value faster than ever. The reports are comprehensive and easy for clients to understand.' },
        { name: 'Sophie Carter', role: 'Full-Time Blogger & Creator', quote: 'I was intimidated by SEO, but this tool makes it so accessible. The Keyword Strategist helped me build a content plan that doubled my organic traffic in three months. I finally feel like I\'m in control of my growth.' },
    ];
    return (
        <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-on-scroll fade-in">Don't Just Take Our Word For It</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col animate-on-scroll scale-in delay-${i * 100 + 100}`}>
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
        <section ref={sectionRef} className="py-20 bg-gray-100 dark:bg-gray-800/50">
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

const CTASection: React.FC = () => {
    const sectionRef = useScrollAnimation<HTMLDivElement>();
    return (
        <section ref={sectionRef} className="relative bg-gray-900 text-white overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary animate-gradient-bg"></div>
            <div className="relative w-full mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 animate-on-scroll fade-in">Ready to Dominate the SERPs?</h2>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 animate-on-scroll fade-in delay-100">
                    Join thousands of marketers who are saving time and getting better results. Start your free, no-risk 7-day trial today.
                </p>
                <div className="animate-on-scroll fade-in delay-200">
                    <Link to="/keywordResearch" onClick={createRipple} className="ripple-btn inline-block bg-white hover:bg-gray-200 text-brand-primary font-bold py-4 px-10 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all duration-300 transform hover:scale-105">
                        Claim Your Free Trial
                    </Link>
                    <p className="mt-4 text-sm text-gray-300">No credit card required.</p>
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
                <HowItWorksSection />
                <WhyChooseUsSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </main>
            {/* Using the existing global footer */}
            <Footer />
        </div>
    );
};

export default LandingPage2;
