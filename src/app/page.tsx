'use client';

import { luckiestGuy, SettingsMenu } from '@/components/settings-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import './globals.css';
import { CircleAlert, User } from 'lucide-react';
import { LoginFrame } from '@/components/login-menu';

export default function Home() {
  const router = useRouter();
  const [isSettingsOpened, setSettingsOpened] = useState(false);
  const [isLoginPageOpened, setLoginPageOpened] = useState(false);

  const handleClick = () => {
    setSettingsOpened(true);
  };

  return (
    <main className={`${luckiestGuy} text-shadow bg-[url(/bg.webp)] bg-cover`}>
      {isSettingsOpened && (
        <SettingsMenu onDone={() => setSettingsOpened(false)} />
      )}
      {isLoginPageOpened && (
        <LoginFrame onDone={() => setLoginPageOpened(false)} />
      )}
      <div className="gap-x-4 flex justify-center items-center p-8">
        <button
          onClick={() => setLoginPageOpened(true)}
          className="border-4 p-0.5 rounded-md hover:animate-shake hover:scale-105 transition-all bg-blue-500"
        >
          <User />
        </button>
        <h1 className="text-2xl translate-y-0.5">Logged-in as:</h1>
        <div className="flex justify-center items-center gap-x-2">
          <h1 className="translate-y-0.5 text-2xl">Anonymous</h1>
          <div className="flex justify-center items-center gap-x-2 text-yellow-300">
            <CircleAlert strokeWidth={3} />
            Score will not be saved
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1
          className={`${luckiestGuy} text-shadow-main-menu mb-32 font-bold text-[5vw]`}
        >
          Cock Down Shooter
        </h1>
        <button
          onClick={() => {
            router.push('/play');
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
      </div>
    </main>
  );
}
