import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const GlassButton = React.forwardRef(({ className, children, variant = 'primary', size = 'md', ...props }, ref) => {
  
  const variants = {
    primary: 'bg-primary/80 hover:bg-primary text-primary-foreground border-transparent shadow-[0_0_15px_rgba(21,115,149,0.4)]',
    secondary: 'bg-secondary hover:bg-white/10 text-foreground border-border backdrop-blur-md',
    ghost: 'bg-transparent hover:bg-white/5 text-foreground border-transparent',
    icon: 'bg-transparent hover:bg-white/10 text-foreground border-transparent rounded-full p-2 flex items-center justify-center'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'w-10 h-10 p-0',
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'inline-flex items-center justify-center rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none border',
        variants[variant],
        variant !== 'icon' && sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

GlassButton.displayName = 'GlassButton';
