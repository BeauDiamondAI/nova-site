import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'NovaThink',
  description: 'Secure AI Infrastructure Engineered for the Future',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
