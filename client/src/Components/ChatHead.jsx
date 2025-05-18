import React from 'react'
import { useChat, useAuth } from '../Lib/Zustand';

const ChatHead = () => {
    const { selectedUser, setSelectedUser } = useChat();
    const { onlineUsers } = useAuth();

    const isUserOnline = onlineUsers.includes(selectedUser?.unique_id);

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flexBetween'>
                <div className='flex items-center gap-3'>
                    <div className="size-10 relative">
                        <img src={selectedUser?.user_image} alt='avatar' className='rounded-full' />
                    </div>
                    <div>
                        <h3 className="font-medium">{selectedUser?.username}</h3>
                        <p className="text-sm text-base-content/70">
                            {
                                isUserOnline
                                    ? "Online"
                                    : "Offline"
                            }
                        </p>
                    </div>
                </div>
                <button className='font-bold cursor-pointer' onClick={() => setSelectedUser(null)}>X</button>
            </div>
        </div>
    )
}

export default ChatHead