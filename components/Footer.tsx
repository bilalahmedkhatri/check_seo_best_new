import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../animation_component';

// --- SVG Icon Components ---
const SocialIcon: React.FC<{ platform: string; path: string }> = ({ platform, path }) => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <title>{platform}</title>
    <path d={path} />
  </svg>
);

const socialLinks = {
  Facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  Twitter: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
  LinkedIn: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.688-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z",
  YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  GitHub: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.217.694.829.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z",
};


// --- Sub-components ---

const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [hasConsented, setHasConsented] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!hasConsented) {
        setStatus('error');
        setMessage('You must agree to the privacy policy.');
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setStatus('error');
        setMessage('Please enter a valid email address.');
        return;
      }
      setStatus('loading');
      setMessage('');
      
      // Simulate API call
      await new Promise(res => setTimeout(res, 1500));
  
      // Simulate success/error
      if (email.includes('error')) {
        setStatus('error');
        setMessage('This email address could not be subscribed. Please try again.');
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
        setHasConsented(false);
      }
    };
  
    return (
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-purple-200 mb-6">Get the latest SEO news, tips, and product updates delivered to your inbox.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white transition"
            aria-label="Email for newsletter"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className="flex-shrink-0 px-6 py-3 rounded-lg bg-white text-[#764ba2] font-bold hover:bg-purple-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <div className="mt-4 text-sm text-purple-200">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="w-4 h-4 rounded text-[#764ba2] bg-white/30 border-purple-200 focus:ring-[#764ba2]"
            />
            <span className="ml-2">I agree to the <a href="#" className="underline hover:text-white">Privacy Policy</a>.</span>
          </label>
        </div>
        {message && (
          <p className={`mt-4 text-center font-bold ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
            {message}
          </p>
        )}
      </div>
    );
  };
  
  const FooterColumn: React.FC<{ title: string; links: { name: string; href: string; badge?: string }[]; }> = ({ title, links }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          className="font-bold text-gray-100 w-full text-left flex justify-between items-center md:pointer-events-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {title}
          <span className="md:hidden transform transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}">
            ▼
          </span>
        </button>
        <ul className={`mt-4 space-y-3 md:block footer-accordion-content ${isOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link.name}>
              <a href={link.href} className="text-gray-400 hover:text-white transition group">
                {link.name}
                {link.badge && <span className="ml-2 text-xs font-bold text-[#1a1a1a] bg-purple-300 px-2 py-0.5 rounded-full group-hover:bg-white transition">{link.badge}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const CookieBanner: React.FC<{ onOpenSettings: () => void; isVisible: boolean; onDecision: (decision: 'accepted' | 'declined') => void; }> = ({ isVisible, onDecision, onOpenSettings }) => {
    if (!isVisible) return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#2d2d2d] text-white p-6 shadow-2xl z-[100] animate-slide-up">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg">🍪 We value your privacy</h4>
            <p className="text-gray-300 text-sm mt-1">We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <button onClick={() => onDecision('declined')} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition font-semibold text-sm">Decline</button>
            <button onClick={onOpenSettings} className="px-4 py-2 rounded-lg hover:bg-gray-700 transition font-semibold text-sm">Customize</button>
            <button onClick={() => onDecision('accepted')} className="px-4 py-2 rounded-lg bg-[#764ba2] hover:bg-[#667eea] transition font-semibold text-sm">Accept All</button>
          </div>
        </div>
      </div>
    );
  };

  const FloatingButtons: React.FC = () => {
    const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  
    useEffect(() => {
      const toggleVisibility = () => setIsScrollTopVisible(window.pageYOffset > 300);
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
  
    return (
      <>
        {/* Live Chat Button */}
        <button
          aria-label="Open live chat"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg flex items-center justify-center animate-pulse-glow hover:scale-110 transition-transform z-50"
        >
          💬
        </button>
  
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className={`fixed bottom-28 right-6 w-12 h-12 rounded-full bg-gray-700 text-white shadow-lg flex items-center justify-center z-50 transition-all duration-300
            ${isScrollTopVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <span className="transform group-hover:-rotate-12 transition-transform">⬆️</span>
        </button>
      </>
    );
  };


// --- Main Footer Component ---

const Footer: React.FC = () => {
  const footerRef = useScrollAnimation<HTMLElement>();
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent') as 'accepted' | 'declined' | null;
    setCookieConsent(consent);
    if (!consent) {
      const timer = setTimeout(() => setIsCookieBannerVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieDecision = (decision: 'accepted' | 'declined') => {
    localStorage.setItem('cookieConsent', decision);
    setCookieConsent(decision);
    setIsCookieBannerVisible(false);
  };
  
  const footerData = {
    product: [ { name: "Features", href: "#" }, { name: "Pricing", href: "#" }, { name: "Integrations", href: "#" }, { name: "API Documentation", href: "#" }, { name: "Changelog", href: "#" }, { name: "Product Roadmap", href: "#" } ],
    tools: [ { name: "Rank Tracking", href: "#" }, { name: "Keyword Research", href: "#" }, { name: "Site Audit", href: "#" }, { name: "Competitor Analysis", href: "#" }, { name: "AI Content Assistant", href: "#" }, { name: "White-Label Reports", href: "#" } ],
    resources: [ { name: "Blog & Articles", href: "#" }, { name: "SEO Guides", href: "#" }, { name: "Case Studies", href: "#" }, { name: "Webinars", href: "#" }, { name: "Free eBooks", href: "#" }, { name: "SEO Glossary", href: "#" } ],
    support: [ { name: "Help Center", href: "#" }, { name: "Video Tutorials", href: "#" }, { name: "Community Forum", href: "#" }, { name: "Contact Support", href: "#" }, { name: "System Status", href: "#" }, { name: "Feature Requests", href: "#" } ],
    company: [ { name: "About Us", href: "#" }, { name: "Careers", href: "#", badge: "We're hiring!" }, { name: "Press Kit", href: "#" }, { name: "Partners", href: "#" }, { name: "Affiliate Program", href: "#" }, { name: "Security", href: "#" } ],
  };

  return (
    <>
      <footer ref={footerRef} className="bg-[#1a1a1a] text-gray-300 pt-20 pb-8 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-20 animate-on-scroll fade-in">
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12">
            {/* Column 1: Brand & Contact */}
            <div className="lg:col-span-2 md:col-span-3 animate-on-scroll fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-2.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#667eea] to-[#764ba2]">SEO Master</p>
              </div>
              <p className="text-gray-400 mb-6">The all-in-one AI suite for marketers to automate keyword research, content creation, and optimization.</p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start"><span>📍</span><span className="ml-2">123 SEO Lane, Webville, CA 90210</span></li>
                <li className="flex items-center"><span>📧</span><a href="mailto:support@seomaster.com" className="ml-2 hover:text-white">support@seomaster.com</a></li>
                <li className="flex items-center"><span>📞</span><a href="tel:+18001234567" className="ml-2 hover:text-white">(800) 123-4567</a></li>
                <li className="flex items-center"><span>⏰</span><span className="ml-2">Support: Mon-Fri, 9am-5pm PT</span></li>
              </ul>
            </div>

            {/* Other columns */}
            <div className="animate-on-scroll fade-in delay-100"><FooterColumn title="Product" links={footerData.product} /></div>
            <div className="animate-on-scroll fade-in delay-200"><FooterColumn title="Tools & Features" links={footerData.tools} /></div>
            <div className="animate-on-scroll fade-in delay-300"><FooterColumn title="Resources" links={footerData.resources} /></div>
            <div className="animate-on-scroll fade-in delay-400"><FooterColumn title="Support" links={footerData.support} /></div>
            <div className="animate-on-scroll fade-in delay-500 hidden lg:block"><FooterColumn title="Company" links={footerData.company} /></div>
          </div>
          
          <div className="border-t border-gray-800 my-12"></div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-400 animate-on-scroll fade-in">
            <span>🔒 SSL Secured</span>
            <span>✓ GDPR Compliant</span>
            <span>⭐ SOC 2 Certified</span>
            <span>🛡️ ISO 27001</span>
            <span>♿ WCAG 2.1 AA</span>
          </div>

          <div className="border-t border-gray-800 my-8"></div>

          {/* Bottom section: Social, Selectors */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 animate-on-scroll fade-in">
            <div className="flex items-center space-x-4">
              {Object.entries(socialLinks).map(([platform, path]) => (
                <a key={platform} href="#" aria-label={platform} className="text-gray-400 hover:text-white transition transform hover:scale-110">
                  <SocialIcon platform={platform} path={path} />
                </a>
              ))}
            </div>
            {/* Implement selectors here if needed */}
          </div>

          <div className="border-t border-gray-800 my-8"></div>
          
          {/* Legal links and Copyright */}
          <div className="text-center text-sm animate-on-scroll fade-in">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map(link => (
                 <a key={link} href="#" className="text-gray-400 hover:text-white transition">{link}</a>
              ))}
              <button onClick={() => setIsCookieBannerVisible(true)} className="text-gray-400 hover:text-white transition">Cookie Settings</button>
            </div>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} SEO Master, Inc. &bull; Made with ❤️ for SEO professionals.</p>
          </div>
        </div>
      </footer>
      <CookieBanner isVisible={isCookieBannerVisible} onDecision={handleCookieDecision} onOpenSettings={() => alert("Cookie settings panel would open here.")} />
      <FloatingButtons />
    </>
  );
};

export default Footer;
