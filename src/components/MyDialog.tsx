"use client";

import { type ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ReusableDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  /**
   * Optional class name for the modal overlay.
   * Default styling includes backdrop blur and gradient background
   */
  overlayClassName?: string;
  /**
   * Optional class name for the modal content.
   * Default styling includes glass morphism effect and border gradient
   */
  contentClassName?: string;
  /**
   * Optional title for the dialog
   */
  title?: string;
  /**
   * Whether to show the close button
   * Default: true
   */
  showCloseButton?: boolean;
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  children,
  title,
  overlayClassName,
  contentClassName,
  showCloseButton = true,
}: ReusableDialogProps) {
  // Lock the body scroll when the modal is open.
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  // Ensure we are on the client side.
  if (typeof window === "undefined") return null;

  const rootElement = document.getElementById("rootBody");
  if (!rootElement) {
    throw new Error("Root element with id 'rootBody' not found");
  }

  const hasTitle = title !== undefined && title !== null && title !== "";
  // Show the header if there is a title or if close button is enabled.
  const shouldShowHeader = hasTitle || showCloseButton;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        // Overlay container without scroll classes.
        <motion.div
          className={
            overlayClassName ??
            "fixed inset-0 z-50 bg-gradient-to-br from-white/10 via-gray-200/10 to-white/10 backdrop-blur-md dark:from-gray-950/80 dark:via-gray-900/80 dark:to-gray-950/80"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onOpenChange(false)}
        >
          {/* Wrap only the modal content in a scrollable container */}
          <div className="relative flex max-h-full w-full justify-center overflow-y-scroll px-4 py-16">
            <motion.div
              className="relative z-10 h-fit max-w-3xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.3,
              }}
              // Prevent click events here from closing the dialog.
              onClick={(e) => e.stopPropagation()}
            >
              {/* Updated gradient border with dark mode variant */}
              <div className="inset-0 rounded-[19px] bg-gradient-to-br from-teal-500 via-purple-500 to-amber-500 p-[3px] dark:from-teal-400 dark:via-purple-400 dark:to-amber-400">
                <div
                  className={
                    contentClassName ??
                    "relative h-full rounded-[1rem] bg-white/90 p-6 backdrop-blur-sm dark:bg-gray-950/95"
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header: title and close button */}
                  {shouldShowHeader && (
                    <div className="mb-4 flex items-center justify-between">
                      {title && (
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                          {title}
                        </h2>
                      )}
                      {showCloseButton && (
                        <button
                          onClick={() => onOpenChange(false)}
                          className="group rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:ring-offset-gray-800"
                          aria-label="Close dialog"
                        >
                          <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        </button>
                      )}
                    </div>
                  )}
                  {/* Scrollable dialog content */}
                  <div className="overflow-auto">{children}</div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Decorative elements: placed outside the scrollable container */}
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-900/20 blur-3xl dark:bg-purple-700/20"></div>
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-900/20 blur-3xl dark:bg-teal-700/20"></div>
        </motion.div>
      )}
    </AnimatePresence>,
    rootElement,
  );
}
