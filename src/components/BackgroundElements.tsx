import { motion } from "motion/react";
import { SparkleSet, DecorativeIcons } from "./AnimatedElements";

export const BackgroundElements = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl transition-colors duration-500 dark:bg-purple-900/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl transition-colors duration-500 dark:bg-teal-900/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl transition-colors duration-500 dark:bg-amber-900/20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-indigo-300/40 blur-3xl transition-colors duration-500 dark:bg-indigo-900/20"
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <SparkleSet />
      <DecorativeIcons />
    </div>
  );
};
