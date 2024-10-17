import { Metadata, Viewport } from 'next';
import Play from './page';

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
  return <Play />;
}
