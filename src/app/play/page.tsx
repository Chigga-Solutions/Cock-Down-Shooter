'use client';

import { Chicken } from '@/components/chicken';
import { PauseButton } from '@/components/pause-button';
import { PauseMenu } from '@/components/pause-menu';
import { luckiestGuy } from '@/components/settings-menu';
import { ReloadSound, ShotSound } from '@/lib/sounds';
import { areOverlapped, CLICK_RANGE, generateChickenCoords } from '@/lib/utils';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

interface LivingChicken {
  id: string;
  chicken: React.ReactNode;
}

export default function Play() {
  /* Game-global states */
  const [paused, setPaused] = useState(false);
  const [chicken, setChickens] = useState<LivingChicken[]>([]);
  const [bullets, setBullets] = useState(5);
  const [showRotateMessage, setShowRotateMessage] = useState(false);
  const [score, setScore] = useState(0);
  const playStateRef = useRef(paused);

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
            chicken: React.cloneElement(c.chicken as ReactElement, {
              move: false,
            }),
          };
        }),
      );
    } else {
      setChickens((prev) =>
        prev.map((c) => {
          return {
            ...c,
            chicken: React.cloneElement(c.chicken as ReactElement, {
              move: true,
            }),
          };
        }),
      );
    }

    const interval = setInterval(() => {
      if (!paused) createSelfDestroyingChicken();
    }, 1000);

    playStateRef.current = paused;

    return () => clearInterval(interval);
  }, [paused]);

  function createSelfDestroyingChicken() {
    // DO NOT TOUCH THIS
    setChickens((prev) => {
      // Create a unique id for the chicken
      const coords = generateChickenCoords();
      const lenght = Math.sqrt(
        Math.pow(coords[1][0] - coords[0][0], 2) +
          Math.pow(coords[1][1] - coords[0][1], 2),
      );
      const id = Math.random().toString(36).substring(2, 9);

      return [
        ...prev,
        {
          id,
          chicken: (
            <Chicken
              key={id}
              onFinished={() => {
                
                //setScore((prev) => prev - 1);decrease only if its shoted
                setChickens(
                  (prev) => prev.filter((chicken) => chicken.id !== id), // Remove the chicken by id
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
    const resizeEvent = () => {
      if (window.innerWidth < window.innerHeight) {
        setShowRotateMessage(true); 
        pauseGame(); 
        setChickens([]);
      } else {
        setShowRotateMessage(false);
        setPaused(false);
      }
    };

    const visibilityChange = () => {
      if (document.hidden) {
        pauseGame();
      }
    };

    const blurEvent = () => {
      pauseGame();
    };

    const clickEvent = (e: MouseEvent) => {
      setBullets((prevBullets) => {
        if (prevBullets > 0 && playStateRef.current === false) {
          const clientRect = new DOMRect(
            e.clientX - CLICK_RANGE / 2,
            e.clientY - CLICK_RANGE / 2,
            CLICK_RANGE,
            CLICK_RANGE,
          );

          ShotSound().play();
          
          for (const element of document.getElementsByClassName('cocked')) {
            if (areOverlapped(clientRect, element.getBoundingClientRect())) {
              setScore((prev) => prev + 1);
              element.classList.add('bg-red-500');
              // => delete chicken when shoted
            }
          }
      
          return prevBullets - 1;
        } else {
          //console.log('out of ammo');
          return prevBullets;
        }
      });
    };

    const keyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        ReloadSound().play();
        setBullets(5);
      } else if (e.code === 'Escape') {
        pauseGame();
      }
    };

    document.addEventListener('click', clickEvent);
    window.addEventListener('resize', resizeEvent);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('visibilitychange', visibilityChange);
    window.addEventListener('blur', blurEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
      document.removeEventListener('visibilitychange', visibilityChange);
      document.removeEventListener('click', clickEvent);
      document.removeEventListener('keydown', keyDown);
      window.removeEventListener('blur', blurEvent);
    };
  }, []);

  return (
    <main className={`${luckiestGuy} select-none cursor-crosshair h-screen`}>
      {paused && !showRotateMessage && ( 
        <>
          <div className='pointer-events-all z-10 bg-[#000000d9] fixed top-0 w-full h-full' />
          <PauseMenu onResume={() => setPaused(false)} />
        </>
      )}
      {showRotateMessage && ( 
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black p-4 rounded shadow-lg text-2xl'>
          <h2 className='text-center'>Rotate your display to continue playing</h2>
        </div>
      )}
      <PauseButton onClick={() => pauseGame()} />
      <div className='pl-2'>
        <h1>Number of chicken: {chicken.length}</h1>
        <h1>Score: {score}</h1>
      </div>
      {chicken.map((c) => c.chicken)}
      <div className='fixed top-6 right-6 w-full flex justify-end'>
        <div className='flex space-x-2'>
          {Array.from({ length: bullets }).map((_, index) => (
            <div
              key={`filled-${index}`}
              className="w-12 h-12 bg-[url('/bullet.png')] bg-cover"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
