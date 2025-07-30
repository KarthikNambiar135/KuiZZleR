'use client';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, score }) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      {/* Stats */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold">
          Question {current} of {total}
        </div>
        <div className="font-bold">
          Score: {score}/{current - 1}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-2 border-black bg-white h-6 relative">
        <motion.div
          className="bg-black h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {/* Progress Text */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
