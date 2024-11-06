'use client';

import { Chicken } from '@/components/chicken';
import { PauseButton } from '@/components/pause-button';
import { PauseMenu } from '@/components/pause-menu';
import { EndMenu } from '@/components/end-menu';
import { luckiestGuy } from '@/components/settings-menu';
import { ReloadSound, ShotSound } from '@/lib/sounds';
import { areOverlapped, CLICK_RANGE, generateChickenCoords } from '@/lib/utils';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { GameStarter } from '@/components/game-starter';


interface LivingChicken {
  id: string;
  chicken: React.ReactNode;
}

export default function Play() {
  /* Game-global states */
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [chicken, setChickens] = useState<LivingChicken[]>([]);
  const [bullets, setBullets] = useState(5);
  const [showRotateMessage, setShowRotateMessage] = useState(false);
  const [score, setScore] = useState(0);
  const playStateRef = useRef(paused);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [chickensSpawned, setChickensSpawned] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

 
  
  function pauseGame() {
    setPaused(true);
    setTimerRunning(false);
    console.log('[Game] Paused');
  }

  function endGame() {
    setEnded(true);
    setTimerRunning(false);
    console.log('[Game] Ended');
  }

  function startGame() {
    setGameStarted(true);
    setTimerRunning(true); 
    console.log('[Game] Started');
  }

  function resetGame() {//not working!!!
    setTimer(60);
    setScore(0);
    setBullets(5);
    setChickens([]);
    setEnded(false);
    setPaused(false);
    setChickensSpawned(0);
    setTimerRunning(false);
    setGameStarted(false);
  }

  function generateSpeed(min: number) {
    return Math.random() > 0.75 ? min + 250 : Math.random() > 0.50 ? min + 500 : Math.random() > 0.25 ? min + 750 : min + 1000;
  }

  useEffect(() => {
    if (paused || ended) {
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
      if (!paused && !ended && gameStarted) createSelfDestroyingChicken();
    }, difficulty == "easy" ? 1000 : difficulty == "medium" ? 750 : 500);

    playStateRef.current = paused;

    return () => clearInterval(interval);
  }, [paused, ended, gameStarted]);

  useEffect(() => {
    const gameStartTimeout = setTimeout(() => {
      startGame();
    }, 4000); 

    return () => {
      clearTimeout(gameStartTimeout);
    };
  }, []);

  useEffect(() => {
    if (timerRunning && !paused && !ended) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 0) {
            clearInterval(countdown);
            endGame();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(countdown); 
    }
  }, [timerRunning, paused, ended]);


  function createSelfDestroyingChicken() {
    setChickensSpawned((prevCount) => prevCount + 1);
    // DO NOT TOUCH THIS
    setChickens((prev) => {
      // Create a unique id for the chicken
      const coords = generateChickenCoords();
      const id = Math.random().toString(36).substring(2, 9);

      return [
        ...prev,
        {
          id,
          chicken: (
            <Chicken
              key={id}
              onFinished={() => {
                
                setChickens(
                  (prev) => prev.filter((chicken) => chicken.id !== id), // Remove the chicken by id
                );
              }}
              posStart={coords[0]}
              posEnd={coords[1]}
              move={!paused && !ended}
              speed={difficulty == "easy" ? generateSpeed(4000) : difficulty == "medium" ? generateSpeed(3000) : generateSpeed(2000)}
            />
          ),
        } as LivingChicken,
      ];
    });
  }

  useEffect(() => {
    setDifficulty(localStorage.getItem('difficulty'));

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
          return prevBullets;
        }
      });
    };

    const keyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setBullets((currentBullets) => {
          if (currentBullets < 5) {
            ReloadSound().play();
            setTimeout(() => {
              setBullets(5);
            }, 500);
          }
          return currentBullets;
        });
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
    <main className={`${luckiestGuy} select-none cursor-cross h-screen bg-[url(/background.webp)] bg-cover`}>
      <GameStarter/>
      {ended && !showRotateMessage && ( 
        <>
          <div className='pointer-events-all z-10 bg-[#000000d9] fixed top-0 w-full h-full' />
          <EndMenu 
            onRetry={() => {resetGame}} 
            score={score} 
            allChick={chickensSpawned}
          />
        </>
      )}
      {paused && !showRotateMessage && ( 
        <>
          <div className='pointer-events-all z-10 bg-[#000000d9] fixed top-0 w-full h-full' />
          <PauseMenu
            onResume={() => {
              setPaused(false);
              setTimerRunning(true); 
            }}
          />
        </>
      )}
      {showRotateMessage && ( 
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black p-4 rounded shadow-lg text-2xl'>
          <h2 className='text-center'>Rotate your display to continue playing</h2>
        </div>
      )}
      <PauseButton onClick={() => pauseGame()} />
      <div className='pl-2'>
        <h1 className='text-2xl text-red-600'>Score: {score}</h1>
        <h1 className='text-2xl text-red-600'>Time Remaining: {timer}s</h1>
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
