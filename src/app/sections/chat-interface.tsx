import { ChatWidget } from "@/app/components/chat-widget";

export interface ChatInterfaceProps {
  chatId: string;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col min-h-full items-center justify-center px-4 py-6 md:px-10 md:py-10">
      <div className="w-full max-w-2xl">
        <ChatWidget chatId={chatId} />
      </div>
    </div>
  );
}
