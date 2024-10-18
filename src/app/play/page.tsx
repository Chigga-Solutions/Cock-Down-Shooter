'use client';

import { Chicken } from '@/components/chicken';
import { PauseButton } from '@/components/pause-button';
import { PauseMenu } from '@/components/pause-menu';
import { luckiestGuy } from '@/components/settings-menu';
import { generateChickenCoords } from '@/lib/utils';
import React, { ReactElement, useEffect, useState } from 'react';

export default function Play() {
  /* Game-global states */
  const [paused, setPaused] = useState(false);
  const [chicken, setChickens] = useState<React.ReactNode[]>([]);

  function pauseGame() {
    setPaused(true);
    console.log('[Game] Paused');
  }

  useEffect(() => {
    if (paused) {
      setChickens((prev) =>
        prev.map((chicken) => {
          return React.cloneElement(chicken as ReactElement, { move: false });
        }),
      );
    } else {
      setChickens((prev) =>
        prev.map((chicken) => {
          return React.cloneElement(chicken as ReactElement, { move: true });
        }),
      );
    }

    const interval = setInterval(() => {
      if (!paused) createSelfDestroyingChicken();
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  function createSelfDestroyingChicken() {
    // DO NOT TOUCH THIS
    const coords = generateChickenCoords();
    //todo: chicken speed based on lenght of coords - jakub
    setChickens((prev) => {
      return [
        ...prev,
        <Chicken
          key={Math.random()}
          onFinished={() => {
            setChickens((prev) =>
              prev.filter((_, i) => {
                return i !== Math.max(chicken.length - 1, 0);
              }),
            );
          }}
          posStart={coords[0]}
          posEnd={coords[1]}
          move={!paused}
        />,
      ];
    });
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < window.innerHeight) {
        pauseGame();
      } else {
        setPaused(false);
      }
    });

    document.addEventListener('visibilitychange', (e) => {
      if (document.hidden) {
        pauseGame();
      }
    });

    window.addEventListener('blur', () => {
      pauseGame();
    });

    return () => {
      window.removeEventListener('resize', () => {});
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('blur', () => {});
    }
  }, []);

  return (
    <main className={`${luckiestGuy} cursor-crosshair h-screen`}>
      {paused && (
        <>
          <div className="pointer-events-all z-10 bg-[#000000d9] fixed top-0 w-full h-full" />
          <PauseMenu onResume={() => setPaused(false)} />
        </>
      )}
      <PauseButton onClick={() => pauseGame()} />
      <div className="pl-2">
        <h1>Number of chicken: {chicken.length}</h1>
      </div>
      {chicken}
    </main>
  );
}
