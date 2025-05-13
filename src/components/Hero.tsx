'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 5200); // allow full fade-out of NovaThink
    return () => clearTimeout(introTimer);
  }, []);

  return (
    <section className="relative w-full h-screen md:h-screen overflow-hidden bg-black text-white pb-2">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-30">
        <img src="/novathink-logo-w.png" alt="NovaThink Logo" className="h-14 md:h-20 w-auto" />
      </div>

      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-[1] object-center"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-10" />

      {/* Intro NovaThink Title */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="relative text-5xl md:text-7xl font-bold font-headline text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.8, times: [0, 0.5, 0.5, 1] }}
        >
          NovaThink
          <span
            className="absolute text-xs"
            style={{
              top: '-0.3em',
              right: '-0.8em',
            }}
          >
            ™
          </span>
        </motion.h1>
      </motion.div>

      {/* Headline + Subheadline */}
      <div className="relative z-20 px-4 w-full h-full flex flex-col items-center justify-center text-center pt-24 sm:pt-0">
        <motion.h1
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.2, duration: 0.8, ease: 'easeOut' }}
        >
          Strategic AI Infrastructure for
          <br />
          Real-Time Intelligence and
          <br />
          Enterprise Execution
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 6.2, duration: 0.8, ease: 'easeOut' }}
        >
          Engineering the cognitive architecture that powers the future of real-time intelligence,
          strategic execution, and enterprise-scale decision systems.
        </motion.p>
      </div>
    </section>
  );
}
