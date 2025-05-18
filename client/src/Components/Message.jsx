import { useQuery } from '@apollo/client'
import React, { useEffect, useRef } from 'react'
import { GET_ONE_USER } from '../Lib/GraphQL/Queries'
import { useChat } from '../Lib/Zustand';

const Message = ({chat, message}) => {
    const { data } = useQuery(GET_ONE_USER, {
        variables: {
            unique_id: message?.sender_id
        },
    });

    const time = message?.time.slice(message?.time.indexOf(', '), message?.time.length);

    const { messages } = useChat();

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        };
    }, [messages]);

    return (
        <div className={`flex ${ chat ? "justify-end" : "justify-start" }`} ref={messageEndRef}>
            <div className={`message ${ chat ? "bg-primary text-primary-content" : "bg-base-200" }`}>
                <div className={`w-full flex ${ chat && "flex-row-reverse" }`}>
                    <div className="size-7 rounded-full relative">
                        <img src={data?.getUserById?.user_image} alt='avatar' className='rounded-full' />
                    </div>
                </div>
                {
                    message?.image && (
                        <div className='w-full flex justify-center'>
                            <img src={message?.image} className='w-[250px] rounded-2xl m-3' alt='message'/>
                        </div>
                    )
                }
                {
                    message?.text && (<p className="text-sm">{message?.text}</p>)
                }
                <p className={`
                    text-[10px] mt-1.5
                    ${ chat ? "text-primary-content/70" : "text-base-content/70" }
                `}>
                    {time}
                </p>
            </div>
        </div>
    )
}

export default Message