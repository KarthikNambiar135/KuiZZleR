'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const categories = [
  { id: 9, name: 'GENERAL KNOWLEDGE', difficulty: 'any' },
  { id: 17, name: 'SCIENCE & NATURE', difficulty: 'any' },
  { id: 21, name: 'SPORTS', difficulty: 'any' },
  { id: 23, name: 'HISTORY', difficulty: 'any' },
  { id: 22, name: 'GEOGRAPHY', difficulty: 'any' },
  { id: 11, name: 'MOVIES', difficulty: 'any' },
];

const difficulties = [
  { value: 'easy', name: 'EASY' },
  { value: 'medium', name: 'MEDIUM' },
  { value: 'hard', name: 'HARD' },
];

export default function Categories() {
  const router = useRouter();

  const startQuiz = (categoryId, difficulty) => {
    router.push(`/quiz?category=${categoryId}&difficulty=${difficulty}`);
  };

  return (
    <main className="min-h-screen bg-white p-4 doodle-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex items-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <button
            onClick={() => router.push('/')}
            className="mr-4 p-2 border-2 border-black retro-shadow hover:retro-shadow-hover transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl md:text-4xl font-bold">SELECT CATEGORY</h1>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="border-4 border-black bg-white retro-shadow p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-bold mb-4">{category.name}</h3>
              <div className="space-y-2">
                {difficulties.map((diff) => (
                  <motion.button
                    key={diff.value}
                    onClick={() => startQuiz(category.id, diff.value)}
                    className="w-full px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-bold text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {diff.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Random Quiz Button */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => startQuiz('', 'any')}
            className="px-8 py-4 bg-black text-white border-4 border-black font-bold retro-shadow hover:bg-white hover:text-black transition-all"
          >
            RANDOM QUIZ
          </button>
        </motion.div>
      </div>
    </main>
  );
}
