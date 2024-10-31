'use client';

import { luckiestGuy, SettingsMenu } from '@/components/settings-menu';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import './globals.css';
import { CircleAlert, LogOut, User as LucideUser } from 'lucide-react';
import { LoginFrame } from '@/components/login-menu';
import { createClient } from '@/lib/supabase/client';
import { SignUpFrame } from '@/components/signup-menu';
import { User } from '@supabase/supabase-js';

export default function Home({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [isSettingsOpened, setSettingsOpened] = useState(false);
  const [isLoginPageOpened, setLoginPageOpened] = useState(false);
  const [isSignupPageOpened, setSignupPageOpened] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleClick = () => {
    setSettingsOpened(true);
  };

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    setUsername('Loading...');
    const usr = await supabase
      .from('profiles')
      .select(`username`)
      .eq('id', user.id)
      .single();

    if (usr.data) {
      setUsername(usr.data.username);
    } else setUsername(null);
  }, [supabase, user]);

  useEffect(() => {
    fetchProfile();
  }, [user, fetchProfile]);

  return (
    <main className={`${luckiestGuy} text-shadow bg-[url(/bg.webp)] bg-cover`}>
      {(isSettingsOpened || isLoginPageOpened || isSignupPageOpened) && (
        <>
          <div className="pointer-events-all z-10 bg-[#0000006b] fixed top-0 w-full h-full" />
        </>
      )}
      {isSettingsOpened && (
        <SettingsMenu onDone={() => setSettingsOpened(false)} />
      )}
      {isLoginPageOpened && (
        <LoginFrame
          onRegisterClick={() => {
            setSignupPageOpened(true);
            setLoginPageOpened(false);
          }}
          onDone={() => setLoginPageOpened(false)}
        />
      )}
      {isSignupPageOpened && (
        <SignUpFrame onDone={() => setSignupPageOpened(false)} />
      )}
      <div className="gap-x-4 flex justify-center items-center p-8">
        {!user ? (
          <button
            onClick={() => setLoginPageOpened(true)}
            className="border-4 p-0.5 w-12 h-12 rounded-md hover:-rotate-6 hover:scale-110 flex justify-center items-center transition-all bg-blue-500"
          >
            <LucideUser width={48} strokeWidth={3} height={48} />
          </button>
        ) : (
          <form action={'/auth/signout'} method='post'>
            <button
              formAction={async () => {
                await fetch('/auth/signout', { method: 'POST' });
                router.refresh();
                await fetchProfile();
              }}
              className="border-4 p-0.5 w-12 h-12 rounded-md hover:-rotate-6 hover:scale-110 flex justify-center items-center transition-all bg-red-500"
            >
              <LogOut width={48} strokeWidth={3} height={48} />
            </button>
          </form>
        )}
        <h1 className="text-2xl translate-y-0.5">Logged-in as:</h1>
        <div className="flex justify-center items-center gap-x-2">
          <h1 className="translate-y-0.5 text-2xl">
            {username || 'Anonymous'}
          </h1>
          {!username && (
            <div className="flex justify-center items-center gap-x-2 text-yellow-300">
              <CircleAlert strokeWidth={3} />
              Score will not be saved
            </div>
          )}
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
