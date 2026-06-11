export default function WorkExperiencePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
      <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-muted"
        >
          <rect
            x="1.5"
            y="5"
            width="13"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path d="M1.5 9h13" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
      <h1 className="text-base font-semibold text-primary">Work Experience</h1>
      <p className="text-sm text-dim max-w-xs">
        Coming soon — full timeline of roles and responsibilities.
      </p>
    </div>
  );
}
