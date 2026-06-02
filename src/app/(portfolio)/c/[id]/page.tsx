import { ChatInterface } from "@/app/sections/chat-interface";

export default async function LiveChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChatInterface chatId={id} />;
}
