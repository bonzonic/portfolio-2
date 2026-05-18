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

  useEffect(() => {
    getHistory().then(setMessages);
  }, []);

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
          history: baseMessages.slice(-MAX_HISTORY_SENT),
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
    const base = messages.slice(0, -2); // remove the failed user + interrupted assistant messages
    setMessages(base);
    send(lastUserMessageRef.current, base);
  }

  async function handleClear() {
    await clearHistory();
    setMessages([]);
    setError(null);
  }

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i} data-role={msg.role}>
            {msg.content || (msg.role === "assistant" && isLoading ? "..." : "")}
          </div>
        ))}
      </div>

      {error && (
        <div>
          <span>{error}</span>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      <div>
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
        />
        <button onClick={handleSubmit} disabled={isLoading || !input.trim()}>
          Send
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}
