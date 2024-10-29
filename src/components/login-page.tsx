'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect } from 'react';
import { luckiestGuy } from './settings-menu';

interface LoginPageProps {
  onDone: () => void;
}

export function LoginPage({ onDone }: LoginPageProps) {
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

  return (
    <animated.div
      style={spring}
      className={`bg-[#BE945A] ${luckiestGuy} z-10 flex flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute max-w-fit p-4 max-h-fit left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <form className="flex flex-col gap-y-4">
        <label className="flex flex-col gap-y-1 font-semibold">
          Username:
          <input type="text" className="rounded px-2 py-1 text-gray-800" />
        </label>
        <label className="flex flex-col gap-y-1 font-semibold">
          Password:
          <input type="password" className="rounded px-2 py-1 text-gray-800" />
        </label>
        <div className="flex w-full gap-x-2">
          <button
            className="mt-auto flex-1 from-green-500 rounded py-2 to-green-600 bg-gradient-to-b"
            type="submit"
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
        </div>
      </form>
    </animated.div>
  );
}
