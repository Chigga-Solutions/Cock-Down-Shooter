'use client';

import { Chicken } from '@/components/chicken';
import { PauseButton } from '@/components/pause-button';
import { PauseMenu } from '@/components/pause-menu';
import { luckiestGuy } from '@/components/settings-menu';
import { areOverlapped, CLICK_RANGE, generateChickenCoords } from '@/lib/utils';
import React, { ReactElement, useEffect, useState } from 'react';

interface LivingChicken {
  id: string;
  chicken: React.ReactNode;
}

export default function Play() {
  /* Game-global states */
  const [paused, setPaused] = useState(false);
  const [chicken, setChickens] = useState<LivingChicken[]>([]);

  function pauseGame() {
    setPaused(true);
    console.log('[Game] Paused');
  }

  useEffect(() => {
    if (paused) {
      setChickens((prev) =>
        prev.map((c) => {
          return {
            ...c,
            chicken: React.cloneElement(c.chicken as ReactElement, { move: false }),
          };
        })
      );
    } else {
      setChickens((prev) =>
        prev.map((c) => {
          return {
            ...c,
            chicken: React.cloneElement(c.chicken as ReactElement, { move: true }),
          };
        })
      );
    }
    

    const interval = setInterval(() => {
      if (!paused) createSelfDestroyingChicken();
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  function createSelfDestroyingChicken() {
    // DO NOT TOUCH THIS
    setChickens((prev) => {
      // Create a unique id for the chicken
      const coords = generateChickenCoords();
      const lenght = Math.sqrt(Math.pow((coords[1][0] - coords[0][0]),2) + Math.pow((coords[1][1] - coords[0][1]),2));
      const id = Math.random().toString(36).substring(2, 9);
    
      return [
        ...prev,
        {
          id,
          chicken: (
            <Chicken
              key={id}
              onFinished={() => {
                setChickens((prev) =>
                  prev.filter((chicken) => chicken.id !== id) // Remove the chicken by id
                );
              }}
              posStart={coords[0]}
              posEnd={coords[1]}
              move={!paused}
              speed={lenght < 70 ? 6000 : 4000}
            />
          ),
        } as LivingChicken,
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

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseGame();
      }
    });

    window.addEventListener('blur', () => {
      pauseGame();
    });

    document.addEventListener('click', e => {
      const clientRect = new DOMRect(e.clientX - (CLICK_RANGE / 2), e.clientY - (CLICK_RANGE / 2), CLICK_RANGE, CLICK_RANGE);
      for (const element of document.getElementsByClassName('cocked')) {
        if (areOverlapped(clientRect, element.getBoundingClientRect())) {
          element.classList.add('bg-red-500');
        }
      }
    })

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
      {chicken.map((c) => c.chicken)}
    </main>
  );
}
