import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

const BREATH_PHASES = [
  { text: '吸氣...', duration: 4, scale: 1.5, color: 'bg-blue-200' },
  { text: '憋氣...', duration: 4, scale: 1.5, color: 'bg-blue-300' },
  { text: '呼氣...', duration: 6, scale: 0.8, color: 'bg-sage-200' },
  { text: '放鬆...', duration: 2, scale: 0.8, color: 'bg-sage-100' },
];

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATH_PHASES[0].duration);

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            const nextIndex = (phaseIndex + 1) % BREATH_PHASES.length;
            setPhaseIndex(nextIndex);
            return BREATH_PHASES[nextIndex].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phaseIndex]);

  const currentPhase = BREATH_PHASES[phaseIndex];

  const reset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(BREATH_PHASES[0].duration);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-natural-ink-light">Guided Breath 深呼吸引導</h2>
      </div>

      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Animated Circle Layers to match design */}
        <div className="absolute w-64 h-64 rounded-full border border-natural-border-light flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-natural-border flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? currentPhase.scale : 1,
                    backgroundColor: isActive ? '#D27D56' : '#5A5A40',
                    opacity: isActive ? 0.2 : 0.1,
                  }}
                  transition={{
                    duration: isActive ? currentPhase.duration : 1,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 rounded-full"
                />
            </div>
        </div>
        
        <div className={`relative z-10 flex flex-col items-center justify-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isActive ? currentPhase.text : 'ready'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <span className="text-2xl font-serif italic text-natural-ink-dark block">
                {isActive ? currentPhase.text : '準備好了嗎？'}
              </span>
              <span className="text-xs text-natural-ink-light mt-1 block">
                {isActive ? `${timeLeft} Seconds` : '點擊開始循環'}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {BREATH_PHASES.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === phaseIndex && isActive ? 'bg-natural-accent' : 'bg-natural-border'}`} 
            />
          ))}
        </div>

        <button
          onClick={() => setIsActive(!isActive)}
          className="text-sm font-medium underline underline-offset-8 text-natural-accent hover:opacity-80 transition-opacity"
        >
          {isActive ? '暫停循環' : '開始循環 Begin Cycle'}
        </button>

        <button
          onClick={reset}
          className="text-[10px] uppercase tracking-widest text-natural-ink-light hover:text-natural-ink transition-colors"
        >
          重置 Reset
        </button>
      </div>
    </div>
  );
}
