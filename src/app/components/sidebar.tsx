"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { curatedChats } from "@/app/data/chats";

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

function NewChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect
        x="8.5"
        y="8.5"
        width="5.5"
        height="5.5"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
      />
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

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 4h12M2 8h12M2 12h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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

const topNavItems: NavItem[] = [{ label: "New Chat", href: "/", icon: <NewChatIcon /> }];

const mainNavItems: NavItem[] = [{ label: "Projects", href: "/projects", icon: <ProjectsIcon /> }];

const backgroundNavItems: NavItem[] = [
  { label: "Work Experience", href: "/work-experience", icon: <WorkIcon /> },
  { label: "Achievements", href: "/achievements", icon: <AchievementsIcon /> },
  { label: "Tools", href: "/tools", icon: <ToolsIcon /> },
];

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 px-2.5 py-1.75 rounded-lg text-[13.5px] transition-colors ${
        isActive ? "bg-white/9 text-primary" : "text-muted hover:bg-white/6 hover:text-primary"
      }`}
    >
      <span className={isActive ? "text-primary" : "text-muted"}>{item.icon}</span>
      {item.label}
    </Link>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="px-2 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-dim">
      {label}
    </div>
  );
}

function CollapsedNavIcon({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
        isActive ? "bg-white/9 text-primary" : "text-muted hover:bg-white/6 hover:text-primary"
      }`}
    >
      <span className={isActive ? "text-primary" : "text-muted group-hover:text-primary"}>
        {item.icon}
      </span>
      <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-surface px-2 py-1 text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
        {item.label}
      </span>
    </Link>
  );
}

export function Sidebar({ isOpen, onToggle, onContactClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out ${
        isOpen ? "w-65" : "w-[52px]"
      }`}
    >
      {isOpen ? (
        <aside className="flex flex-col w-65 h-screen bg-sidebar border-r border-border">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary tracking-tight">Nicholas Wong</span>
            </div>
            <div className="flex items-center gap-1">
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
            {topNavItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}

            <SectionLabel label="Recents" />
            {curatedChats.map((chat) => {
              const isActive = pathname === `/chats/${chat.id}`;
              return (
                <Link
                  key={chat.id}
                  href={`/chats/${chat.id}`}
                  className={`block px-2.5 py-1.75 rounded-lg text-[13.5px] truncate transition-colors ${
                    isActive
                      ? "bg-white/9 text-primary"
                      : "text-muted hover:bg-white/6 hover:text-primary"
                  }`}
                >
                  {chat.title}
                </Link>
              );
            })}

            {mainNavItems.length > 0 && <SectionLabel label="Main" />}
            {mainNavItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}

            <SectionLabel label="Background" />
            {backgroundNavItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
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
      ) : (
        <aside className="flex flex-col w-[52px] h-screen bg-sidebar border-r border-border">
          {/* Top: toggle */}
          <div className="flex items-center justify-center py-3 shrink-0">
            <button
              onClick={onToggle}
              className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
              aria-label="Open sidebar"
            >
              <HamburgerIcon />
            </button>
          </div>

          {/* Nav: icons only */}
          <nav className="flex-1 flex flex-col items-center px-2 py-1 gap-0.5 overflow-y-auto">
            {topNavItems.map((item) => (
              <CollapsedNavIcon key={item.href} item={item} pathname={pathname} />
            ))}

            {/* Dot stack: Recents indicator */}
            <button
              onClick={onToggle}
              className="group relative flex flex-col items-center justify-center w-9 gap-[3px] py-2 rounded-lg text-muted hover:bg-white/6 transition-colors"
              aria-label="Expand sidebar to see recent chats"
            >
              <span className="w-[5px] h-[5px] rounded-full bg-[#666]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[#555]" />
              <span className="w-[5px] h-[5px] rounded-full bg-[#444]" />
              <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-surface px-2 py-1 text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Recents
              </span>
            </button>

            {mainNavItems.map((item) => (
              <CollapsedNavIcon key={item.href} item={item} pathname={pathname} />
            ))}

            {backgroundNavItems.map((item) => (
              <CollapsedNavIcon key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Bottom: Contact */}
          <div className="flex justify-center py-2 border-t border-border shrink-0">
            <button
              onClick={onContactClick}
              className="group relative flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:bg-white/6 hover:text-primary transition-colors"
              aria-label="Contact"
            >
              <ContactIcon />
              <span className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-surface px-2 py-1 text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Contact
              </span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
