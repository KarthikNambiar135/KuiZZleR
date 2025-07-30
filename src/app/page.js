'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Play, Trophy, Settings } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export default function Home() {
  const router = useRouter();
  const { getMotionProps, getButtonProps } = useSettings();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 doodle-bg">
      <motion.div
        {...getMotionProps({
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5 }
        })}
        className="text-center"
      >
        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 text-black pixelated"
          {...getMotionProps({
            initial: { y: -50 },
            animate: { y: 0 },
            transition: { delay: 0.2, type: "spring", stiffness: 100 }
          })}
        >
          KuiZZleR
        </motion.h1>
        
        <motion.p 
          className="text-sm md:text-base mb-12 text-black max-w-md"
          {...getMotionProps({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 }
          })}
        >
          Test your knowledge with our retro-style quiz game
        </motion.p>

        {/* Menu Buttons */}
        <div className="space-y-4 ml-3 lg:ml-15">
          <motion.button
            {...getButtonProps('game_start', {
              onClick: () => router.push('/categories'),
              initial: { x: -100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.1 }
            })}
            className="w-full md:w-64 px-8 py-4 bg-white border-4 border-black text-black font-bold retro-shadow retro-shadow-hover transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Play size={20} />
            START GAME
          </motion.button>

          <motion.button
            {...getButtonProps('button', {
              onClick: () => router.push('/leaderboard'),
              initial: { x: 100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.15 }
            })}
            className="w-full md:w-64 px-8 py-4 bg-white border-4 border-black text-black font-bold retro-shadow retro-shadow-hover transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Trophy size={20} />
            LEADERBOARD
          </motion.button>

          <motion.button
            {...getButtonProps('button', {
              onClick: () => router.push('/settings'),
              initial: { y: 50, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.2 }
            })}
            className="w-full md:w-64 px-8 py-4 bg-white border-4 border-black text-black font-bold retro-shadow retro-shadow-hover transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Settings size={20} />
            SETTINGS
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
