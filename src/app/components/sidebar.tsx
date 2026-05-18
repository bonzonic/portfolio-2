"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onContactClick: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  section: string;
}

type NavEntry = NavItem | NavSection;

function isSection(entry: NavEntry): entry is NavSection {
  return "section" in entry;
}

function NewChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChatsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v7a1.5 1.5 0 0 1-1.5 1.5H9l-3 2v-2H3.5A1.5 1.5 0 0 1 2 10.5v-7z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M1.5 9h13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function AchievementsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M9.5 2a4 4 0 0 1 0 5.5L5 12a1.5 1.5 0 0 1-2-2l4.5-4.5A4 4 0 0 1 9.5 2z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ComposeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 14l3.5-1.5 8-8a1.5 1.5 0 0 0-2-2l-8 8L2 14z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navEntries: NavEntry[] = [
  { label: "New Chat", href: "/", icon: <NewChatIcon /> },
  { label: "Chats", href: "/chats", icon: <ChatsIcon /> },
  { label: "Projects", href: "/projects", icon: <ProjectsIcon /> },
  { section: "Background" },
  { label: "Work Experience", href: "/work-experience", icon: <WorkIcon /> },
  { label: "Achievements", href: "/achievements", icon: <AchievementsIcon /> },
  { label: "Tools", href: "/tools", icon: <ToolsIcon /> },
];

export function Sidebar({ isOpen, onToggle, onContactClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out ${
        isOpen ? "w-65" : "w-0"
      }`}
    >
      <aside
        inert={!isOpen || undefined}
        className="flex flex-col w-65 h-screen bg-sidebar border-r border-border"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="text-accent">
              <path
                d="M9 2v14M2 9h14M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-semibold text-primary tracking-tight">Nicholas</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
              aria-label="New chat"
            >
              <ComposeIcon />
            </Link>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
              aria-label="Close sidebar"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto">
          {navEntries.map((entry, i) => {
            if (isSection(entry)) {
              return (
                <div
                  key={entry.section}
                  className="px-2 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-dim"
                >
                  {entry.section}
                </div>
              );
            }
            const isActive = entry.href === "/" ? pathname === "/" : pathname.startsWith(entry.href);
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className={`flex items-center gap-2.5 px-2.5 py-1.75 rounded-lg text-[13.5px] transition-colors ${
                  isActive
                    ? "bg-white/9 text-primary"
                    : "text-muted hover:bg-white/6 hover:text-primary"
                }`}
              >
                <span className={isActive ? "text-primary" : "text-muted"}>{entry.icon}</span>
                {entry.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Contact */}
        <div className="px-2 py-2 border-t border-border shrink-0">
          <button
            onClick={onContactClick}
            className="flex items-center gap-2.5 w-full px-2.5 py-1.75 rounded-lg text-[13.5px] text-muted hover:bg-white/6 hover:text-primary transition-colors"
          >
            <ContactIcon />
            Contact
          </button>
        </div>
      </aside>
    </div>
  );
}
