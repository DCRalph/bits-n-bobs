"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  icon: string;
  show: boolean;
}

export function Toast({ message, icon, show }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={`fixed bottom-6 right-6 bg-gray-800 border border-gray-700 text-white px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-2 z-50 ${
        visible && show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
