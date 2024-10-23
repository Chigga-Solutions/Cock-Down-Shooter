'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface ChickenProps {
  move: boolean;
  onFinished?: () => void;
  posStart?: [left: number, down: number];
  posEnd?: [left: number, down: number];
  speed: number;
}

export function Chicken({
  move,
  onFinished,
  posStart = [0, 0],
  posEnd = [0, 0],
  speed = 0,
}: ChickenProps) {
  const [debugState, setDebug] = useState(false);

  const [spring, api] = useSpring(
    () => ({
      from: {
        left: `${posStart[0]}%`,
        bottom: `${posStart[1]}%`,
      },
    }),
    [posStart],
  );

  useEffect(() => {
    api.start({
      left: `${posEnd[0]}%`,
      bottom: `${posEnd[1]}%`,
      config: {
        duration: speed,
      },
      onRest: (a) => {
        if (a.finished) {
          setDebug(true);
          
          onFinished?.();
        }
      },
    });
  }, [posEnd, api, onFinished]);

  useEffect(() => {
    console.log('move changed', move);

    if (move) {
      api.resume();
    } else {
      api.pause();
    }
  }, [move, api]);

  return (
    <animated.div style={spring} className={`absolute cocked ${debugState && 'bg-red-500'} border w-4 h-4`}>
      🐔
    </animated.div>
  );
}
