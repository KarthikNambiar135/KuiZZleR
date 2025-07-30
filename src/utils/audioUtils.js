let audioContext = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.warn('Audio not supported:', error);
      return null;
    }
  }
  return audioContext;
};

export const playSound = (soundEnabled, type = 'button') => {
  if (!soundEnabled || typeof window === 'undefined') return;
  
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        playSound(soundEnabled, type);
      });
      return;
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Different sounds for different actions
    switch (type) {
      case 'button':
      case 'click':
        // Short beep for button clicks
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.stop(ctx.currentTime + 0.1);
        break;
        
      case 'correct':
        // Happy ascending beep for correct answers
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.stop(ctx.currentTime + 0.4);
        break;
        
      case 'wrong':
        // Sad descending buzz for wrong answers
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        oscillator.stop(ctx.currentTime + 0.5);
        break;
        
      case 'quiz_finish':
      case 'complete':
        // Victory fanfare for quiz completion
        const frequencies = [523, 659, 784, 1047]; // C5, E5, G5, C6
        frequencies.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);
          osc.type = 'square';
          gain.gain.setValueAtTime(0.1, ctx.currentTime + index * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + index * 0.15 + 0.3);
          
          osc.start(ctx.currentTime + index * 0.15);
          osc.stop(ctx.currentTime + index * 0.15 + 0.3);
        });
        return; // Don't use the main oscillator for this
        
      case 'start':
      case 'game_start':
        // Game start sound
        oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
        oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.stop(ctx.currentTime + 0.3);
        break;
        
      case 'hover':
        // Subtle hover sound
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.stop(ctx.currentTime + 0.05);
        break;
        
      default:
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.stop(ctx.currentTime + 0.1);
    }
    
    if (type !== 'quiz_finish' && type !== 'complete') {
      oscillator.start(ctx.currentTime);
    }
    
  } catch (error) {
    console.warn('Audio playback failed:', error);
  }
};

export const getAnimationSettings = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('animationsEnabled');
  return saved !== null ? JSON.parse(saved) : true;
};

export const getSoundSettings = () => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('soundEnabled');
  return saved !== null ? JSON.parse(saved) : true;
};
