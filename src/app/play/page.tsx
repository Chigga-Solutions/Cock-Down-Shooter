"use client";

import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { randomBetween, randomInt, decideBetween } from "@/lib/utils";
import { PauseMenu } from "@/components/pause-menu";

interface FlyingChickenProps {
  id: number;
  begin: number;
  end: number;
  mode: "vertical" | "horizontal";
  size: number;
  onRemove?: (id: number) => void;
  paused?: boolean;
}

const FlyingChicken = ({
  begin,
  end,
  mode = "horizontal",
  size,
  paused
}: FlyingChickenProps) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [imageSource, setImageSource] = useState("/normalChick.png");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth + 1);
    setScreenHeight(window.innerHeight + 1);
  }, []);

  const [springs, api] = useSpring(() => ({
    from: {
      left: mode === "horizontal" ? -size : begin,
      top: mode === "horizontal" ? begin : -size,
    }
  }), []);

  api.start({
    to: {
      left: mode === "horizontal" ? screenWidth : end,
      top: mode === "horizontal" ? end : screenHeight,
    },
    config: {
      duration:
        mode === "horizontal"
          ? randomBetween(5000, 7000)
          : randomBetween(5000, 7000),
    },
    onRest: () => {
      setDone(true);
    }
  })

  useEffect(() => {
    if (paused) {
      console.log('[CDS] Pausing chicken...');
      api.pause();
    } else {
      console.log('[CDS] Unpausing chicken...');
      api.resume();
    }
  }, [paused, api]);

  return (
    <animated.div
      style={springs}
      onClick={() => {
        setImageSource("/chick.png");
      }}
      className={`absolute chicken w-[size] h-[size] bg-cover ${done && "hidden"}`}
    >
      <Image
        src={imageSource}
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
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(false);
      }, 200);
    }
  }, [clicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        appendChick();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    const visibilityChangeEvent = (e: Event) => {
      if (document.hidden) {
        console.log('[CDS] Pausing game...');
        setPaused(true);
      } else {
        console.log('[CDS] Unpausing game...');
      }
    }

    const clickEvent = (e: MouseEvent) => {
      e.preventDefault();
      document.elementsFromPoint(e.clientX, e.clientY).forEach((element) => {
        if (element instanceof HTMLElement && element.classList.contains('chicken')) {
          console.log('[CDS] Clicked on element:', element);
          element.click();
        }
      });
    }

    document.addEventListener('click', clickEvent);
    document.addEventListener('visibilitychange', visibilityChangeEvent);

    return () => {
      document.removeEventListener('visibilitychange', visibilityChangeEvent);
      document.removeEventListener('click', clickEvent);
    };
  }, []);

  const appendChick = () => {
    const id = chickens.length;
    const mode = decideBetween("horizontal", "vertical");
    const size = randomBetween(60, 120);
    setChickens([
      ...chickens,
      <FlyingChicken
        key={`${id}-${paused}`}
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
        paused={paused}
        size={size}
      />,
    ]);
  };

  return (
    <main className="cursor-crosshair h-screen">
      {paused && <><PauseMenu /><div className='pointer-events-all bg-[#000000d9] fixed top-0 w-full h-full' /></>}
      <Image
        className={`cursor-pointer ${
          clicked ? "scale-110" : "hover:scale-105"
        } w-[5vw] h-[5vw] transition-transform`}
        src="/menu-btn.png"
        onClick={() => {
          setClicked(true);
          setPaused(true);
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
