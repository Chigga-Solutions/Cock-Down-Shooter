"use client"

import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const FlyingChicken = ({begin, end}: {begin: number, end: number}) => {

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth + 1);
  }, []);

  const springs = useSpring({
    from: { left: 0, top: begin },
    to: { left: screenWidth, top: end },
    config: { duration: 2000 },
  })

  return (
    <animated.div 
      style={springs}
      className={`absolute w-24 h-24 cursor-crosshair border`}>
    </animated.div>
  );
}

export default function Play() {
  const [clicked, setClicked] = useState(false);
  const [chickens, setChickens] = useState<React.ReactNode[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      // appendChick();
    }, 500);

    return () => clearInterval(interval);
  })

  const appendChick = () => {    
    setChickens([...chickens, <FlyingChicken begin={randomInt(window.innerHeight)} 
      end={randomInt(window.innerHeight)} />])
  }

  return (
	<main ref={mainRef}>
    <Image className={`cursor-pointer ${clicked ? 'scale-110' : 'hover:scale-105'} w-[5vw] h-[5vw] transition-transform`}
      src="/menu-btn.png"
      onClick={(e) => {
        setClicked(true);
        appendChick();
      }}
      width={"512"}
      height={"512"}
      alt="ERR:FNF"
    />
    {...chickens}
	</main>
  );
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}