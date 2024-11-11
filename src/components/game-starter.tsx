'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function GameStarter({ onGameReady }: { onGameReady?: () => void }) {
  const [count, setCount] = useState<number | string>(4);

  useEffect(() => {
    if (typeof count === 'number' && count > 0) {
      const interval = setInterval(() => {
        setCount((prevCount) => (prevCount as number) - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (count === 0) {
      setCount('Start!');
      setTimeout(() => {
        setCount(-1);
        onGameReady?.();
      }, 500);
    }
  }, [count]);

  const props = useSpring({
    from: { transform: 'scale(2)' },
    to: { transform: 'scale(1)' },
    reset: true,
    config: { duration: 500 },
  });

  return (
    <animated.div
      style={props}
      className={`text-center absolute ${count === -1 && 'hidden'} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h1
        className={
          'font-extrabold text-center -translate-x-1/2 text-9xl text-shadow-main-menu'
        }
      >
        {count}
      </h1>
    </animated.div>
  );
}
