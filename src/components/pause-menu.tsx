import { useEffect } from 'react';
import { luckiestGuy } from './settings-menu';
import { useSpring, animated } from '@react-spring/web';
import { useRouter } from 'next/navigation';

export interface PauseMenuProps {
  onResume?: () => void;
}

export function PauseMenu({ onResume }: PauseMenuProps) {
  const router = useRouter();
  const [spring, api] = useSpring(
    () => ({
      from: {
        top: '0%',
      },
      config: {
        duration: 500,
        friction: 10,
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
      className={`bg-[#BE945A] ${luckiestGuy} z-10 flex text-center flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute w-[20%] h-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h1
        className={`text-shadow absolute w-full text-5xl left-1/2 -translate-x-1/2 -top-2`}
      >
        Pause Menu
      </h1>

      <div className="text-2xl mt-16 mb-4">
        idk what put there
      </div>

      <div className="flex justify-center mt-auto mb-4 gap-4">
        <button
          onClick={() => {
            router.push('../');
          }}
          className='border min-w-fit w-[45%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-red-500 to-red-600 rounded-md'
        >
          Exit
        </button>

        <button
          onClick={() => {
            api.start({
              from: { top: '50%' },
              top: '-50%',
              config: {
                duration: 200,
              },
              onRest: () => {
                onResume?.();
              },
            });
          }}
          className='border min-w-fit w-[45%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-green-500 to-green-600 rounded-md'
        >
          Resume
        </button>
      </div>
    </animated.div>
  );
}
