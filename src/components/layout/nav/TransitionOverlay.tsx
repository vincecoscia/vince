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
            className="fixed pointer-events-none z-50"
          initial={{ transform: 'scale(0)' }}
          animate={{ transform: 'scale(2)' }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            backgroundColor: transitionTheme === 'dark' ? 'rgb(9, 9, 11)' : 'rgb(255, 255, 255)',
            width: '100vmax',
            height: '100vmax',
            borderRadius: '50%',
            top: '-50vmax',
            right: '-50vmax',
            transformOrigin: 'top right',
            willChange: 'transform, opacity',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;