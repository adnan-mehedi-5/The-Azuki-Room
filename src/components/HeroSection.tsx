import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { BrandMark } from './BrandComponents';
import { CLOSURE } from '../utils/siteConfig';

function FloatingEmbers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 20 }, (_, idx) => ({
        id: idx,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: '-10px',
            width: e.size,
            height: e.size,
            backgroundColor: '#D4A574',
          }}
          animate={{
            y: [0, -800 - Math.random() * 400],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, e.opacity, e.opacity, 0],
            scale: [0.5, 1, 0.8, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

const PETAL_COLORS = ['#F9B7C4', '#F4A0B0', '#FFCDD6', '#E8899A', '#FBD0D9', '#F2C0CB'];

function SakuraPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 35 }, (_, idx) => ({
        id: idx,
        startX: Math.random() * 120 - 10,
        size: Math.random() * 18 + 10,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.3,
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 180 + 60,
        flipSpeed: Math.random() * 3 + 2,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((e) => (
        <motion.div
          key={e.id}
          className="absolute"
          style={{
            left: `${e.startX}%`,
            top: '-40px',
            width: e.size,
            height: e.size,
          }}
          animate={{
            y: [0, 1200],
            x: [
              0,
              0.4 * e.swayAmount,
              -(0.6 * e.swayAmount),
              0.8 * e.swayAmount,
              -(0.3 * e.swayAmount),
              0.2 * e.swayAmount,
            ],
            rotate: [e.rotation, e.rotation + 540],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: e.duration,
              delay: e.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <motion.div
            animate={{
              rotateY: [0, 180, 360],
              rotateX: [0, 50, 0, -50, 0],
            }}
            transition={{
              duration: e.flipSpeed,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg viewBox="0 0 30 30" width={e.size} height={e.size} style={{ opacity: e.opacity }}>
              <g transform="translate(15,15)">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="0"
                    cy="-7"
                    rx="3.5"
                    ry="7"
                    fill={e.color}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill="#F5E0C3" opacity="0.9" />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-sumi pt-20 pb-12">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/azuki-hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/azuki-hero-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
        <source src="/videos/azuki-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-sumi/80 via-sumi/60 to-sumi" />
      <div className="absolute inset-0 bg-gradient-to-r from-binchotan/5 via-transparent to-binchotan/5" />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(212, 165, 116, 0.12) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 'min(500px, 80vw)',
          height: 'min(500px, 80vw)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#D4A574"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="520"
            strokeDashoffset="40"
            opacity="1"
          />
        </svg>
      </motion.div>

      <FloatingEmbers />
      <SakuraPetals />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <BrandMark size="lg" className="mb-6 block" />
        </motion.div>

        <h1>
          <motion.span
            className="block font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl text-sake tracking-wide mb-4 leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            AZUKI ROOM
          </motion.span>
          <span className="sr-only">, </span>
          <motion.span
            className="block text-binchotan text-sm sm:text-base md:text-xl tracking-[0.18em] sm:tracking-[0.2em] uppercase mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            A hidden Japanese dining room in the heart of Chancery Lane
          </motion.span>
        </h1>

        <motion.p
          className="text-sake/50 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          Yakitori · Robatayaki · Sushi
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {CLOSURE.active ? (
            <p className="mx-auto max-w-md rounded-lg border border-binchotan/30 bg-sumi/50 px-6 py-4 text-center font-serif text-lg leading-snug text-sake backdrop-blur-sm">
              {CLOSURE.headline}
            </p>
          ) : (
            <a
              href="/reservations"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/reservations');
              }}
              data-track="cta_reserve_hero"
              className="inline-flex items-center px-8 py-3.5 bg-binchotan text-sumi font-medium rounded-lg hover:bg-binchotan/90 transition-all duration-200 text-lg hover:shadow-[0_0_30px_rgba(212,165,116,0.3)]"
            >
              Reserve a Table
            </a>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-6 h-6 text-sake" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[5]">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto block"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 80C120 80 120 40 240 40C360 40 360 80 480 80C600 80 600 40 720 40C840 40 840 80 960 80C1080 80 1080 40 1200 40C1320 40 1320 80 1440 80V120H0V80Z"
            fill="#1A1A1A"
            opacity="0.3"
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <motion.path
            d="M0 90C100 90 100 55 200 55C300 55 300 90 400 90C500 90 500 55 600 55C700 55 700 90 800 90C900 90 900 55 1000 55C1100 55 1100 90 1200 90C1300 90 1300 55 1440 55V120H0V90Z"
            fill="#1A1A1A"
            opacity="0.6"
            initial={{ x: 100 }}
            animate={{ x: -100 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <path
            d="M0 100C80 100 80 70 160 70C240 70 240 100 320 100C400 100 400 70 480 70C560 70 560 100 640 100C720 100 720 70 800 70C880 70 880 100 960 100C1040 100 1040 70 1120 70C1200 70 1200 100 1280 100C1360 100 1360 70 1440 70V120H0V100Z"
            fill="#1A1A1A"
          />
        </svg>
      </div>
    </section>
  );
}
