export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatMeta {
  id: string;
  title: string;
  updatedAt: number;
}

const DB_NAME = "portfolio-chat-v2";
const DB_VERSION = 1;
const MESSAGES_STORE = "messages";
const INDEX_STORE = "chat-index";
const INDEX_KEY = "__index__";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(MESSAGES_STORE)) db.createObjectStore(MESSAGES_STORE);
      if (!db.objectStoreNames.contains(INDEX_STORE)) db.createObjectStore(INDEX_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getMessages(chatId: string): Promise<Message[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(MESSAGES_STORE, "readonly").objectStore(MESSAGES_STORE).get(chatId);
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => reject(req.error);
  });
}

export async function getChatIndex(): Promise<ChatMeta[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(INDEX_STORE, "readonly").objectStore(INDEX_STORE).get(INDEX_KEY);
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => reject(req.error);
  });
}

export async function upsertChat(meta: ChatMeta, messages: Message[]): Promise<void> {
  const index = await getChatIndex();
  const next = [meta, ...index.filter((c) => c.id !== meta.id)];
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([MESSAGES_STORE, INDEX_STORE], "readwrite");
    tx.objectStore(MESSAGES_STORE).put(messages, meta.id);
    tx.objectStore(INDEX_STORE).put(next, INDEX_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("chat-updated"));
  }
}
