'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Home, RotateCcw, Share2 } from 'lucide-react';

export default function Results() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
      saveToLeaderboard(JSON.parse(savedResults));
    }
    setLoading(false);
  }, []);

  const saveToLeaderboard = (results) => {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  const newEntry = {
    score: results.score,
    total: results.total,
    percentage: Math.round((results.score / results.total) * 100),
    category: results.category,
    difficulty: results.difficulty,
    date: new Date().toLocaleDateString(),
    id: Date.now() + Math.random() * 1000 // ← ENSURES UNIQUE IDS
  };
  
  leaderboard.push(newEntry);
  leaderboard.sort((a, b) => b.percentage - a.percentage);
  leaderboard.splice(10); // Keep only top 10
  
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};


  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return "EXCELLENT!";
    if (percentage >= 70) return "GREAT JOB!";
    if (percentage >= 50) return "GOOD EFFORT!";
    return "KEEP TRYING!";
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'KuiZZleR Results',
        text: `I scored ${results.score}/${results.total} (${Math.round((results.score / results.total) * 100)}%) in KuiZZleR!`,
        url: window.location.origin
      });
    }
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">LOADING RESULTS...</div>
      </div>
    );
  }

  const percentage = Math.round((results.score / results.total) * 100);

  return (
    <main className="min-h-screen bg-white p-4 doodle-bg">
      <div className="max-w-2xl mx-auto text-center">
        {/* Results Header */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Trophy size={80} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-2">QUIZ COMPLETE!</h1>
          <p className="text-lg">{getScoreMessage(percentage)}</p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-4 border-black bg-white retro-shadow p-8 mb-8"
        >
          <div className="text-6xl font-bold mb-4">{results.score}/{results.total}</div>
          <div className="text-2xl font-bold mb-2">{percentage}%</div>
          <div className="text-sm">
            Category: {results.category} | Difficulty: {results.difficulty}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={() => router.push('/categories')}
            className="w-full md:w-64 px-6 py-3 bg-white border-4 border-black font-bold retro-shadow retro-shadow-hover transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <RotateCcw size={20} />
            PLAY AGAIN
          </button>

          <button
            onClick={() => router.push('/leaderboard')}
            className="w-full md:w-64 px-6 py-3 bg-white border-4 border-black font-bold retro-shadow retro-shadow-hover transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Trophy size={20} />
            LEADERBOARD
          </button>

          <button
            onClick={shareResults}
            className="w-full md:w-64 px-6 py-3 bg-white border-4 border-black font-bold retro-shadow retro-shadow-hover transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Share2 size={20} />
            SHARE RESULTS
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full md:w-64 px-6 py-3 bg-black text-white border-4 border-black font-bold retro-shadow hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 mx-auto"
          >
            <Home size={20} />
            HOME
          </button>
        </motion.div>

        {/* Detailed Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">REVIEW ANSWERS</h2>
          <div className="space-y-4 text-left">
            {results.answers.map((answer, index) => (
              <div key={index} className="border-2 border-black p-4">
                <div className="font-bold mb-2">Question {index + 1}:</div>
                <div className="mb-3" dangerouslySetInnerHTML={{ __html: answer.question }} />
                <div className={`mb-1 ${answer.isCorrect ? 'text-black' : 'text-gray-600'}`}>
                  Your answer: <span dangerouslySetInnerHTML={{ __html: answer.selected }} />
                  {answer.isCorrect ? ' ✓' : ' ✗'}
                </div>
                {!answer.isCorrect && (
                  <div className="text-black">
                    Correct answer: <span dangerouslySetInnerHTML={{ __html: answer.correct }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
