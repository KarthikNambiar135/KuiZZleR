'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy size={24} className="text-black" />;
    if (index === 1) return <Medal size={24} className="text-black" />;
    if (index === 2) return <Award size={24} className="text-black" />;
    return <span className="text-2xl font-bold">{index + 1}</span>;
  };

  return (
    <main className="min-h-screen bg-white p-4 doodle-bg">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-2xl md:text-4xl font-bold">LEADERBOARD</h1>
        </motion.div>

        {/* Leaderboard List */}
        {leaderboard.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Trophy size={80} className="mx-auto mb-4 text-gray-400" />
            <p className="text-xl">NO SCORES YET</p>
            <p className="mt-2">Play a quiz to appear on the leaderboard!</p>
            <button
              onClick={() => router.push('/categories')}
              className="mt-6 px-6 py-3 bg-black text-white border-4 border-black font-bold retro-shadow hover:bg-white hover:text-black transition-all"
            >
              START PLAYING
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
            <motion.div
              key={`${entry.id}-${index}`} //COMBINE ID WITH INDEX FOR UNIQUENESS
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border-4 border-black bg-white retro-shadow p-6 flex items-center justify-between"
            >

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{entry.percentage}%</div>
                    <div className="text-sm">
                      {entry.score}/{entry.total} • {entry.category} • {entry.difficulty}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  {entry.date}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {leaderboard.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                localStorage.removeItem('leaderboard');
                setLeaderboard([]);
              }}
              className="px-6 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-bold"
            >
              CLEAR LEADERBOARD
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
