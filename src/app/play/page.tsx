'use client';

import { Chicken } from '@/components/chicken';
import { PauseButton } from '@/components/pause-button';
import { PauseMenu } from '@/components/pause-menu';
import { luckiestGuy } from '@/components/settings-menu';
import { generateChickenCoords } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export default function Play() {
  /* Game-global states */
  const [paused, setPaused] = useState(false);
  const [chicken, setChickens] = useState<React.ReactNode[]>([]);

  function createSelfDestroyingChicken() {
    // DO NOT TOUCH THIS
    const coords = generateChickenCoords();
    console.log(coords);
    
    setChickens([
      <Chicken
        key={Math.max(chicken.length - 1, 0)}
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
    ]);
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < window.innerHeight) {
        setPaused(true);
      } else {
        setPaused(false);
      }
    });
    createSelfDestroyingChicken();
  }, []);

  return (
    <main className={`${luckiestGuy} cursor-crosshair h-screen`}>
      {paused && (
        <>
          <div className="pointer-events-all z-10 bg-[#000000d9] fixed top-0 w-full h-full" />
          <PauseMenu onResume={() => setPaused(false)} />
        </>
      )}
      <PauseButton onClick={() => setPaused(true)} />
      <div className="pl-2">
        <h1>Number of chicken: {chicken.length}</h1>
      </div>
      {chicken}
    </main>
  );
}
