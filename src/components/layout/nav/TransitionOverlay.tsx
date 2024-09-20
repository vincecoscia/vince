import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionOverlay = ({ isTransitioning, transitionTheme }: {
  isTransitioning: boolean;
  transitionTheme: 'dark' | 'light';
}) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ clipPath: 'circle(0% at top right)' }}
          animate={{ clipPath: 'circle(150% at top right)' }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            backgroundColor: transitionTheme === 'dark' ? 'rgb(9, 9, 11)' : 'rgb(255, 255, 255)',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;