export const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { opacity: 0, y: -16,
    transition: { duration: 0.2 }
  }
}

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
  }
}

export const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

export const slideUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } }
}

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 300 }
  }
}

export const modeToggleVariants = {
  music: { x: 0 },
  video: { x: '100%' }
}
