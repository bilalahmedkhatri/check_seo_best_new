import React, { useState, useEffect } from 'react';

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

export default ScrollProgressBar;
