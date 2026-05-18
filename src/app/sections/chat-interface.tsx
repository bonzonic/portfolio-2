import { ChatWidget } from "@/app/components/chat-widget";

const suggestedPrompts = [
  "Tell me about your experience",
  "What projects have you shipped?",
  "What are your core skills?",
  "What are you working on now?",
];

export function ChatInterface() {
  return (
    <div className="flex flex-col h-full items-center justify-end pb-6 px-4">
      {/* Greeting — scrolls away naturally once messages appear */}
      <div className="w-full max-w-160 mb-6 text-center">
        <h1 className="text-2xl font-semibold text-primary tracking-tight mb-2">
          What can I help with?
        </h1>
        <p className="text-sm text-dim">Ask me anything about Nicholas&apos;s work and experience</p>
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-160 mb-5">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            className="px-3.5 py-1.5 rounded-full text-xs text-muted border border-border bg-surface hover:bg-white/6 hover:text-primary transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* ChatWidget — owns message thread + input */}
      <div className="w-full max-w-160">
        <ChatWidget />
      </div>
    </div>
  );
}
