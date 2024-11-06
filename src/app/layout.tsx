import type { Metadata } from 'next';
import './globals.css';
import { luckiestGuy } from '@/components/settings-menu';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cock Down Shooter',
  description: 'Play Cock Down Shooter today!',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased overflow-hidden ${luckiestGuy}`}>
        {children}
      </body>
    </html>
  );
}
