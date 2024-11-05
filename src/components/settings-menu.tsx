'use client';

import '@/app/globals.css';
import { AudioConfiguration } from '@/lib/sounds';
import { useSpring, animated } from '@react-spring/web';
import { Luckiest_Guy } from 'next/font/google';
import { ChangeEvent, useEffect, useState } from 'react';

const LuckiestGuy = Luckiest_Guy({
  weight: ['400'],
  subsets: ['latin'],
});

export const luckiestGuy = LuckiestGuy.className;

interface SettingsMenuProps {
  onDone?: () => void;
}

export function SettingsMenu({ onDone }: SettingsMenuProps) {
  const [spring, api] = useSpring(
    () => ({
      from: {
        top: '0%',
      },
      config: {
        duration: 1000,
      },
    }),
    [],
  );

  const [difficulty, setDifficulty] = useState(() => {
    const savedDifficulty = localStorage.getItem('difficulty');
    return savedDifficulty ? savedDifficulty : 'easy';
  });

  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('volume');
    return savedVolume ? (parseFloat(savedVolume)) : 0.5;
  });

  const handleDifficultyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    localStorage.setItem('difficulty', newDifficulty);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = event.target.value;
    setVolume(parseFloat(newVolume));
    AudioConfiguration.volume = parseFloat(newVolume) / 100;
    localStorage.setItem('volume', newVolume);
  };
 

  useEffect(() => {
    api.start({ top: '50%' });
  }, [api]);

  

  return (
    <animated.div
      style={spring}
      className={`bg-[#BE945A] ${LuckiestGuy.className} z-10 flex flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute w-[40%] h-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h1
        className={`text-shadow absolute text-5xl left-1/2 -translate-x-1/2 -top-0`}
      >
        Settings
      </h1>

      <div className="flex flex-col items-center mt-20 mb-4">
        <label htmlFor="volume" className="text-2xl mb-2">Volume</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-[80%] accent-[#59ff00]"
        />
      </div>

      <div className="flex flex-col items-center mt-8 mb-4">
        <label className="text-2xl mb-2">Difficulty</label>
        <div>
          <label className="block mb-2">
            <input
              type="radio"
              value="easy"
              checked={difficulty === 'easy'}
              onChange={handleDifficultyChange}
            />
            Easy
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="medium"
              checked={difficulty === 'medium'}
              onChange={handleDifficultyChange}
            />
            Medium
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="hard"
              checked={difficulty === 'hard'}
              onChange={handleDifficultyChange}
            />
            Hard
          </label>
        </div>
      </div>

      <button
        onClick={() => {
          api.start({
            from: { top: '50%' },
            top: '-50%',
            onRest: () => {
              onDone?.();
            },
          });
        }}
        className='border mb-2 mt-auto self-center w-[20%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-green-500 to-green-600 rounded-md'
      >
        Done
      </button>
    </animated.div>
  );
}
