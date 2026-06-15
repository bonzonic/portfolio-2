"use client";

import { useState } from "react";
import { Sidebar, HamburgerIcon } from "@/app/components/sidebar";
import { ContactModal } from "@/app/components/contact-modal";
import { useShimmerGrid } from "@/app/utils/use-shimmer-grid";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const { ref, onMouseMove } = useShimmerGrid<HTMLElement>();

  return (
    <div className="h-dvh overflow-hidden bg-main flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileOpen}
        desktopExpanded={desktopExpanded}
        onToggle={() => {
          setMobileOpen(false);
          setDesktopExpanded((prev) => !prev);
        }}
        onContactClick={() => setContactOpen(true)}
      />

      <div className="flex flex-col h-full flex-1 min-w-0">
        <div className="flex items-center h-12 px-3 border-b border-border bg-main shrink-0 md:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon />
          </button>
        </div>
        <main
          ref={ref}
          onMouseMove={onMouseMove}
          className="group/shimmer relative isolate flex-1 min-h-0"
        >
          <div
            aria-hidden="true"
            className="shimmer-grid pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/shimmer:opacity-100"
          />
          <div className="h-full overflow-auto">{children}</div>
        </main>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
