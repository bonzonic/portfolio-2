"use client";

import { useState, useEffect, useRef } from "react";
import { getMessages, upsertChat, type Message } from "@/app/utils/chat-store";

const MAX_HISTORY_SENT = 10;

function deriveTitle(messages: Message[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "New Chat";
  return first.content.length > 45 ? first.content.slice(0, 42) + "..." : first.content;
}

const suggestedPrompts = [
  "Tell me about your experience",
  "What projects have you shipped?",
  "What are your core skills?",
  "What are you working on now?",
];

export interface ChatWidgetProps {
  chatId: string;
}

export function ChatWidget({ chatId }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(chatId).then(setMessages);
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(userContent: string, baseMessages: Message[]) {
    const userMessage: Message = { role: "user", content: userContent, timestamp: Date.now() };
    const updatedMessages = [...baseMessages, userMessage];

    setMessages([...updatedMessages, { role: "assistant", content: "", timestamp: Date.now() }]);
    setInput("");
    setIsLoading(true);
    setError(null);
    lastUserMessageRef.current = userContent;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userContent,
          history: updatedMessages.slice(-MAX_HISTORY_SENT),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Request failed");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullContent };
          return updated;
        });
      }

      const finalMessages: Message[] = [
        ...updatedMessages,
        { role: "assistant", content: fullContent, timestamp: Date.now() },
      ];
      setMessages(finalMessages);
      await upsertChat(
        { id: chatId, title: deriveTitle(finalMessages), updatedAt: Date.now() },
        finalMessages,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "[Response interrupted]",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    if (input.trim() && !isLoading) send(input.trim(), messages);
  }

  function handleRetry() {
    if (!lastUserMessageRef.current) return;
    const base = messages.slice(0, -2);
    setMessages(base);
    send(lastUserMessageRef.current, base);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Message thread */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-2 px-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-surface text-primary rounded-tr-sm"
                    : "text-primary rounded-tl-sm"
                }`}
              >
                {msg.content ||
                  (msg.role === "assistant" && isLoading ? (
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" />
                    </span>
                  ) : (
                    ""
                  ))}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-red-950/50 border border-red-900/50 text-sm text-red-300">
          <span>{error}</span>
          <button
            onClick={handleRetry}
            className="ml-3 text-xs underline underline-offset-2 hover:text-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Greeting + prompts — only shown before any message is sent */}
      {messages.length === 0 && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-primary tracking-tight mb-2">
            What can I help with?
          </h1>
          <p className="text-sm text-dim">Ask me anything about Nicholas&apos;s work and experience</p>
        </div>
      )}
      {messages.length === 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => send(prompt, [])}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-full text-xs text-muted border border-border bg-surface hover:border-white/20 hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-surface border border-border rounded-[14px] px-4 py-3 focus-within:border-white/20 transition-colors">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask about Nicholas..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-primary placeholder:text-dim outline-none resize-none disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
          className="w-8 h-8 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M7 2v10M3 6l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
