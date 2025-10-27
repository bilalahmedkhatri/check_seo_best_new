import { useState, useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';

export const useCountUp = (target: number, duration = 2000) => {
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
