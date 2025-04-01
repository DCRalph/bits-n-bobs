"use client";

import { type ReactNode, use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  ExternalLink,
  Tag,
  Zap,
  MoveHorizontal,
  Heart,
  Leaf,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import confetti from "canvas-confetti";

// Floating element animation
interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
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

const FloatingSparkle = ({ x, y, size, delay }: FloatingSparkleProps) => {
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

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const decodedId = decodeURIComponent(id);

  const { scrollYProgress } = useScroll();

  // Animation states
  const [headerRotation, setHeaderRotation] = useState(0);

  const scaleAnim = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacityAnim = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const yAnim = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Query for item
  const result = api.items.getItemByTitle.useQuery({ title: decodedId });

  // Trigger rotation animation when data loads
  useEffect(() => {
    if (result.data && !result.isLoading) {
      // Start with 0 rotation
      setHeaderRotation(0);

      // Do a scroll update to ensure animations work
      window.dispatchEvent(new Event("scroll"));

      // use a timer to rotate the header with a spring-like ease
    }
  }, [result.data, result.isLoading]);

  // Trigger confetti effect
  const triggerConfetti = () => {
    if (typeof confetti === "function") {
      // Cast to unknown first, then to a function type to avoid unsafe any
      (
        confetti as unknown as (options: {
          particleCount: number;
          spread: number;
          origin: { y: number };
        }) => void
      )({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Generate random positions for sparkles
  const sparkles = Array.from({ length: 10 }, (_) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: `${Math.random() * 20 + 10}px`,
    delay: Math.random() * 2,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 dark:text-gray-100">
      {/* Decorative sparkles */}
      {sparkles.map((sparkle, i) => (
        <FloatingSparkle key={i} {...sparkle} />
      ))}

      {/* Back button */}
      <Link href="/">
        <motion.div
          className="fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </motion.div>
      </Link>

      {result.isLoading ? (
        // Simple fade-in loading indicator instead of spinning animation
        <div className="flex h-screen items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative h-16 w-16"
            >
              <motion.div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-purple-500 dark:border-gray-700 dark:border-t-purple-400" />
              <motion.div
                className="absolute inset-2 rounded-full border-4 border-gray-200 border-b-teal-500 dark:border-gray-700 dark:border-b-teal-400"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <div className="h-2 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 via-purple-500 to-amber-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading item...
            </p>
          </motion.div>
        </div>
      ) : !result.data ? (
        // Item not found animation
        <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{ duration: 0.7 }}
            className="mb-8 text-9xl"
          >
            😵
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4 text-4xl font-bold"
          >
            Item Not Found
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 text-xl text-gray-600 dark:text-gray-400"
          >
            We couldn&apos;t find the item you&apos;re looking for.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </motion.div>
        </div>
      ) : (
        // Item view with animations
        <div className="container mx-auto max-w-5xl px-4 py-24">
          {/* Header section with rotation */}
          <motion.div
            className="relative mb-12 overflow-hidden rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-800"
            style={{
              scale: scaleAnim,
              opacity: opacityAnim,
              y: yAnim,
              rotate: headerRotation,
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute -right-4 -top-4 rounded-full bg-purple-500/30 p-8 text-4xl blur-xl"
              animate={{ scale: [1, 3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "anticipate" }}
            />

            <div className="relative z-10">
              <motion.div
                className="mb-4 flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-amber-300 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                >
                  <Calendar className="h-3 w-3" />
                  {result.data?.dateAdded instanceof Date
                    ? result.data.dateAdded.toLocaleDateString()
                    : new Date(result.data.dateAdded).toLocaleDateString()}
                </Badge>

                <Badge
                  variant="outline"
                  className="flex items-center gap-1 border-purple-300 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  <Tag className="h-3 w-3" />
                  {result.data?.category}
                </Badge>
              </motion.div>

              <motion.h1
                className="relative mb-4 text-4xl font-black md:text-6xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y: { delay: 0.3, duration: 0.6 },
                  opacity: { delay: 0.3, duration: 0.6 },
                }}
              >
                <span className="bg-gradient-to-r from-teal-400 via-purple-500 to-amber-500 bg-clip-text text-transparent">
                  {result.data?.title}
                </span>
                <motion.div
                  className="absolute -right-8 -top-6 text-amber-400"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* <Sparkles className="h-8 w-8" /> */}
                </motion.div>
              </motion.h1>

              <motion.p
                className="mb-6 text-xl text-gray-600 dark:text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {result.data?.caption}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  asChild
                  className="group"
                  onClick={() => triggerConfetti()}
                >
                  <a
                    href={result.data?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Visit Project</span>
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive 3D card effect for image */}
          {result.data?.image && (
            <motion.div
              className="mb-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={result.data?.image ?? "/placeholder.svg"}
                  alt={result.data?.title ?? ""}
                  fill
                  className="object-cover transition-transform"
                />
                <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% to-black/80" />

                <motion.div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">
                    {result.data?.title}
                  </h3>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Description with animated content */}
          {result.data?.description && (
            <div className="relative">
              <FloatingElement delay={1}>
                <motion.div
                  className="absolute -right-20 top-10 text-purple-400 opacity-50"
                  initial={{ opacity: 0, rotate: -15 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.8 }}
                >
                  <Zap className="h-16 w-16" />
                </motion.div>
              </FloatingElement>

              <FloatingElement delay={2}>
                <motion.div
                  className="absolute -left-16 top-40 text-teal-400 opacity-50"
                  initial={{ opacity: 0, rotate: 15 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1 }}
                >
                  <MoveHorizontal className="h-12 w-12" />
                </motion.div>
              </FloatingElement>

              <motion.div
                className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-headings:relative prose-h2:flex prose-h2:items-center prose-h2:gap-2 prose-h2:text-purple-800 dark:prose-h2:text-purple-300"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <ReactMarkdown
                  components={{
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h1: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.h1
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        {...props}
                      />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h2: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.h2
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-purple-800 dark:text-purple-300"
                        {...props}
                      >
                        {props.children}
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block text-amber-400"
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.span>
                      </motion.h2>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    p: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        {...props}
                      />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ul: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.ul
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        {...props}
                      />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    li: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.li
                        initial={{ x: 10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-2"
                        {...props}
                      >
                        <span className="mt-1.5 text-purple-500 dark:text-purple-400">
                          <Leaf className="h-4 w-4" />
                        </span>
                        <span>{props.children}</span>
                      </motion.li>
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    strong: ({ node, ...props }) => (
                      // @ts-expect-error - this works and is fine
                      <motion.strong
                        initial={{ x: 10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-purple-500 dark:text-purple-400"
                        {...props}
                      />
                    ),
                  }}
                >
                  {result.data?.description}
                </ReactMarkdown>

                {/* Add some animated decorative elements to the prose */}
                <motion.div
                  className="absolute -right-4 top-4 text-amber-400"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                <motion.div
                  className="absolute -left-8 top-1/3 text-purple-400"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-8 w-8" />
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Footer navigation and reactions */}
          <motion.div
            className="mt-20 flex items-center justify-between"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button variant="outline" asChild className="group">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to all items
              </Link>
            </Button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Button
                variant="ghost"
                className="group flex items-center gap-2"
                onClick={triggerConfetti}
              >
                Love this?
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-red-500"
                >
                  <Heart className="h-5 w-5 fill-current transition-transform group-hover:scale-110" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
