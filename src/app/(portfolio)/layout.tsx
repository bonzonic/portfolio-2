"use client";

import { useState } from "react";
import { Sidebar, HamburgerIcon } from "@/app/components/sidebar";
import { ContactModal } from "@/app/components/contact-modal";
import { useShimmerGrid } from "@/app/utils/use-shimmer-grid";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { ref, onMouseMove } = useShimmerGrid<HTMLElement>();

  return (
    <div className="h-dvh overflow-hidden bg-main">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onContactClick={() => setContactOpen(true)}
      />

      <div className="flex flex-col h-full">
        <div className="flex items-center h-12 px-3 border-b border-border bg-main shrink-0">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
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
