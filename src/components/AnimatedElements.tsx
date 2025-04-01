"use client";

import { type ReactNode } from "react";
import {
  type AnimationControls,
  motion,
  type TargetAndTransition,
  type VariantLabels,
} from "motion/react";
import { Sparkles, Zap, MoveHorizontal, Leaf, Heart } from "lucide-react";

// Floating element animation
interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
}

export const FloatingElement = ({
  children,
  delay = 0,
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -50, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Decorative floating sparkle
interface FloatingSparkleProps {
  x: number;
  y: number;
  size: string;
  delay: number;
}

export const FloatingSparkle = ({
  x,
  y,
  size,
  delay,
}: FloatingSparkleProps) => {
  return (
    <motion.div
      suppressHydrationWarning
      className="absolute text-amber-400"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
      }}
    >
      <Sparkles />
    </motion.div>
  );
};

// Animated icon with customizable properties
interface AnimatedIconProps {
  icon: ReactNode;
  x?: string;
  y?: string;
  color?: string;
  size?: string;
  rotate?: boolean;
  pulse?: boolean;
  float?: boolean;
}

export const AnimatedIcon = ({
  icon,
  x = "0",
  y = "0",
  color = "text-purple-400",
  size = "h-8 w-8",
  rotate = false,
  pulse = false,
  float = true,
}: AnimatedIconProps) => {
  const animations:
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined = {};

  if (rotate) {
    animations.rotate = 360;
  }

  if (pulse) {
    animations.scale = [1, 1.2, 1];
  }

  if (float) {
    animations.y = [0, -10, 0];
  }

  return (
    <motion.div
      className={`absolute ${color} opacity-50`}
      style={{ left: x, top: y }}
      animate={animations}
      transition={{
        duration: rotate ? 20 : 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className={size}>{icon}</div>
    </motion.div>
  );
};

// Set of decorative sparkles
export const SparkleSet = () => {
  // Generate random positions for sparkles
  const sparkles = Array.from({ length: 10 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: `${Math.random() * 20 + 10}px`,
    delay: Math.random() * 2,
  }));

  return (
    <>
      {sparkles.map((sparkle, i) => (
        <FloatingSparkle key={i} {...sparkle} />
      ))}
    </>
  );
};

// Decorative icons set for layout
export const DecorativeIcons = () => {
  return (
    <>
      <AnimatedIcon
        icon={<Sparkles />}
        x="85%"
        y="10%"
        color="text-amber-400"
        rotate={true}
      />
      <AnimatedIcon
        icon={<Zap />}
        x="10%"
        y="30%"
        color="text-purple-400"
        size="h-12 w-12"
      />
      <AnimatedIcon
        icon={<MoveHorizontal />}
        x="80%"
        y="50%"
        color="text-teal-400"
        size="h-10 w-10"
      />
      <AnimatedIcon
        icon={<Leaf />}
        x="15%"
        y="70%"
        color="text-green-400"
        pulse={true}
      />
      <AnimatedIcon
        icon={<Heart />}
        x="75%"
        y="85%"
        color="text-red-400"
        pulse={true}
      />
    </>
  );
};
