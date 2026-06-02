import { notFound } from "next/navigation";
import { curatedChats } from "@/app/data/chats";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chat = curatedChats.find((c) => c.id === id);
  if (!chat) notFound();

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-150 mx-auto px-6 py-8 flex flex-col gap-5">
        {chat.messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-surface text-primary rounded-tr-sm"
                  : "text-primary rounded-tl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
