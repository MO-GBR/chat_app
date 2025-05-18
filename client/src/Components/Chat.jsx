import React, { useEffect } from 'react'
import ChatHead from './ChatHead'
import Message from './Message'
import InputMessage from './InputMessage'
import MessageSkeleton from './Skeleton/MessageSkeleton'
import { useChat, useAuth } from '../Lib/Zustand'
import { useQuery } from '@apollo/client'
import { GET_MESSAGES } from '../Lib/GraphQL/Queries'
import { GetMessageInput } from '../Lib/GraphQL/Inputs'
import CardSkeleton from './Skeleton/CardSkeleton'
import ChatCard from './ChatCard'

const Chat = () => {
    const { messages, selectedUser, setMessages, subscribeToMessages, unsubscribeFromMessages } = useChat();
    const { currentUser } = useAuth();

    const { data, loading } = useQuery(GET_MESSAGES, GetMessageInput(currentUser.unique_id, selectedUser?.unique_id));

    useEffect(() => {
        if (loading || !data) return;

        console.log("🔍 Raw data from query:", data);

        const chatMessages = data?.getMessages?.chatMessages;
        const myMessages = data?.getMessages?.myMessages;
        if (!chatMessages || !myMessages) return;

        console.log("💬 Chat messages:", chatMessages);
        console.log("📨 My messages:", myMessages);

        const newMessages = [...chatMessages, ...myMessages];

        const sortedMessages = newMessages.sort((a, b) => {
            return a.created_at - b.created_at;
        });

        setMessages(sortedMessages);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser.unique_id, subscribeToMessages, unsubscribeFromMessages, data, loading, setMessages]);

    if(loading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHead />
                <div className='flex items-center justify-center p-4'>
                    <CardSkeleton />
                </div>
                <MessageSkeleton />
                <InputMessage />
            </div>
        )
    };

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHead />
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                <div className='flex items-center justify-center p-4'>
                    <ChatCard />
                </div>
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        message={message}
                        chat={currentUser.unique_id === message.sender_id}
                    />
                ))}
            </div>
            <InputMessage />
        </div>
    )
}

export default Chat