"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/sidebar";
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
        <main className="flex-1 overflow-auto min-h-0">{children}</main>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
