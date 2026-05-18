import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../rate-limiter";

// Each test uses a unique IP to avoid sharing in-memory module state.
describe("checkRateLimit", () => {
  it("allows the first request from an IP", () => {
    expect(checkRateLimit("1.0.0.1")).toBe(true);
  });

  it("allows exactly 15 requests from the same IP", () => {
    for (let i = 0; i < 14; i++) checkRateLimit("2.0.0.1");
    expect(checkRateLimit("2.0.0.1")).toBe(true);
  });

  it("blocks the 16th request from the same IP", () => {
    for (let i = 0; i < 15; i++) checkRateLimit("3.0.0.1");
    expect(checkRateLimit("3.0.0.1")).toBe(false);
  });

  it("isolates rate limits by IP", () => {
    for (let i = 0; i < 15; i++) checkRateLimit("4.0.0.1");
    expect(checkRateLimit("5.0.0.1")).toBe(true);
  });
});
