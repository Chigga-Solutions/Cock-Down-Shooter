"use client";

import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FlyingChickenProps {
  id: number;
  begin: number;
  end: number;
  mode: "vertical" | "horizontal";
  size: number;
  onRemove?: (id: number) => void;
}

const FlyingChicken = ({
  begin,
  end,
  mode = "horizontal",
  size,
}: FlyingChickenProps) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth + 1);
    setScreenHeight(window.innerHeight + 1);
  }, []);

  const springs = useSpring({
    from: {
      left: mode === "horizontal" ? 0 : begin,
      top: mode === "horizontal" ? begin : 0,
    },
    to: {
      left: mode === "horizontal" ? screenWidth : end,
      top: mode === "horizontal" ? end : screenHeight,
    },
    config: {
      duration:
        mode === "horizontal"
          ? randomBetween(3000, 5000)
          : randomBetween(3000, 5000),
    },
  });

  return (
    <animated.div
    style={{
      ...springs,
      //width: `${size}px`, 
      //height: `${size}px`,
    }}
      onClick={() => setActivated(true)}
      className={`absolute w-[size] h-[size] cursor-crosshair bg-cover ${
        activated && "bg-[url(/chick.png)]"
      }`}
      
    >
      <Image
        src="/normalChick.png"
        alt="Flying chicken"
        width={size}
        height={size}
        draggable={false}
        style={{
          userSelect: "none",             
          pointerEvents: "none",        
        }}
        
      />
    </animated.div>
  );
};

export default function Play() {
  const [clicked, setClicked] = useState(false);
  const [chickens, setChickens] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      appendChick();
    }, 1000);

    return () => clearInterval(interval);
  });

  const appendChick = () => {
    const id = chickens.length;
    const mode = decideBetween("horizontal", "vertical");
    const size = randomBetween(30, 100);
    setChickens([
      ...chickens,
      <FlyingChicken
        key={Math.random()}
        id={id}
        mode={mode}
        begin={
          mode === "horizontal"
            ? randomInt(window.innerHeight)
            : randomInt(window.innerWidth)
        }
        end={
          mode === "horizontal"
            ? randomInt(window.innerHeight)
            : randomInt(window.innerWidth)
        }
        size={size}
      />,
    ]);
  };

  return (
    <main>
      <Image
        className={`cursor-pointer ${
          clicked ? "scale-110" : "hover:scale-105"
        } w-[5vw] h-[5vw] transition-transform`}
        src="/menu-btn.png"
        onClick={() => {
          setClicked(true);
          //appendChick();
        }}
        width={"512"}
        height={"512"}
        alt="ERR:FNF"
      />
      <h1>{chickens.length}</h1>
      {...chickens}
    </main>
  );
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function decideBetween<T>(a: T, b: T): T {
  return Math.random() > 0.5 ? a : b;
}
