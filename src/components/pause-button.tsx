'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface PauseButtonProps {
  onClick?: () => void;
}

export function PauseButton({ onClick }: PauseButtonProps) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  return (
    <Image
      className={`cursor-pointer ${
        clicked ? 'scale-110' : 'hover:scale-105'
      } w-[6vw] h-[6vw] transition-transform`}
      src='/menu-btn.png'
      id='pause-butt'
      width={'512'}
      height={'512'}
      alt='ERR:FNF'
      onClick={() => {
        setClicked(true);
        onClick?.();
      }}
    />
  );
}
