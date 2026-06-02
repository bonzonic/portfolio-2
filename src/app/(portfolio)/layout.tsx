"use client";

import { useEffect, useState } from "react";
import { Sidebar, HamburgerIcon } from "@/app/components/sidebar";
import { ContactModal } from "@/app/components/contact-modal";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-main">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onContactClick={() => setContactOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {!sidebarOpen && (
          <div className="flex items-center h-12 px-3 border-b border-border bg-main shrink-0 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <HamburgerIcon />
            </button>
          </div>
        )}
        <main className="flex-1 overflow-auto min-h-0">{children}</main>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
