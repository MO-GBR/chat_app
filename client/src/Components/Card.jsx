import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import copy from "copy-to-clipboard";
import { useAuth, useChat } from '../Lib/Zustand';

const Card = ({ user, current }) => {
    const { onlineUsers } = useAuth();

    const { setSelectedUser } = useChat();

    const copyId = () => {
        copy(user.unique_id);
        alert("ID copied to clipboard");
    };

    const navigate = useNavigate();

    const handClick = () => {
        setSelectedUser(user);
        navigate('/');
    };

    return (
        <div className='card'>
            <img src={user.user_image} alt='avatar' className='w-[100px] rounded-full' />
            <div className='flexCenter flex-col'>
                {
                    onlineUsers.includes(user.unique_id) ? (
                        <p className='font-bold text-green-500'>Online</p>
                    ) : (
                        <p className='font-bold text-gray-500'>Offline</p>
                    )
                }
                {
                    !user.is_active && (
                        <p className='badge'>Private</p>
                    )
                }
            </div>
            {
                current  && (
                    <div className='copyId' onClick={copyId}>
                        <p className='font-bold mr-3'>ID:</p>
                        <p>{user.unique_id}</p>
                        <img src='/icons/copy.svg' alt='copy id' />
                    </div>
                )
            }
            <p className='font-bold text-2xl'>{user.username}</p>
            {
                current && (
                    <div className='flex mr-2'>
                        <p className='font-bold mr-3'>Email:</p>
                        <p>{user.email}</p>
                    </div>
                )
            }
            <p className='m-3 text-center'>{user.bio}</p>
            <div className='flexBetween w-full'>
                <div className='flex ml-3'>
                    <p className='font-bold mr-3'>Joined At:</p>
                    <p>{user.time}</p>
                </div>
                {current ? <Link to='/edit-profile' className='chat'>Edit</Link> : <div className='chat' onClick={handClick}>Chat</div>}
            </div>
        </div>
    )
}

export default Card