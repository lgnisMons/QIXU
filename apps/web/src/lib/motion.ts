"use client";

import type { Variants, Transition } from "framer-motion";

/**
 * Standard easings for QIXU design system
 * All animations use ease-out as per design spec
 */
export const easings = {
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springGentle: { type: "spring" as const, stiffness: 200, damping: 25 },
};

/**
 * Standard durations (in seconds)
 */
export const durations = {
  fast: 0.15,
  base: 0.2,
  normal: 0.3,
  slow: 0.5,
};

/**
 * Page transition: fade + slide up (300ms)
 */
export const pageTransition: Transition = {
  duration: durations.normal,
  ease: easings.easeOut,
};

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: durations.base, ease: easings.easeOut },
  },
};

/**
 * Hover effect: scale 1.02
 */
export const hoverScale = {
  scale: 1.02,
} as const;

export const hoverTapScale = {
  whileHover: hoverScale,
  whileTap: { scale: 0.98 },
} as const;

/**
 * Card hover: translateY(-8px)
 */
export const cardHover = {
  y: -8,
} as const;

export const cardHoverTransition: Transition = {
  duration: durations.base,
  ease: easings.easeOut,
};

export const cardMotionProps = {
  whileHover: { y: -8 },
  transition: cardHoverTransition,
} as const;

/**
 * Stagger container for children animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Fade in up for child items
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
};

/**
 * Fade in simple
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
};

/**
 * Get a standard transition
 */
export function getTransition(
  duration: keyof typeof durations = "normal",
  easing: keyof typeof easings = "easeOut"
): Transition {
  return {
    duration: durations[duration],
    ease: easings[easing],
  };
}
