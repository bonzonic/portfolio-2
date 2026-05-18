"use client";

import { useState } from "react";
import { Sidebar, HamburgerIcon } from "@/app/components/sidebar";
import { ContactModal } from "@/app/components/contact-modal";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-main">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onContactClick={() => setContactOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Hamburger shown when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-3 left-3 z-10 p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
            aria-label="Open sidebar"
          >
            <HamburgerIcon />
          </button>
        )}

        <main className="flex-1 overflow-auto min-h-0">{children}</main>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
