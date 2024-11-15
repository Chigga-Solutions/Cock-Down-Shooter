'use client';

import { luckiestGuy } from '@/components/settings-menu';
import '@/app/globals.css';
import { Crown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePreventZoom from '@/lib/use-prevent-zoom';

export interface LeaderboardEntry {
  name: string;
  score: number;
}

const EntryWrapped = ({
  lbEntry,
  position,
}: {
  lbEntry: LeaderboardEntry;
  position: number;
}) => {
  const bgStyle =
    position === 0
      ? 'bg-gradient-to-b from-yellow-400 to-yellow-500'
      : position === 1
        ? 'bg-gradient-to-b from-gray-400 to-gray-500'
        : position === 2
          ? 'bg-[#CD7F32]'
          : 'bg-gradient-to-b from-blue-500 to-blue-600';
  const borderStyle =
    position === 0
      ? 'border-yellow-400'
      : position === 1
        ? 'border-gray-400'
        : position === 2
          ? 'border-[#CD7F32]'
          : 'border-blue-500';

  return (
    <tr
      className='hover:scale-105 cursor-pointer ease-in transition-transform'
      key={position}
    >
      <td
        className={`py-2 relative ${bgStyle} ${borderStyle} rounded-l border-y border-l`}
      >
        {position === 0 && (
          <Crown
            size={32}
            className='absolute top-1/2 translate-x-1/2 -translate-y-1/2'
            stroke='#3174F1'
            strokeWidth={3}
          />
        )}
        {position + 1}.
      </td>
      <td className={`border-y text-left ${borderStyle} ${bgStyle}`}>
        {lbEntry.name}
      </td>
      <td className={`border-y ${borderStyle} ${bgStyle} rounded-r border-r`}>
        {lbEntry.score}
      </td>
    </tr>
  );
};

export function LbClient({ entries = [] }: { entries?: LeaderboardEntry[] }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [uniqueOnly, setUniqueOnly] = useState(false);

  const chunked = chunkionize(entries);

  const incrementPage = () => {
    if (currentPage < reorderUnique(chunked, uniqueOnly).length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const decrementPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  usePreventZoom();

  return (
    <main
      className={`h-screen ${luckiestGuy} text-white bg-[url(/title_screen.png)] flex justify-center items-center w-screen`}
    >
      <div className='w-[50vw] min-h-[60vh] max-h-fit gap-y-4 flex flex-col rounded border-[#7F5B3B] border-2 from-[#BF945A] to-[#B48145] bg-gradient-to-b'>
        <h1
          className={`absolute left-1/2 -translate-y-3 text-shadow font-bold text-4xl -translate-x-1/2`}
        >
          Leaderboards
        </h1>
        <button
          onClick={() => router.push('/')}
          title='Back to home'
          className={
            'border-2 w-fit rounded hover:scale-110 hover:-rotate-3 ml-3 mt-3 p-0.5 from-blue-500 to-blue-600 bg-gradient-to-b transition-transform'
          }
        >
          <LogOut size={32} strokeWidth={3} />
        </button>
        <label className='ml-3 flex items-center cursor-pointer w-[20%]'>
          <span className='mr-3'>Show unique only:</span>
          <div className='relative flex items-center'>
            <input
              type='checkbox'
              onChange={(e) => {
                setCurrentPage(0);
                setUniqueOnly(e.currentTarget.checked);
              }}
              className='sr-only peer w-10 h-6 rounded-full'
            />
            <div className='w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400 transition-all'></div>
            <div className='absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 translate-x-1 peer-checked:translate-x-5'></div>
          </div>
        </label>
        <div className='flex-1 justify-center items-center flex'>
          {entries.length > 0 ? (
            <table
              style={{ borderSpacing: '0 10px' }}
              className='w-full border-separate border-spacing-y-2 *:text-center self-start mx-2 max-h-full text-shadow table-auto'
            >
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody className={'gap-y-2'}>
                {reorderUnique(chunked, uniqueOnly)[currentPage].map(
                  (entry, i) => (
                    <EntryWrapped
                      key={i}
                      lbEntry={entry}
                      position={currentPage * 10 + i}
                    />
                  ),
                )}
              </tbody>
            </table>
          ) : (
            <p>No scores found...</p>
          )}
        </div>
        <div className='flex justify-center items-center gap-x-2 mb-2'>
          <button
            disabled={currentPage === 0}
            onClick={() => decrementPage()}
            className={`hover:scale-105 p-2 transition-transform bg-gradient-to-br from-blue-500 border-blue-600 border rounded to-blue-600 ${currentPage === 0 && 'opacity-80'}`}
          >
            Previous
          </button>
          <button
            disabled={
              currentPage >= reorderUnique(chunked, uniqueOnly).length - 1
            }
            onClick={() => incrementPage()}
            className={`hover:scale-105 p-2 transition-transform bg-gradient-to-br from-blue-500 border-blue-600 border rounded to-blue-600 ${currentPage >= reorderUnique(chunked, uniqueOnly).length - 1 && 'opacity-80'}`}
          >
            Next page
          </button>
        </div>
      </div>
    </main>
  );
}

function chunkionize(
  arr: LeaderboardEntry[],
  chunkSize: number = 10,
): LeaderboardEntry[][] {
  const result: LeaderboardEntry[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

function reorderUnique(
  leaderboard: LeaderboardEntry[][],
  unique: boolean = false,
): LeaderboardEntry[][] {
  if (!unique) return leaderboard;

  const seen = new Set();

  const dupRemoved = leaderboard
    .flatMap((entry) => entry)
    .filter((item) => {
      if (!seen.has(item['name'])) {
        seen.add(item['name']);
        return true;
      } else return false;
    });
  return chunkionize(dupRemoved);
}
