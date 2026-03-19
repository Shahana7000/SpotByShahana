import React from 'react';
import { cn } from '../../utils/cn';

export const GlassInput = React.forwardRef(({ className, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Icon size={18} />
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          'flex w-full rounded-[12px] border border-border bg-white/5 px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-xl transition-all',
          Icon && 'pl-10',
          className
        )}
        {...props}
      />
    </div>
  );
});

GlassInput.displayName = 'GlassInput';
