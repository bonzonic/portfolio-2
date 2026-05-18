import { describe, it, expect } from "vitest";
import { buildSystemPrompt } from "../build-system-prompt";

describe("buildSystemPrompt", () => {
  it("returns a non-empty string", () => {
    expect(buildSystemPrompt().length).toBeGreaterThan(0);
  });

  it("includes Nicholas in the output", () => {
    expect(buildSystemPrompt()).toContain("Nicholas");
  });

  it("includes the contact email for unknown-answer fallback", () => {
    expect(buildSystemPrompt()).toContain("wongyiznicholas@gmail.com");
  });

  it("includes the off-topic guardrail", () => {
    expect(buildSystemPrompt()).toContain("only answer questions");
  });
});
