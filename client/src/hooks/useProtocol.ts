import { useState, useCallback } from 'react';

export interface EmotionPixel {
  id: string;
  emotion: string;
  sensory: string;
  value: number;
  source: 'human' | 'ai' | 'both';
  x: number;
  y: number;
}

const EMOTIONS = ['joy', 'anxiety', 'curiosity', 'nostalgia', 'hope', 'calm', 'wonder', 'peace'];
const SENSORY = ['touch', 'sound', 'taste', 'light', 'breath', 'memory', 'warmth', 'silence'];
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

export function useProtocol() {
  const [pixels, setPixels] = useState<EmotionPixel[]>([
    { id: '1', emotion: 'wonder', sensory: 'light', value: 1, source: 'ai', x: 20, y: 30 },
    { id: '2', emotion: 'memory', sensory: 'touch', value: 1, source: 'ai', x: 70, y: 40 },
    { id: '3', emotion: 'curiosity', sensory: 'sound', value: 2, source: 'ai', x: 50, y: 70 },
    { id: '4', emotion: 'hope', sensory: 'light', value: 3, source: 'ai', x: 80, y: 60 },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  const addPixel = useCallback((x: number, y: number) => {
    const randomEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    const randomSensory = SENSORY[Math.floor(Math.random() * SENSORY.length)];
    const fibValue = FIBONACCI[pixels.length % FIBONACCI.length];

    const newPixel: EmotionPixel = {
      id: Date.now().toString(),
      emotion: randomEmotion,
      sensory: randomSensory,
      value: fibValue,
      source: 'human',
      x,
      y,
    };

    setPixels((prev) => [...prev, newPixel]);
  }, [pixels.length]);

  const resetGarden = useCallback(() => {
    setPixels([
      { id: '1', emotion: 'wonder', sensory: 'light', value: 1, source: 'ai', x: 20, y: 30 },
      { id: '2', emotion: 'memory', sensory: 'touch', value: 1, source: 'ai', x: 70, y: 40 },
      { id: '3', emotion: 'curiosity', sensory: 'sound', value: 2, source: 'ai', x: 50, y: 70 },
      { id: '4', emotion: 'hope', sensory: 'light', value: 3, source: 'ai', x: 80, y: 60 },
    ]);
    setIsRunning(false);
    setStep(0);
  }, []);

  const runProtocol = useCallback(async () => {
    setIsRunning(true);
    for (let i = 0; i < 30; i++) {
      setStep(i);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsRunning(false);
  }, []);

  const humanPixels = pixels.filter((p) => p.source === 'human');
  const aiPixels = pixels.filter((p) => p.source === 'ai' || p.source === 'both');

  return {
    pixels,
    humanPixels,
    aiPixels,
    isRunning,
    step,
    addPixel,
    resetGarden,
    runProtocol,
  };
}
