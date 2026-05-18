"use client";

import { contact } from "@/app/data/contact";

export interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Nicholas"
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-sm mx-4 bg-surface border border-border rounded-2xl p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-muted hover:text-primary hover:bg-white/6 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-primary">{contact.name}</h2>
          <p className="text-sm text-muted mt-1">{contact.tagline}</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 text-sm text-muted hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {contact.email}
          </a>

          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-3 text-sm text-muted hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 2.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a6 6 0 0 0 6 6v-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1A11 11 0 0 1 3 3.5v-1z"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
            {contact.phone}
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-muted hover:text-primary transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M4 6.5v5M4 4.5v.5M7 11.5V9a1.5 1.5 0 0 1 3 0v2.5M7 6.5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
