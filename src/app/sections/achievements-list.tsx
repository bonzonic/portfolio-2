import Image from "next/image";
import {
  achievements,
  type Achievement,
  type AchievementCategory,
} from "@/app/data/achievements";

const SECTIONS: { category: AchievementCategory; heading: string }[] = [
  { category: "achievement", heading: "Achievements" },
  { category: "leadership", heading: "Leadership" },
];

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 flex gap-4 hover:border-white/20 transition-colors">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-lg border border-border">
        {item.image ? (
          <Image
            src={item.image}
            alt={`${item.title} thumbnail`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center text-dim text-[11px] text-center px-2">
            {item.subtitle}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[14px] font-semibold text-primary leading-snug">{item.title}</h2>
            <span className="text-[11px] text-dim shrink-0 mt-0.5">{item.date}</span>
          </div>
          <p className="text-[12px] text-muted mt-0.5">{item.subtitle}</p>
        </div>

        <p className="text-[13px] text-muted leading-relaxed line-clamp-3">{item.description}</p>

        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 mt-auto border-t border-border">
            {item.links.map((link) => (
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

export function AchievementsList() {
  return (
    <div className="px-8 py-8 max-w-180 mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primary tracking-tight">Achievements</h1>
        <p className="text-sm text-muted mt-1">Publications, awards, and leadership</p>
      </div>

      <div className="flex flex-col gap-8">
        {SECTIONS.map(({ category, heading }) => {
          const items = achievements.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <section key={category}>
              <h2 className="text-[13px] font-semibold text-dim uppercase tracking-wide mb-3">
                {heading}
              </h2>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <AchievementCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
