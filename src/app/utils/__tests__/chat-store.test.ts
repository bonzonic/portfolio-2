import { describe, it, expect, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { getMessages, upsertChat, getChatIndex, type Message, type ChatMeta } from "../chat-store";

const makeMessages = (content: string): Message[] => [
  { role: "user", content, timestamp: Date.now() },
];

describe("chat-store", () => {
  beforeEach(async () => {
    // Reset by upserting nothing — the DB persists across tests via fake-indexeddb
    // Each test uses a unique chatId to stay isolated
  });

  it("returns empty array for unknown chat", async () => {
    expect(await getMessages("nonexistent")).toEqual([]);
  });

  it("returns empty index when no chats exist", async () => {
    expect(await getChatIndex()).toEqual([]);
  });

  it("saves messages and retrieves them by id", async () => {
    const id = "chat-1";
    const messages = makeMessages("Hello");
    const meta: ChatMeta = { id, title: "Hello", updatedAt: 1000 };
    await upsertChat(meta, messages);
    expect(await getMessages(id)).toEqual(messages);
  });

  it("upsertChat adds entry to index as newest first", async () => {
    const a: ChatMeta = { id: "a", title: "First", updatedAt: 1000 };
    const b: ChatMeta = { id: "b", title: "Second", updatedAt: 2000 };
    await upsertChat(a, makeMessages("first"));
    await upsertChat(b, makeMessages("second"));
    const index = await getChatIndex();
    expect(index[0].id).toBe("b");
    expect(index[1].id).toBe("a");
  });

  it("upsertChat moves existing chat to top on update", async () => {
    const meta: ChatMeta = { id: "c", title: "Chat C", updatedAt: 500 };
    await upsertChat(meta, makeMessages("old"));
    await upsertChat({ id: "d", title: "D", updatedAt: 600 }, makeMessages("d"));
    await upsertChat({ ...meta, updatedAt: 700 }, makeMessages("new"));
    const index = await getChatIndex();
    expect(index[0].id).toBe("c");
  });

  it("overwrites messages on re-upsert", async () => {
    const id = "chat-ow";
    await upsertChat({ id, title: "t", updatedAt: 1 }, makeMessages("v1"));
    await upsertChat({ id, title: "t", updatedAt: 2 }, makeMessages("v2"));
    expect(await getMessages(id)).toEqual(makeMessages("v2"));
  });
});
