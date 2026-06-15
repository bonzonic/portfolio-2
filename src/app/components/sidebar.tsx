"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { curatedChats } from "@/app/data/chats";
import { getChatIndex, type ChatMeta } from "@/app/utils/chat-store";

export interface SidebarProps {
  mobileOpen: boolean;
  desktopExpanded: boolean;
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

export function HamburgerIcon() {
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

const backgroundNavItems: NavItem[] = [
  { label: "Projects", href: "/projects", icon: <ProjectsIcon /> },
  { label: "Work Experience", href: "/work-experience", icon: <WorkIcon /> },
  { label: "Achievements", href: "/achievements", icon: <AchievementsIcon /> },
  { label: "Tools", href: "/tools", icon: <ToolsIcon /> },
];

function NavLink({
  item,
  pathname,
  collapsed,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const isActive = pathname.startsWith(item.href);
  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13.5px] transition-colors ${
        collapsed ? "md:w-9" : ""
      } ${isActive ? "bg-white/9 text-primary" : "text-muted hover:bg-white/6 hover:text-primary"}`}
    >
      <span className={isActive ? "text-primary" : "text-muted"}>{item.icon}</span>
      <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
    </Link>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  return (
    <div
      className={`relative overflow-hidden px-2.5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-dim whitespace-nowrap ${
        collapsed ? "md:invisible" : ""
      }`}
    >
      {label}
      {collapsed && (
        <div className="absolute inset-x-2.5 top-1/2 hidden border-t border-white/10 md:visible md:block" />
      )}
    </div>
  );
}

export function Sidebar({ mobileOpen, desktopExpanded, onToggle, onContactClick }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [liveChats, setLiveChats] = useState<ChatMeta[]>([]);
  const collapsed = !desktopExpanded;

  useEffect(() => {
    const refresh = () => getChatIndex().then(setLiveChats);
    refresh();
    window.addEventListener("chat-updated", refresh);
    return () => window.removeEventListener("chat-updated", refresh);
  }, []);

  function handleNewChat() {
    router.push(`/c/${crypto.randomUUID()}`);
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-65 transition-all duration-200 ease-in-out ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:z-auto md:shrink-0 ${desktopExpanded ? "md:w-65" : "md:w-16"}`}
    >
      <aside className="flex flex-col w-full h-full bg-sidebar border-r border-border overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between h-12 px-3 shrink-0">
          <span
            className={`text-sm font-semibold text-primary tracking-tight whitespace-nowrap ${collapsed ? "md:hidden" : ""}`}
          >
            Wong Nicholas
          </span>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto">
          <button
            onClick={handleNewChat}
            title={collapsed ? "New Chat" : undefined}
            className={`flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13.5px] text-muted hover:bg-white/6 hover:text-primary transition-colors cursor-pointer ${
              collapsed ? "md:w-9" : "w-full"
            }`}
          >
            <span className="text-muted">
              <NewChatIcon />
            </span>
            <span className={collapsed ? "md:hidden" : ""}>New Chat</span>
          </button>

          <SectionLabel label="Background" collapsed={collapsed} />
          {backgroundNavItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
          ))}

          <div className={collapsed ? "md:hidden" : ""}>
            <SectionLabel label="Recents" collapsed={collapsed} />
            {liveChats.map((chat) => {
              const isActive = pathname === `/c/${chat.id}`;
              return (
                <Link
                  key={chat.id}
                  href={`/c/${chat.id}`}
                  className={`block px-2.5 py-1.75 rounded-lg text-[13.5px] truncate transition duration-100 ${
                    isActive
                      ? "bg-white/9 text-primary"
                      : "text-muted hover:bg-white/6 hover:text-primary"
                  }`}
                >
                  {chat.title}
                </Link>
              );
            })}
            {curatedChats.map((chat) => {
              const isActive = pathname === `/chats/${chat.id}`;
              return (
                <Link
                  key={chat.id}
                  href={`/chats/${chat.id}`}
                  className={`block px-2.5 py-1.75 rounded-lg text-[13.5px] truncate transition duration-100 ${
                    isActive
                      ? "bg-white/9 text-primary"
                      : "text-muted hover:bg-white/6 hover:text-primary"
                  }`}
                >
                  {chat.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom: Contact */}
        <div className="px-2 py-2 border-t border-border shrink-0">
          <button
            onClick={onContactClick}
            title={collapsed ? "Contact" : undefined}
            className={`flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-[13.5px] text-muted hover:bg-white/6 hover:text-primary transition-colors cursor-pointer ${
              collapsed ? "md:w-9" : "w-full"
            }`}
          >
            <ContactIcon />
            <span className={collapsed ? "md:hidden" : ""}>Contact</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
