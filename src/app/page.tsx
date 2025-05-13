// src/app/page.tsx
'use client'

import Hero from '@/components/Hero'
import SectionAbout from '@/components/SectionAbout';
import SectionCorePillars from '@/components/SectionCorePillars';
import SectionNovaThinkLabs from '@/components/SectionNovaThinkLabs';
import SectionWhoWeServe from '@/components/SectionWhoWeServe';
import SectionWhatsNext from '@/components/SectionWhatsNext';
import SectionInMotion from '@/components/SectionInMotion';
import FooterMinimal from '@/components/FooterMinimal';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white">
      <Hero />
      <SectionAbout />
      <SectionCorePillars />
      <SectionNovaThinkLabs />
      <SectionWhoWeServe />
      <SectionWhatsNext />
      <SectionInMotion />
      <FooterMinimal />
    </main>
  )
}
