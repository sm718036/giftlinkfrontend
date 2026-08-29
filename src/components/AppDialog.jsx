import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const AppDialog = ({ open, onClose, title, children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      const previouslyFocusedElement = document.activeElement;
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
        previouslyFocusedElement?.focus?.();
      };
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="absolute inset-0 bg-[#032d20]/75 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] border border-white/20 bg-[#fffaf0] text-[#10261d] shadow-[0_28px_90px_rgba(0,0,0,.3)] sm:max-h-[90vh] sm:rounded-[28px]">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#063f2c] px-5 py-4 text-[#fffaf0] sm:px-7 sm:py-5">
          <h2 id="dialog-title" className="mt-1 font-serif text-2xl text-[#dce92b]">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-[#dce92b] hover:bg-[#dce92b] hover:text-[#063f2c]"
            aria-label={`Close ${title}`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
};

export default AppDialog;
