import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const AppDialog = ({ open, onClose, title, description, children }) => {
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
        className="absolute inset-0 bg-[#04413b]/45 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[26px] border border-[#102a24]/10 bg-[#fffdfa] text-[#102a24] shadow-[0_32px_90px_rgba(4,42,34,.28)] sm:max-h-[90vh] sm:rounded-[26px]">
        <div className="flex shrink-0 items-start justify-between gap-6 border-b border-[#102a24]/10 px-5 py-5 sm:px-7">
          <div>
            <h2 id="dialog-title" className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm leading-6 text-[#52665f]">{description}</p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#52665f] transition hover:bg-[#f2e9e2] hover:text-[#102a24]"
            aria-label={`Close ${title}`}
          >
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
};

export default AppDialog;
