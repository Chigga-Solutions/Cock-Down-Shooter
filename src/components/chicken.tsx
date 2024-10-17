'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';

interface ChickenProps {
  move: boolean;
  onFinished?: () => void;
  posStart?: [left: number, down: number];
  posEnd?: [left: number, down: number];
}

export function Chicken({
  move,
  onFinished,
  posStart = [0, 0],
  posEnd = [0, 0],
}: ChickenProps) {
  console.log(posStart, posEnd);
  
  const [spring, api] = useSpring(
    () => ({
      from: {
        left: `${posStart[0]}%`,
        bottom: `${posStart[1]}%`
      },
    }),
    [posStart],
  );

  useEffect(() => {
    api.start({
      left: `${posEnd[0]}%`,
      bottom: `${posEnd[1]}%`,
      config: {
        velocity: 0.5,
      },
      onRest: (a) => {
        if (a.finished) {
          onFinished?.();
        }
      },
    });
  }, [posEnd]);

  useEffect(() => {
    if (move) {
      api.resume();
    } else {
      api.pause();
    }
  }, [move]);

  return (
    <animated.div
      style={spring}
      className={`absolute border w-4 h-4`}
    >
      🐔
    </animated.div>
  );
}
