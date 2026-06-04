import { ChatWidget } from "@/app/components/chat-widget";

const suggestedPrompts = [
  "Tell me about your experience",
  "What projects have you shipped?",
  "What are your core skills?",
  "What are you working on now?",
];

export interface ChatInterfaceProps {
  chatId: string;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col min-h-full items-center px-4 py-6 md:px-10 md:py-10">
      <div className="flex-[1]" />
      {/* Greeting — scrolls away naturally once messages appear */}
      <div className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-2xl font-semibold text-primary tracking-tight mb-2">
          What can I help with?
        </h1>
        <p className="text-sm text-dim">
          Ask me anything about Nicholas&apos;s work and experience
        </p>
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl mb-5">
        {suggestedPrompts.map((prompt) => (
          <span
            key={prompt}
            className="px-3.5 py-1.5 rounded-full text-xs text-muted border border-border bg-surface"
          >
            {prompt}
          </span>
        ))}
      </div>

      {/* ChatWidget — owns message thread + input */}
      <div className="w-full max-w-2xl">
        <ChatWidget chatId={chatId} />
      </div>
      <div className="flex-[3]" />
    </div>
  );
}
