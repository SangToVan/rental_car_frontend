import clsx from "clsx";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
  showCloseButton = true,
}) {
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg",
          className
        )}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-8 h-8 text-gray-500 rounded-full right-4 top-4 hover:bg-gray-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {title && (
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
