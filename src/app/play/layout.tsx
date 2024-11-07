import { Metadata, Viewport } from 'next';
import Play from './page';
import { Suspense } from 'react';
import { luckiestGuy } from '@/components/settings-menu';

export const metadata: Metadata = {
  title: 'Cock Down Shooter 🐓',
  description: 'Play Cock Down Shooter today!',
};

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default function PlayLayout() {
  return (
    <Suspense fallback={
      <main className={`w-screen ${luckiestGuy} h-screen flex justify-center bg-indigo-600 items-center`}>
        <h1 className='font-bold text-6xl'>Loading...</h1>
      </main>
    }>
      <Play />
    </Suspense>
  );
}