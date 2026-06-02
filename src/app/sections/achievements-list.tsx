"use client";

import { achievements } from "@/app/data/achievements";

export function AchievementsList() {
  return (
    <div className="px-8 py-8 max-w-180 mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primary tracking-tight">Achievements</h1>
        <p className="text-sm text-muted mt-1">Publications, awards, and leadership</p>
      </div>

      <div className="flex flex-col gap-4">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[14px] font-semibold text-primary leading-snug">{item.title}</h2>
                <p className="text-[12px] text-muted mt-0.5">{item.subtitle}</p>
              </div>
              <span className="text-[11px] text-dim shrink-0 mt-0.5">{item.date}</span>
            </div>

            <p className="text-[13px] text-muted leading-relaxed">{item.description}</p>

            {item.link && (
              <div className="pt-1 border-t border-border">
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5"
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
                  {item.link.label}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
