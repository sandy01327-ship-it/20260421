import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Heart, Trash2, Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  text: string;
  date: string;
}

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [inputText, setInputText] = useState('');

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('zen_gratitude_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse journal entries", e);
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('zen_gratitude_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      text: inputText.trim(),
      date: new Date().toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    };

    setEntries([newEntry, ...entries]);
    setInputText('');
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-serif italic text-natural-ink-dark">Today I am grateful for... 今日感恩</h2>
        <span className="text-[10px] uppercase tracking-widest font-bold text-natural-ink-light">Reflection 反思</span>
      </div>

      <form onSubmit={addEntry} className="space-y-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在次寫下您的感悟..."
            className="w-full min-h-[140px] p-6 rounded-2xl bg-white/40 border border-white/60 focus:outline-none focus:ring-1 focus:ring-natural-accent/30 resize-none placeholder:text-natural-ink-light/50 text-natural-ink text-sm italic transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-full mt-4 py-4 bg-natural-accent text-white rounded-2xl font-medium shadow-lg hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> 儲存紀錄 Save Entry
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-natural-border pb-2">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-natural-ink-light">Past Reflections 過往紀錄</h3>
            <span className="text-[10px] text-natural-accent font-bold">查看全部</span>
        </div>

        <AnimatePresence mode="popLayout">
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-natural-ink-light border border-dashed border-natural-border rounded-2xl bg-white/10"
            >
              <Heart className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-xs italic underline underline-offset-4">尚無紀錄，開始您的感恩練習吧。</p>
            </motion.div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/50 backdrop-blur-sm p-5 rounded-2xl border border-white/40 group relative shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center text-[10px] font-bold text-natural-ink-light uppercase tracking-widest">
                    <Calendar className="w-3 h-3 mr-1" />
                    {entry.date}
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-natural-tertiary/60 hover:text-natural-tertiary transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-sm italic text-natural-ink leading-relaxed whitespace-pre-wrap">
                  "{entry.text}"
                </p>
                <div className="mt-3 flex justify-end">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-3 h-3 text-natural-tertiary fill-natural-tertiary/10" />
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
