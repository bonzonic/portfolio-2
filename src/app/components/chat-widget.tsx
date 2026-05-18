"use client";

import { useState, useEffect, useRef } from "react";
import { getHistory, saveHistory, clearHistory, type Message } from "@/app/utils/chat-store";

const MAX_HISTORY_SENT = 10;

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getHistory().then(setMessages);
  }, []);

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
      await saveHistory(finalMessages);
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

  async function handleClear() {
    await clearHistory();
    setMessages([]);
    setError(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Message thread */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto px-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2.5"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-surface border border-border shrink-0 mt-0.5 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
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
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-surface text-primary rounded-tr-sm"
                    : "text-primary rounded-tl-sm"
                }`}
              >
                {msg.content || (msg.role === "assistant" && isLoading ? (
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : "")}
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

      {/* Input bar */}
      <div className="flex items-end gap-2 bg-surface border border-border rounded-[14px] px-4 py-3 focus-within:border-white/20 transition-colors">
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
        <div className="flex items-center gap-1.5 shrink-0">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-dim hover:text-muted transition-colors px-1"
              title="Clear conversation"
            >
              Clear
            </button>
          )}
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
    </div>
  );
}
