"use client";

import { type ReactNode, useEffect } from "react";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  side: "left" | "right";
  children: ReactNode;
  title?: string;
}

export function MobileDrawer({ open, onClose, side, children, title }: MobileDrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close panel"
      />
      <div
        className={`absolute top-0 flex h-full w-[min(100%,320px)] flex-col bg-surface-raised shadow-2xl ${
          side === "left" ? "left-0" : "right-0"
        }`}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
            <span className="text-sm font-medium text-content">{title}</span>
            <button
              type="button"
              onClick={onClose}
              className="text-content-muted hover:text-content"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
