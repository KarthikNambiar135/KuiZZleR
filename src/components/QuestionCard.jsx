'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuestionCard({ 
  question, 
  onAnswer, 
  showFeedback, 
  selectedAnswer, 
  isCorrect,
  questionNumber 
}) {
  const [answers, setAnswers] = useState([]);
  
  const { playSound, getMotionProps } = useSettings();

  useEffect(() => {
    if (question) {
      const allAnswers = [...question.incorrect_answers, question.correct_answer];
      setAnswers(shuffle(allAnswers));
    }
  }, [question]);

  useEffect(() => {
    // Play sound when feedback is shown
    if (showFeedback) {
      // Small delay to ensure the visual feedback appears first
      setTimeout(() => {
        playSound(isCorrect ? 'correct' : 'wrong');
      }, 100);
    }
  }, [showFeedback, isCorrect, playSound]);

  if (!question) return null;

  const handleAnswerClick = (answer) => {
    if (!showFeedback) {
      playSound('click'); // Play click sound on answer selection
      onAnswer(answer);
    }
  };

  return (
    <motion.div
      className="border-4 border-black bg-white retro-shadow p-8 mb-8"
      {...getMotionProps({
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 }
      })}
    >
      {/* Question Number */}
      <div className="text-sm font-bold mb-4">QUESTION {questionNumber}</div>
      
      {/* Category & Difficulty */}
      <div className="text-xs mb-4 text-gray-600">
        {question.category} • {question.difficulty.toUpperCase()}
      </div>

      {/* Question */}
      <motion.h2 
        className="text-lg md:text-xl font-bold mb-8"
        dangerouslySetInnerHTML={{ __html: question.question }}
        {...getMotionProps({
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { delay: 0.2 }
        })}
      />

      {/* Answers */}
      <div className="space-y-4">
        {answers.map((answer, index) => {
          let buttonClass = "w-full px-6 py-4 border-2 border-black text-left font-bold transition-all retro-shadow";
          
          if (showFeedback) {
            if (answer === selectedAnswer) {
              if (isCorrect) {
                buttonClass += " bg-black text-white border-black";
              } else {
                buttonClass += " bg-gray-400 text-black border-gray-400";
              }
            } else if (answer === question.correct_answer && !isCorrect) {
              buttonClass += " bg-black text-white border-black ring-4 ring-gray-400";
            } else {
              buttonClass += " bg-gray-200 text-gray-500 border-gray-300 opacity-50";
            }
          } else {
            buttonClass += " bg-white text-black hover:bg-black hover:text-white hover:retro-shadow-hover";
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={buttonClass}
              disabled={showFeedback}
              {...getMotionProps({
                initial: { x: -50, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { delay: 0.3 + index * 0.1 },
                whileHover: !showFeedback ? { scale: 1.02 } : {},
                whileTap: !showFeedback ? { scale: 0.98 } : {}
              })}
            >
              <div className="flex items-center">
                <span className="mr-4 w-6 h-6 border border-current flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 }
            })}
            className="mt-6 text-center"
          >
            <div className={`text-2xl font-bold ${isCorrect ? 'text-black' : 'text-gray-600'}`}>
              {isCorrect ? '✓ CORRECT!' : '✗ WRONG!'}
            </div>
            {!isCorrect && (
              <div className="mt-2 text-sm text-black">
                Correct answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
