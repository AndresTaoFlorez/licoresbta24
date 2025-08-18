import { motion, AnimatePresence } from "motion/react";

export default function AnimatedWrapper({ isUnlocked, children }) {
  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          className="absolute inset-0 z-50"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
