import { NextRequest } from "next/server";
import { checkRateLimit } from "@/app/utils/rate-limiter";
import { buildSystemPrompt } from "@/app/utils/build-system-prompt";
import type { Message } from "@/app/utils/chat-store";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: { message?: unknown; history?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, history } = body;

  if (typeof message !== "string" || !message.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  if (!Array.isArray(history)) {
    return Response.json({ error: "history must be an array" }, { status: 400 });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json({ error: "OPENROUTER_API_KEY is not set" }, { status: 503 });
  }

  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...(history as Message[]).map((msg) => ({ role: msg.role, content: msg.content })),
    { role: "user", content: message.trim() },
  ];

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash",
        messages,
        stream: true,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return Response.json(
        { error: (data as { error?: { message?: string } }).error?.message ?? "OpenRouter request failed" },
        { status: res.status },
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const json = JSON.parse(data) as {
                  choices?: { delta?: { content?: string } }[];
                };
                const text = json.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(new TextEncoder().encode(text));
              } catch {
                // skip malformed chunks
              }
            }
          }
        } catch (err) {
          controller.error(err instanceof Error ? err : new Error("Stream interrupted"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to reach AI service";
    return Response.json({ error: msg }, { status: 502 });
  }
}
