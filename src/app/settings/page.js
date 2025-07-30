'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedSound = localStorage.getItem('soundEnabled');
    const savedAnimations = localStorage.getItem('animationsEnabled');
    
    if (savedSound !== null) setSoundEnabled(JSON.parse(savedSound));
    if (savedAnimations !== null) setAnimationsEnabled(JSON.parse(savedAnimations));
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('soundEnabled', JSON.stringify(newValue));
    
    // Play a test sound when enabling
    if (newValue) {
      playSound('button');
    }
  };

  const toggleAnimations = () => {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem('animationsEnabled', JSON.stringify(newValue));
    
    // Update CSS custom property for animations
    document.documentElement.style.setProperty(
      '--animation-duration', 
      newValue ? '1' : '0'
    );
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    // Create simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different sounds for different actions
    switch (type) {
      case 'button':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        break;
      case 'correct':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        break;
      case 'wrong':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        break;
      default:
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    }
    
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This will remove your leaderboard and quiz results.')) {
      localStorage.clear();
      // Restore settings after clearing
      setSoundEnabled(true);
      setAnimationsEnabled(true);
      localStorage.setItem('soundEnabled', JSON.stringify(true));
      localStorage.setItem('animationsEnabled', JSON.stringify(true));
      alert('All data cleared!');
    }
  };

  const getMotionProps = (baseProps) => {
    if (!animationsEnabled) {
      return {
        initial: false,
        animate: false,
        transition: { duration: 0 },
        whileHover: {},
        whileTap: {}
      };
    }
    return baseProps;
  };

  return (
    <main className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="flex items-center mb-8"
          {...getMotionProps({
            initial: { y: -50, opacity: 0 },
            animate: { y: 0, opacity: 1 }
          })}
        >
          <button
            onClick={() => {
              playSound('button');
              router.push('/');
            }}
            className="mr-4 p-2 border-2 border-black retro-shadow hover:retro-shadow-hover transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl md:text-4xl font-bold">SETTINGS</h1>
        </motion.div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Sound Setting */}
          <motion.div
            {...getMotionProps({
              initial: { x: -100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.2 }
            })}
            className="border-4 border-black bg-white retro-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                <span className="font-bold">SOUND EFFECTS</span>
              </div>
              <motion.button
                onClick={() => {
                  toggleSound();
                }}
                className={`px-4 py-2 border-2 border-black font-bold transition-all ${
                  soundEnabled ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                {...getMotionProps({
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 }
                })}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </motion.button>
            </div>
          </motion.div>

          {/* Animations Setting */}
          <motion.div
            {...getMotionProps({
              initial: { x: -100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.3 }
            })}
            className="border-4 border-black bg-white retro-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <span className="font-bold">ANIMATIONS</span>
              </div>
              <motion.button
                onClick={() => {
                  playSound('button');
                  toggleAnimations();
                }}
                className={`px-4 py-2 border-2 border-black font-bold transition-all ${
                  animationsEnabled ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                {...getMotionProps({
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 }
                })}
              >
                {animationsEnabled ? 'ON' : 'OFF'}
              </motion.button>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            {...getMotionProps({
              initial: { x: -100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.4 }
            })}
            className="border-4 border-black bg-white retro-shadow p-6"
          >
            <h3 className="font-bold mb-3">ABOUT KUIZZLER</h3>
            <p className="text-sm mb-2">Version: 1.0.0</p>
            <p className="text-sm mb-2">A retro-style quiz game built with Next.js</p>
            <p className="text-sm">Questions provided by Open Trivia Database</p>
          </motion.div>

          {/* Data Management */}
          <motion.div
            {...getMotionProps({
              initial: { x: -100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { delay: 0.5 }
            })}
            className="border-4 border-black bg-white retro-shadow p-6"
          >
            <h3 className="font-bold mb-3">DATA MANAGEMENT</h3>
            <motion.button
              onClick={() => {
                playSound('button');
                clearAllData();
              }}
              className="px-4 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all font-bold"
              {...getMotionProps({
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 }
              })}
            >
              CLEAR ALL DATA
            </motion.button>
            <p className="text-xs mt-2">This will remove all saved scores and settings</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
