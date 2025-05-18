import React, { useState, useRef } from 'react'
import Button from '../Components/Button';
import { useAuth } from '../Lib/Zustand';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../Lib/GraphQL/Mutations';
import { UpdateUserInput } from '../Lib/GraphQL/Inputs';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { currentUser, setUserWithoutSocket } = useAuth();

    const imgPlaceholder = currentUser?.user_image === 'https://avatar.iran.liara.run/public/boy' ? '/icons/camera.svg' : currentUser?.user_image;

    const [ selectedImg, setSelectedImg ] = useState(imgPlaceholder);
    const [ privateAccount, setPrivateAccount ] = useState(currentUser?.is_active);
    const [ username, setUsername ] = useState(currentUser?.username);
    const [ email, setEmail ] = useState(currentUser?.email);
    const [ bio, setBio ] = useState(currentUser?.bio);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
        };
    };

    const removeImage = () => {
        setSelectedImg('/icons/camera.svg');
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const [ update, others ] = useMutation(EDIT_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await update(UpdateUserInput(currentUser?.unique_id, privateAccount, username, email, selectedImg, bio));
        setUserWithoutSocket(data.update);
        navigate('/profile');
    };

    return (
        <div className='w-full h-screen flexCenter'>
            <form className='flexCenter flex-col' onSubmit={handleSubmit}>
                <label className='p-1 flexCenter h-[120px] w-[120px] bg-gray-200 rounded-full cursor-pointer'>
                    <div className='absolute'>
                        <img src={selectedImg} alt='avatar' className='w-[100px] rounded-full'/>
                        {selectedImg !== '/icons/camera.svg' && <button className='XBtn' type='button' onClick={removeImage}>X</button>}
                    </div>
                    <input type='file' className='hidden' onChange={handleImageUpload} ref={fileInputRef} />
                </label>
                <label className='label'>
                    <span className='font-bold'>Username</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[94%] flex items-center'>
                        <img src='/icons/user.svg' alt='user' />
                        <input type="text" placeholder='Write your username here' value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                </label>
                <label className='label'>
                    <span className='font-bold m-2'>Email</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[94%] flex items-center'>
                        <img src='/icons/email.svg' alt='email' />
                        <input type="email" placeholder='email@emailexample.com' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </label>
                <div className='flexCenter gap-2'>
                    <p className='font-bold'>Private Account</p>
                    <div className={`flex w-[100px] h-[45px] border-2 rounded-3xl items-center gap-3 cursor-pointer ${ privateAccount ? 'border-base-200' : 'border-base-300 flex-row-reverse' }`} onClick={() => setPrivateAccount(!privateAccount)}>
                        <div className={`w-[45px] h-[45px] rounded-3xl ${ privateAccount ? 'bg-base-200' : 'bg-base-300' }`} />
                        <p>
                            {
                                privateAccount
                                    ? "ON"
                                    : "OFF"
                            }
                        </p>
                    </div>
                </div>
                <label className='w-[90%]'>
                    <div className='mt-10 border border-gray-300 p-3 rounded-2xl shadow-md'>
                        <span className='font-bold'>Write your Bio</span>
                        <div>
                            <textarea placeholder='Write about yourself' value={bio} onChange={e => setBio(e.target.value)} />
                        </div>
                    </div>
                </label>
                <Button text="Submit" type="submit" />
            </form>
        </div>
    )
}

export default EditProfile