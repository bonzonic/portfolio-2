"use client";

import { useState } from "react";
import { Sidebar, HamburgerIcon } from "@/app/components/sidebar";
import { ContactModal } from "@/app/components/contact-modal";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-main">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onContactClick={() => setContactOpen(true)}
      />

      <div className="flex flex-col h-full">
        <div className="flex items-center h-12 px-3 border-b border-border bg-main shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <HamburgerIcon />
          </button>
        </div>
        <main className="flex-1 overflow-auto min-h-0">{children}</main>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
