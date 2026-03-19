import React from 'react';
import { cn } from '../../utils/cn';

export const GlassCard = React.forwardRef(({ className, children, hoverEffect = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'glass-panel',
        hoverEffect && 'cursor-pointer hover:bg-secondary transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';
