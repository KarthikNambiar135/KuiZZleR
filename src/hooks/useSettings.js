'use client';
import { useState, useEffect } from 'react';
import { playSound as playSoundUtil, getAnimationSettings, getSoundSettings } from '@/utils/audioUtils';

export const useSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(getSoundSettings());
    setAnimationsEnabled(getAnimationSettings());
    
    // Apply animation settings to document
    updateAnimationSettings(getAnimationSettings());
  }, []);

  const updateAnimationSettings = (enabled) => {
    if (typeof document !== 'undefined') {
      if (enabled) {
        document.documentElement.classList.remove('animations-disabled');
        document.documentElement.style.setProperty('--animation-duration', '1');
      } else {
        document.documentElement.classList.add('animations-disabled');
        document.documentElement.style.setProperty('--animation-duration', '0');
      }
    }
  };

  const playSound = (type) => {
    playSoundUtil(soundEnabled, type);
  };

  const getMotionProps = (baseProps) => {
    if (!animationsEnabled) {
      return {
        initial: false,
        animate: false,
        exit: false,
        transition: { duration: 0 },
        whileHover: {},
        whileTap: {},
        layout: false
      };
    }
    return baseProps;
  };

  // Enhanced button props that include sound
  const getButtonProps = (soundType = 'button', baseProps = {}) => {
    const motionProps = getMotionProps({
      whileHover: { 
        scale: 1.05,
        transition: { duration: 0.1, ease: "easeOut" }
      },
      whileTap: { 
        scale: 0.95,
        transition: { duration: 0.05, ease: "easeInOut" }
      },
      ...baseProps
    });

    return {
      ...motionProps,
      onClick: (e) => {
        playSound(soundType);
        if (baseProps.onClick) baseProps.onClick(e);
      },
      onMouseEnter: (e) => {
        if (soundEnabled && animationsEnabled) playSound('hover');
        if (baseProps.onMouseEnter) baseProps.onMouseEnter(e);
      }
    };
  };

  return {
    soundEnabled,
    animationsEnabled,
    playSound,
    getMotionProps,
    getButtonProps,
    updateAnimationSettings
  };
};
