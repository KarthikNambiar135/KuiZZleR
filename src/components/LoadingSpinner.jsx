'use client';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-black border-t-transparent mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="text-xl font-bold"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        LOADING QUESTIONS...
      </motion.div>
      
      <div className="mt-4 flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-black"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
              duration: 0.6, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </div>
  );
}
