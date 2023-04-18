import { ChatBubbleLeftRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from '../../firebase';

type NewChatProps = {
    id: string;
}

function ChatListItem ({ id }: NewChatProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
    ))
    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id));
    }, [pathname]);

    const removeChat = async () => {
        await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
        router.replace("/");
    }

    return (
        <Link href={`/chat/${id}`} className={`chatListItem justify-center ${active && "bg-gray-700/50"}`}>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <p className="flex-1 hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700" />
        </Link>
    );
}

export default ChatListItem;