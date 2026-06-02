"use client";

export default function ToolsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
      <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-muted">
          <path
            d="M9.5 2a4 4 0 0 1 0 5.5L5 12a1.5 1.5 0 0 1-2-2l4.5-4.5A4 4 0 0 1 9.5 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="text-base font-semibold text-primary">Tools &amp; Skills</h1>
      <p className="text-sm text-dim max-w-xs">Coming soon — full skills breakdown with proficiency levels.</p>
    </div>
  );
}
