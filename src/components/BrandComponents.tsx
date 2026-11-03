import React from 'react';
import { motion } from 'motion/react';

const brandSizes = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
} as const;

export function BrandMark({
  size = 'md',
  className = '',
}: {
  size?: keyof typeof brandSizes;
  className?: string;
}) {
  return (
    <span
      className={`font-jp text-binchotan/80 select-none ${brandSizes[size]} ${className}`}
      aria-hidden="true"
    >
      紅豆
    </span>
  );
}

const badgeSizes = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-3 py-1 gap-1.5',
  lg: 'text-sm px-4 py-1.5 gap-2',
} as const;

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
} as const;

const badgeVariants = {
  light: 'bg-white/10 text-sake/70 border-white/10',
  dark: 'bg-sumi/10 text-sumi/70 border-sumi/10',
  accent: 'bg-binchotan/10 text-binchotan border-binchotan/20',
} as const;

export function HalalBadge({
  size = 'md',
  variant = 'accent',
  className = '',
}: {
  size?: keyof typeof badgeSizes;
  variant?: keyof typeof badgeVariants;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center uppercase tracking-widest font-medium rounded-full border ${badgeSizes[size]} ${badgeVariants[variant]} ${className}`}
    >
      <svg
        className={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      100% Halal
    </span>
  );
}

export function HalalBanner({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-2 py-2 bg-binchotan/5 border-y border-binchotan/10 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <svg
        className="w-4 h-4 text-binchotan"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span className="text-xs uppercase tracking-[0.2em] text-binchotan font-medium">
        100% Halal
      </span>
      <svg
        className="w-4 h-4 text-binchotan"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </motion.div>
  );
}
