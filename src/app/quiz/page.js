'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRandomFallbackQuestions } from '@/utils/fallBackQuestions';
import { useSettings } from '@/hooks/useSettings';

function QuizContent() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  
  const { getMotionProps, getButtonProps, playSound } = useSettings();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      9: 'General Knowledge',
      17: 'Science',
      21: 'Sports',
      23: 'History',
      22: 'Geography',
      11: 'Movies'
    };
    return categoryMap[categoryId] || null;
  };

  const fetchQuestions = async () => {
    let url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    
    if (category) url += `&category=${category}`;
    if (difficulty && difficulty !== 'any') url += `&difficulty=${difficulty}`;

    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Fetching questions (attempt ${attempt}):`, url);
        const response = await fetch(url);
        
        if (response.status === 429) {
          console.log('Rate limited, marking as rate limited...');
          setRateLimited(true);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.response_code !== undefined) {
          switch (data.response_code) {
            case 0: // Success
              if (data.results && Array.isArray(data.results) && data.results.length > 0) {
                setQuestions(data.results);
                setLoading(false);
                setRateLimited(false);
                setUsingFallback(false);
                return;
              }
              break;
            case 1: // No results
              throw new Error('No questions available for the selected criteria');
            case 2: // Invalid parameter
              throw new Error('Invalid API parameters');
            case 3: // Token not found
            case 4: // Token empty
              break;
            case 5: // Rate limit
              setRateLimited(true);
              setLoading(false);
              return;
          }
        }
        
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error('Invalid API response format');
        }
        
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          console.log('All attempts failed, showing rate limit message');
          setRateLimited(true);
          setLoading(false);
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  };

  const useFallbackQuestions = () => {
    const categoryName = getCategoryName(category);
    const fallbackQuestions = getRandomFallbackQuestions(categoryName, difficulty);
    
    setQuestions(fallbackQuestions);
    setUsingFallback(true);
    setRateLimited(false);
    setLoading(false);
    playSound('game_start'); //Play sound when starting with fallback
  };

  const handleAnswer = (answer) => {
    if (!questions || !questions[currentQuestion]) {
      console.error('No current question available');
      return;
    }

    const correct = questions[currentQuestion].correct_answer;
    const isAnswerCorrect = answer === correct;
    
    setSelectedAnswer(answer);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    const newUserAnswers = [...userAnswers, {
      question: questions[currentQuestion].question,
      selected: answer,
      correct: correct,
      isCorrect: isAnswerCorrect
    }];
    setUserAnswers(newUserAnswers);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      } else {
        // Quiz finished - play completion sound
        playSound('quiz_finish');
        const finalScore = score + (isAnswerCorrect ? 1 : 0);
        localStorage.setItem('quizResults', JSON.stringify({
          score: finalScore,
          total: questions.length,
          answers: newUserAnswers,
          category: category ? getCategoryName(category) || 'Mixed' : 'Mixed',
          difficulty: difficulty || 'Mixed',
          usingFallback: usingFallback
        }));
        
        //Delay navigation to let the sound play
        setTimeout(() => {
          router.push('/results');
        }, 1000);
      }
    }, 2000);
  };

  if (loading) return <LoadingSpinner />;

  // Rate Limited Screen
  if (rateLimited) {
    return (
      <main className="min-h-screen bg-white p-4 doodle-bg">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen doodle-bg">
          <motion.div
            {...getMotionProps({
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 }
            })}
            className="text-center border-4 border-black bg-white retro-shadow p-8"
          >
            <div className="text-4xl mb-4">⏱️</div>
            <h1 className="text-2xl font-bold mb-4">API RATE LIMIT REACHED</h1>
            <p className="mb-6 text-sm max-w-md">
              The trivia database is experiencing high traffic and has temporarily 
              limited requests. You can either wait and try again, or continue 
              playing with our backup questions.
            </p>
            
            <div className="space-y-4">
              <motion.button
                {...getButtonProps('game_start', {
                  onClick: useFallbackQuestions
                })}
                className="w-full px-6 py-3 bg-black text-white border-4 border-black font-bold retro-shadow hover:bg-white hover:text-black transition-all"
              >
                CONTINUE WITH BACKUP QUESTIONS
              </motion.button>
              
              <motion.button
                {...getButtonProps('button', {
                  onClick: () => {
                    setLoading(true);
                    setRateLimited(false);
                    setTimeout(() => fetchQuestions(), 3000);
                  }
                })}
                className="w-full px-6 py-3 bg-white border-4 border-black font-bold retro-shadow hover:bg-black hover:text-white transition-all"
              >
                TRY AGAIN (WAIT 3 SECONDS)
              </motion.button>
              
              <motion.button
                {...getButtonProps('button', {
                  onClick: () => router.push('/categories')
                })}
                className="w-full px-6 py-3 bg-white border-2 border-black font-bold retro-shadow hover:retro-shadow-hover transition-all"
              >
                BACK TO CATEGORIES
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">NO QUESTIONS AVAILABLE</h1>
        <p className="mb-4">Unable to load quiz questions. Please try again.</p>
        <button
          {...getButtonProps('button', {
            onClick: () => router.push('/categories')
          })}
          className="px-6 py-3 bg-black text-white border-4 border-black font-bold retro-shadow hover:bg-white hover:text-black transition-all"
        >
          BACK TO CATEGORIES
        </button>
      </div>
    );
  }

  if (!questions[currentQuestion]) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-bold">LOADING CURRENT QUESTION...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white p-4 doodle-bg">
      <div className="max-w-2xl mx-auto">
        {/* Fallback Indicator */}
        {usingFallback && (
          <motion.div
            {...getMotionProps({
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 }
            })}
            className="mb-4 p-3 border-2 border-black bg-gray-100 text-center text-sm font-bold"
          >
            🔄 USING BACKUP QUESTIONS
          </motion.div>
        )}

        {/* Progress Bar */}
        <ProgressBar 
          current={currentQuestion + 1} 
          total={questions.length}
          score={score}
        />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            {...getMotionProps({
              initial: { opacity: 0, x: 100 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -100 },
              transition: { duration: 0.3 }
            })}
          >
            <QuestionCard
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              showFeedback={showFeedback}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              questionNumber={currentQuestion + 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function Quiz() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QuizContent />
    </Suspense>
  );
}
