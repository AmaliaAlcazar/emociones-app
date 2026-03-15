/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  Frown, 
  Flame, 
  Zap, 
  Ghost, 
  Coffee, 
  Moon, 
  Sun,
  X,
  Info
} from 'lucide-react';

interface Emotion {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const EMOTIONS: Emotion[] = [
  {
    id: 'happy',
    label: 'Happy',
    description: 'A feeling of joy and contentment. You might smile or feel light.',
    color: 'bg-emerald-100 border-emerald-200 text-emerald-700',
    icon: <Smile className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/happy-person/400/400'
  },
  {
    id: 'sad',
    label: 'Sad',
    description: 'A feeling of sorrow or unhappiness. You might feel heavy or want to cry.',
    color: 'bg-blue-100 border-blue-200 text-blue-700',
    icon: <Frown className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/sad-person/400/400'
  },
  {
    id: 'angry',
    label: 'Angry',
    description: 'A strong feeling of annoyance or displeasure. You might feel hot or tense.',
    color: 'bg-red-100 border-red-200 text-red-700',
    icon: <Flame className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/angry-person/400/400'
  },
  {
    id: 'surprised',
    label: 'Surprised',
    description: 'A feeling caused by something unexpected. Your eyes and mouth might open wide.',
    color: 'bg-yellow-100 border-yellow-200 text-yellow-700',
    icon: <Zap className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/surprised-person/400/400'
  },
  {
    id: 'scared',
    label: 'Scared',
    description: 'A feeling of fear or worry. Your heart might beat fast.',
    color: 'bg-purple-100 border-purple-200 text-purple-700',
    icon: <Ghost className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/scared-person/400/400'
  },
  {
    id: 'calm',
    label: 'Calm',
    description: 'A feeling of peace and relaxation. Your body feels quiet and steady.',
    color: 'bg-sky-100 border-sky-200 text-sky-700',
    icon: <Sun className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/calm-person/400/400'
  },
  {
    id: 'excited',
    label: 'Excited',
    description: 'A feeling of great enthusiasm and eagerness. You might have a lot of energy.',
    color: 'bg-orange-100 border-orange-200 text-orange-700',
    icon: <Zap className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/excited-person/400/400'
  },
  {
    id: 'tired',
    label: 'Tired',
    description: 'A feeling of needing rest or sleep. Your body might feel slow.',
    color: 'bg-zinc-100 border-zinc-200 text-zinc-700',
    icon: <Moon className="w-8 h-8" />,
    imageUrl: 'https://picsum.photos/seed/tired-person/400/400'
  }
];

export default function App() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 font-sans">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">
          How are you feeling?
        </h1>
        <p className="text-stone-600 text-lg">
          Click on a card to learn more about each emotion.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EMOTIONS.map((emotion) => (
            <motion.button
              key={emotion.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedEmotion(emotion)}
              className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${emotion.color}`}
              id={`emotion-card-${emotion.id}`}
            >
              <div className="mb-4 p-3 bg-white/50 rounded-full">
                {emotion.icon}
              </div>
              <span className="text-xl font-bold uppercase tracking-wider">
                {emotion.label}
              </span>
            </motion.button>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedEmotion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative"
              id="emotion-detail-modal"
            >
              <button
                onClick={() => setSelectedEmotion(null)}
                className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-stone-500" />
              </button>

              <div className="aspect-square w-full relative">
                <img
                  src={selectedEmotion.imageUrl}
                  alt={selectedEmotion.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                      {selectedEmotion.icon}
                    </div>
                    <h2 className="text-3xl font-bold uppercase tracking-widest">
                      {selectedEmotion.label}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="mt-1">
                    <Info className="w-5 h-5 text-stone-400" />
                  </div>
                  <p className="text-stone-700 text-lg leading-relaxed">
                    {selectedEmotion.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedEmotion(null)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm ${selectedEmotion.color}`}
                >
                  I understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="max-w-4xl mx-auto mt-16 text-center text-stone-400 text-sm">
        <p>A simple tool for emotional awareness.</p>
      </footer>
    </div>
  );
}
