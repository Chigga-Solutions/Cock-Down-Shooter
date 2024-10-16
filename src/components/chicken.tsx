'use client';

import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";

export function Chicken({ move, onFinished }: { move: boolean, onFinished?: () => void }) {
  const [spring, api] = useSpring(() => ({
    from: {
      left: '0%'
    }
  }), []);

  useEffect(() => {
    api.start({
      left: '50%',
      config: {
        duration: 1000
      },
      onRest: (a) => {
        if (a.finished) {
          onFinished?.();
        }
      }
    });
  }, [])

  useEffect(() => {
    if (move) {
      api.resume();
    } else {
      api.pause();
    }
  }, [move]);

  return <animated.div style={spring} className={`absolute border top-24 w-4 h-4`}></animated.div>
}