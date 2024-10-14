"use client";

import { luckiestGuy, SettingsMenu } from "@/components/settings-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

import './globals.css';

export default function Home() {
  const router = useRouter();
  const [isSettingsOpened, setSettingsOpened] = useState(false);

  const handleClick = () => {
    setSettingsOpened(true);
  };

  return (
    <main className={`${luckiestGuy} flex justify-center items-center h-screen flex-col bg-[url(/bg.webp)] bg-cover`}>
      { isSettingsOpened && <SettingsMenu onDone={() => setSettingsOpened(false)} /> }
      <h1 className={`${luckiestGuy} text-shadow-main-menu mb-32 font-bold text-[5vw]`}>Cock Down Shooter</h1>
      <button
        onClick={() => {
          router.push("/play");
        }}
        disabled={isSettingsOpened}
        className="hover:scale-110 transition-all irregular-button rounded-[0.6vw] w-[15vw] h-[6vw] text-[3vw] bg-gradient-to-b from-green-500 to-green-600 font-bold"
      >
        Play
      </button>
      <button
        onClick={handleClick}
        disabled={isSettingsOpened}
        className={`hover:scale-105 transition-transform rounded-[0.6vw] w-[12.5vw] h-[4vw] text-[2vw] mt-[1vw] bg-gradient-to-b from-cyan-500 to-blue-500 font-bold`}
      >
        Settings
      </button>
    </main>
  );
}
