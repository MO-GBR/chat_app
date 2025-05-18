import React, { useState } from 'react'
import Button from './Button'
import { useMutation } from '@apollo/client'
import { ADD_CHAT } from '../Lib/GraphQL/Mutations';
import { useAuth } from '../Lib/Zustand';
import PrivateSkeleton from './Skeleton/PrivateSkeleton';

const Private = () => {
    const [ userId, setUserId ] = useState('');
    const [ addchat, others ] = useMutation(ADD_CHAT);
    const { currentUser, addNewPrivateChat } = useAuth();

    const handleAddChat = async () => {
        const { data } = await addchat({
            variables: {
                unique_id: currentUser?.unique_id,
                chat_id: userId
            }
        });

        addNewPrivateChat(userId);

        console.log(data);
    }

    if(others.loading) return <PrivateSkeleton />
    
    return (
        <div className='w-[90%] flexCenter'>
            <div className='border border-base-300 bg-base-200 rounded-2xl flex items-center p-1 w-[70%]'>
                <input type="text" placeholder='User ID ...' value={userId} onChange={e => setUserId(e.target.value)}/>
                <Button text='Add' event={handleAddChat} />
            </div>
        </div>
    )
}

export default Private