import { useEffect, useState } from 'react';
import { luckiestGuy } from './settings-menu';
import { useSpring, animated } from '@react-spring/web';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Check, X } from 'lucide-react';

export interface EndMenuProps {
  score: number;
  difficulty?: string;
  allChick: number;
}

function calculateScore(score: number, difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return score * 1;
    case 'medium':
      return score * 1.5;
    case 'hard':
      return score * 2;
    default:
      return score * 1;
  }
}

export function EndMenu({ score, allChick, difficulty = 'easy' }: EndMenuProps) {
  const router = useRouter();
  const [scoreSaved, setScoreSaved] = useState(false);

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

  useEffect(() => {
    const supabase = createClient();

    async function updateScore() {
      console.log('[CDS] Updating score...');
      
      const user = await supabase.auth.getUser();

      if (user.data.user) {
        console.log('[CDS] User found:', user.data.user.id);
        
        const resp = await supabase.from('leadeboard').insert({
          "score": calculateScore(score, difficulty),
          "user_id": user.data.user?.id,
        }).select();

        if (resp.error) {
          console.error(resp.error);
        } else setScoreSaved(true);
      }
    }
    updateScore();
  }, []);

  return (
    <animated.div
      style={spring}
      className={`bg-[#BE945A] gap-y-16 ${luckiestGuy} z-10 flex text-center flex-col border-2 shadow-xl border-[#997946] rounded-xl absolute w-[40%] p-2 h-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <h1
        className={`text-shadow absolute w-full text-5xl left-1/2 -translate-x-1/2 -top-2`}
      >
        Game Over
      </h1>

      <div className="text-2xl mt-16 flex justify-center items-center">
        Your score: {calculateScore(score, difficulty)}
        {difficulty != 'easy' ? `(${difficulty} multiplier)` : ''}
      </div>

      <div className="text-2xl">
        Total chickens: {allChick}<br />
        You have killed {Math.floor((score / allChick) * 100)}% of chicken
      </div>

      <div>
        {scoreSaved ? (
          <div className="text-2xl text-green-400 flex items-center justify-center gap-x-2">
            <Check strokeWidth={6} />
            Your score has been saved!
          </div>
        ) : (
          <div className="text-2xl text-red-500 flex items-center justify-center gap-x-2">
            <X />
            Score not saved!
          </div>
        )}
      </div>

      <div className="flex justify-center mt-auto mb-4 gap-4">
        <button
          onClick={() => {
            router.push('/');
          }}
          className='border min-w-fit w-[45%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-red-500 to-red-600 rounded-md'
        >
          Exit
        </button>
        <button
          onClick={() => {
            router.push('/leaderboards');
          }}
          className='border min-w-fit w-[45%] hover:scale-105 transition text-2xl p-2 bg-gradient-to-b from-red-500 to-red-600 rounded-md'
        >
          Leaderboard
        </button>
        {/* Fuck it we ball */}
        <form className='min-w-fit justify-center items-center flex w-[45%]' action={'/play'} method='GET'>
          <button
            type='submit'
            className='border hover:scale-105 flex-1 h-full transition text-2xl bg-gradient-to-b from-green-500 to-green-600 rounded-md'
          >
            Retry
          </button>
        </form>
      </div>
    </animated.div>
  );
}
