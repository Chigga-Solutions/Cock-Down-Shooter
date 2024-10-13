"use client";

import { luckiestGuy, SettingsMenu } from "@/components/settings-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isSettingsOpened, setSettingsOpened] = useState(false);

  const handleClick = () => {
    setSettingsOpened(true);
  };

  return (
    <main className="flex justify-center items-center h-screen flex-col bg-[url(/bg_main.png)] bg-cover">
      { isSettingsOpened && <SettingsMenu onDone={() => setSettingsOpened(false)} /> }
      <h1 className={`${luckiestGuy} font-bold text-[5vw] text-red-600`}>Cock Down Shooter</h1>
      <button
        onClick={() => {
          router.push("/play");
        }}
        className="border-[0.4vw] rounded-[0.6vw] w-[15vw] h-[6vw] text-[3vw] bg-black hover:bg-green-800 font-bold"
      >
        Play
      </button>
      <button
        onClick={handleClick}
        className="border-[0.4vw] rounded-[0.6vw] w-[12.5vw] h-[4vw] text-[2vw] mt-[1vw] bg-black hover:bg-green-700 font-bold"
      >
        Settings
      </button>
    </main>
  );
}
