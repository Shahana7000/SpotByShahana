import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../../utils/variants';

export const AnimatedPage = ({ children, className }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};
