import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, BookHeart, LayoutGrid, Settings as SettingsIcon } from 'lucide-react';
import BreathingExercise from './components/BreathingExercise';
import GratitudeJournal from './components/GratitudeJournal';

type ViewMode = 'breathing' | 'journal' | 'both';

export default function App() {
  const [view, setView] = useState<ViewMode>('both');
  const today = new Date().toLocaleDateString('zh-TW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex h-screen bg-natural-bg text-natural-ink font-sans overflow-hidden">
      {/* Left Sidebar: Navigation & Identity */}
      <nav className="w-20 border-r border-natural-border flex flex-col items-center py-8 justify-between shrink-0">
        <div className="text-xl font-serif font-bold tracking-tighter text-natural-accent">Z.</div>
        <div className="flex flex-col gap-8 opacity-60">
          <button 
            onClick={() => setView('breathing')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${view === 'breathing' ? 'bg-natural-accent text-white' : 'text-natural-ink-light hover:bg-natural-border'}`}
          >
            <Wind className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setView('journal')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${view === 'journal' ? 'bg-natural-accent text-white' : 'text-natural-ink-light hover:bg-natural-border'}`}
          >
            <BookHeart className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setView('both')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${view === 'both' ? 'bg-natural-accent text-white' : 'text-natural-ink-light hover:bg-natural-border'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
        <div className="text-[10px] uppercase tracking-widest -rotate-90 origin-center whitespace-nowrap opacity-40">ZenSpace 2024</div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="p-12 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-serif italic text-natural-ink-dark">ZenSpace 寧靜空間</h1>
            <p className="text-sm text-natural-ink-light mt-2 tracking-wide">{today} — 專注：平靜與感恩</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white border border-natural-border rounded-full text-xs font-medium">專注模式</div>
            <div className="px-4 py-2 bg-natural-accent text-white rounded-full text-xs font-medium cursor-pointer shadow-sm hover:opacity-90">設定</div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="flex-1 p-12 pt-4 relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`h-full grid gap-8 ${view === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}
            >
              {(view === 'breathing' || view === 'both') && (
                <div className="natural-card relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                  <div className="absolute top-0 left-0 w-full h-2 bg-natural-border">
                    <motion.div 
                      className="h-full bg-natural-accent"
                      initial={{ width: "33%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <BreathingExercise />
                </div>
              )}
              
              {(view === 'journal' || view === 'both') && (
                <div className="bg-natural-journal-bg rounded-[40px] p-2 border border-natural-border/50 shadow-inner flex flex-col">
                  <div className="flex-1 overflow-y-auto rounded-[38px] p-6 lg:p-10">
                    <GratitudeJournal />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Metrics */}
        <footer className="px-12 py-6 border-t border-natural-border flex justify-between items-center bg-white/50 backdrop-blur-sm">
          <div className="flex gap-8">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-natural-ink-light font-bold">累積天數</span>
              <span className="text-sm font-medium">12 天</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-natural-ink-light font-bold">今日目標</span>
              <span className="text-sm font-medium">80% 已完成</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-natural-tertiary"
            />
            <span className="text-xs font-medium">正念進行中</span>
          </div>
        </footer>
      </main>
    </div>
  );
}


