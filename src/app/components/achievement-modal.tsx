"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Achievement } from "@/app/data/achievements";

export interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const galleryImages = achievement.images ?? (achievement.image ? [achievement.image] : []);

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
      <div className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[85vh] mx-4 overflow-y-auto bg-surface border border-border rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-md bg-surface/80 backdrop-blur-sm text-muted hover:text-primary transition-colors cursor-pointer"
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
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-border mb-2">
          {galleryImages.length > 0 ? (
            <Image
              src={galleryImages[activeImage]}
              alt={`${achievement.title} image`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 576px, 672px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center text-dim text-[13px] text-center px-4">
              {achievement.subtitle}
            </div>
          )}
        </div>

        {/* Gallery thumbnails */}
        {galleryImages.length > 1 && (
          <div className="flex gap-2 mb-5">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === activeImage}
                className={`relative w-14 h-14 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                  i === activeImage ? "border-accent" : "border-border hover:border-white/30"
                }`}
              >
                <Image src={src} alt="" fill sizes="56px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        {galleryImages.length <= 1 && <div className="mb-5" />}

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
        <p className="text-[14px] text-muted leading-relaxed whitespace-pre-line">
          {achievement.description}
        </p>

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
