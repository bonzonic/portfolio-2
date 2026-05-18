interface Entry {
  count: number;
  resetAt: number;
}

const limits = new Map<string, Entry>();
const MAX = 15;
const WINDOW_MS = 60_000;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = limits.get(ip);
  if (!entry || now > entry.resetAt) {
    limits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX) return false;
  entry.count++;
  return true;
}
