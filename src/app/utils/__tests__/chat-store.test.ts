import { describe, it, expect, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { getHistory, saveHistory, clearHistory, type Message } from "../chat-store";

describe("chat-store", () => {
  beforeEach(async () => {
    await clearHistory();
  });

  it("returns empty array when no history exists", async () => {
    expect(await getHistory()).toEqual([]);
  });

  it("saves and retrieves messages", async () => {
    const messages: Message[] = [
      { role: "user", content: "Hello", timestamp: 1000 },
      { role: "assistant", content: "Hi there!", timestamp: 1001 },
    ];
    await saveHistory(messages);
    expect(await getHistory()).toEqual(messages);
  });

  it("overwrites previous history on save", async () => {
    await saveHistory([{ role: "user", content: "first", timestamp: 1 }]);
    await saveHistory([{ role: "user", content: "second", timestamp: 2 }]);
    const history = await getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].content).toBe("second");
  });

  it("clears history", async () => {
    await saveHistory([{ role: "user", content: "test", timestamp: 1 }]);
    await clearHistory();
    expect(await getHistory()).toEqual([]);
  });
});
