"use client";

import { useState } from "react";
import { curatedChats } from "@/app/data/chats";

export function CuratedChats() {
  const [selectedId, setSelectedId] = useState(curatedChats[0].id);
  const selected = curatedChats.find((c) => c.id === selectedId) ?? curatedChats[0];

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div className="w-60 shrink-0 border-r border-border overflow-y-auto">
        <div className="px-4 pt-5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-dim">
            Conversations
          </p>
        </div>
        <div className="px-2 pb-4 flex flex-col gap-1">
          {curatedChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedId(chat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                selectedId === chat.id
                  ? "bg-white/9 text-primary"
                  : "text-muted hover:bg-white/6 hover:text-primary"
              }`}
            >
              <p className="text-[13px] font-medium leading-snug">{chat.title}</p>
              <p className="text-[11px] text-dim mt-0.5 truncate">{chat.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message view */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-150 mx-auto flex flex-col gap-5">
          <h2 className="text-base font-semibold text-primary">{selected.title}</h2>
          {selected.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-3"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-surface border border-border shrink-0 mt-0.5 flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="M5 1v8M1 5h8M2 2l6 6M8 2L2 8"
                      stroke="#c9a96e"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-surface text-primary rounded-tr-sm"
                    : "text-primary rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
