'use client';

import { useSession, signOut } from "next-auth/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChatButton from "./NewChatButton";
import { db } from "../../firebase";
import ChatListItem from "./ChatListItem";

function SideBar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, "users", session?.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )
    )

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                <NewChatButton />
                <div>
                    {/** Model Select Dropdown */}
                </div>
                
                {/** Map Chat List Here */}
                {chats?.docs.map(chat => (
                    <ChatListItem key={chat?.id} id={chat?.id} />
                ))}
            </div>
            {session && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    onClick={() => signOut()}
                    src={session.user?.image!} 
                    alt="profile pic" 
                    className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" 
                />
            )}
        </div>
    );
}

export default SideBar;