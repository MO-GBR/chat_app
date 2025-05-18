import React from 'react'
import { useChat } from '../Lib/Zustand'

const ChatCard = () => {
    const { selectedUser } = useChat();
    return (
        <div className='ChatCard'>
            <img src={selectedUser.user_image} className='size-20 rounded-full' alt='avatar' />
            <div className='font-bold text-lg'>{selectedUser.username}</div>
            <div className='text-sm text-center w-[220px] h-[100px] overflow-y-hidden'>{selectedUser.bio}</div>
        </div>
    )
}

export default ChatCard