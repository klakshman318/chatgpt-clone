import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";

type ChatUIProps = {
    params: {
        id: string
    }
}

function ChatUI ({ params: { id } }: ChatUIProps) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    )
}

export default ChatUI;