"use client";

import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FlyingChickenProps {
  id: number;
  begin: number;
  end: number;
  mode: "vertical" | "horizontal";
  onRemove?: (id: number) => void;
}

const FlyingChicken = ({
  begin,
  end,
  mode = "horizontal",
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
          ? randomBetween(2000, 5000)
          : randomBetween(1000, 3000),
    },
  });

  return (
    <animated.div
      style={springs}
      onClick={() => setActivated(true)}
      className={`absolute w-24 h-24 cursor-crosshair border ${
        activated && "bg-red-500"
      }`}
    ></animated.div>
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
          appendChick();
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
