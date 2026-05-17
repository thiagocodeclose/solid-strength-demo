// @ts-nocheck
import type { Metadata } from 'next';
import { Barlow_Condensed, Barlow } from 'next/font/google';
import './globals.css';
import { getGarrison365Config, buildCssVars } from '@/lib/garrison365-config';

import { Garrison365LivePreview } from '@/components/Garrison365LivePreview';
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: 'SOLID — Precision Reformer Strength | San Francisco',
  description: 'Spring-loaded reformer Pilates built for strength. 45-minute classes designed to change your body.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`} style={vars as React.CSSProperties}>
      <body>{children}<Garrison365LivePreview /></body>
    </html>
  );
}
