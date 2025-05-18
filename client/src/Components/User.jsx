import React from 'react'
import { useChat, useAuth } from '../Lib/Zustand';

const User = ({ user }) => {
    const { selectedUser, setSelectedUser } = useChat();
    const { onlineUsers } = useAuth();

    return (
        <button className={`user ${ selectedUser?.unique_id === user.unique_id ? "selectedUser" : "" }`} onClick={() => setSelectedUser(user)} type='button'>
            <div className='relative mx-auto lg:mx-0'>
                <img src={user.user_image} className='w-[30px] rounded-full' alt='avatar' />
                {
                    onlineUsers.includes(user.unique_id) && (
                        <span className='online' />
                    )
                }
            </div>
            <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user?.username}</div>
                <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user.unique_id) ? "Online" : "Offline"}
                </div>
            </div>
        </button>
    )
}

export default User