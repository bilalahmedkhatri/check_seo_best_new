import { useState, useEffect } from 'react';

export const useABTest = (testName: string): 'A' | 'B' => {
  const [variant, setVariant] = useState<'A' | 'B'>('A'); // Default to A, prevents hydration mismatch

  useEffect(() => {
    let assignedVariant = localStorage.getItem(testName) as 'A' | 'B' | null;

    if (!assignedVariant) {
      assignedVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(testName, assignedVariant);
    }
    
    setVariant(assignedVariant);
  }, [testName]);

  return variant;
};
