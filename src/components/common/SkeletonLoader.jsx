import React from 'react';
import { cn } from '../../utils/cn';

export const SkeletonLoader = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-white/5 border border-white/5 backdrop-blur-md',
        className
      )}
      {...props}
    />
  );
};
