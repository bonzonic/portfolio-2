"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Achievement } from "@/app/data/achievements";

export interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[85vh] mx-4 overflow-y-auto bg-surface border border-border rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-muted hover:text-primary hover:bg-white/6 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border mb-5">
          {achievement.image ? (
            <Image
              src={achievement.image}
              alt={`${achievement.title} image`}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center text-dim text-[13px] text-center px-4">
              {achievement.subtitle}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <h2
              id="achievement-modal-title"
              className="text-base font-semibold text-primary leading-snug"
            >
              {achievement.title}
            </h2>
            <span className="text-[12px] text-dim shrink-0 mt-0.5">{achievement.date}</span>
          </div>
          <p className="text-sm text-muted mt-1">{achievement.subtitle}</p>
        </div>

        {/* Full description */}
        <p className="text-[14px] text-muted leading-relaxed">{achievement.description}</p>

        {/* Links */}
        {achievement.links && achievement.links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 mt-4 border-t border-border">
            {achievement.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5 pt-1"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 10L10 2M10 2H5M10 2v5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
