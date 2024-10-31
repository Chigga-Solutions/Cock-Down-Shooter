'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { luckiestGuy } from './settings-menu';
import { login } from './server-login-handler';

interface LoginFrameProps {
  onDone: () => void;
  onRegisterClick: () => void;
}

export function LoginFrame({ onDone, onRegisterClick }: LoginFrameProps) {
  const [spring, api] = useSpring(
    () => ({
      from: {
        top: '0%',
      },
      config: {
        duration: 1000,
      },
    }),
    [],
  );

  useEffect(() => {
    api.start({ top: '50%' });
  }, [api]);

  const [loginError, setLoginError] = useState<string | null>(null);

  return (
    <animated.div
      style={spring}
      className={`bg-[#BE945A] ${luckiestGuy} z-10 flex flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute max-w-fit py-7 p-4 max-h-fit left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      {loginError && (
        <div className="border bg-red-500 rounded border-red-600 p-2 mb-2">
          We couldn&lsquo;t sign you right now: {loginError}
        </div>
      )}
      <form className="flex flex-col gap-y-4">
        <label className="flex flex-col gap-y-1 font-semibold">
          Email Address:
          <input
            type="text"
            name="email"
            className="rounded px-2 py-1 text-gray-800"
          />
        </label>
        <label className="flex flex-col gap-y-1 font-semibold">
          Password:
          <input
            type="password"
            name="password"
            className="rounded px-2 py-1 text-gray-800"
          />
        </label>
        <div className="flex w-full gap-x-2">
          <button
            className="mt-auto flex-1 from-green-500 rounded py-2 to-green-600 bg-gradient-to-b"
            formAction={async (e) => {
              const res = await login(e);
              if (res) setLoginError(res);
              else onDone();
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              api.start({
                from: { top: '50%' },
                top: '-50%',
                onRest: () => {
                  onDone();
                },
              });
            }}
            type="button"
            className="mt-auto flex-1 from-red-500 rounded py-2 to-red-600 bg-gradient-to-b"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              api.start({
                from: { top: '50%' },
                top: '-50%',
                onRest: () => {
                  onRegisterClick();
                },
              });
            }}
            type="button"
            className="mt-auto flex-1 from-yellow-500 rounded py-2 to-yellow-600 bg-gradient-to-b"
          >
            Register
          </button>
        </div>
      </form>
    </animated.div>
  );
}
