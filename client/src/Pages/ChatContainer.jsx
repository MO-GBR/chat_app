import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import NoChatSelected from './NoChatSelected'
import { useAuth, useChat } from '../Lib/Zustand'
import Private from '../Components/Private'

const ChatContainer = () => {
    const { selectedUser } = useChat();
    const { currentUser } = useAuth();
    console.log('>>>>', selectedUser, currentUser);
    const isUserActive = currentUser?.chats.includes(selectedUser?.unique_id);
    return (
        <div className='h-screen bg-base-200'>
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />
                        {
                            selectedUser
                                ? (selectedUser?.is_active || isUserActive) ? <Chat /> : <Private />
                                : <NoChatSelected />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatContainer