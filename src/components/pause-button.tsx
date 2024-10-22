'use client';

import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';

export interface PauseButtonProps {
  onClick?: (e: MouseEvent) => void;
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
      } w-[5vw] h-[5vw] transition-transform`}
      src="/menu-btn.png"
      width={'512'}
      height={'512'}
      alt="ERR:FNF"
      onClick={(e) => {
        setClicked(true);
        onClick?.(e);
      }}
    />
  );
}
