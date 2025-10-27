import { useState, useEffect } from 'react';

export const useTypingEffect = (text: string, duration: number, start: boolean) => {
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
