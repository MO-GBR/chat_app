import React, { useState, useRef, useEffect } from 'react'
import Banner from '../Components/Banner'
import Button from '../Components/Button'
import { useMutation } from '@apollo/client'
import { SIGNUP } from '../Lib/GraphQL/Mutations'
import { SingUpInput } from '../Lib/GraphQL/Inputs'
import { useAuth } from '../Lib/Zustand'

const Signup = () => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ bio, setBio ] = useState('');
    const [selectedImg, setSelectedImg] = useState(null);
    const [ success, setSuccess ] = useState(true);
    const fileInputRef = useRef(null);

    const { setUser, message, setMessage } = useAuth();

    const [signup, others] = useMutation(SIGNUP);

    useEffect(() => {
        setMessage(null);
    }, []);
        
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
        setSelectedImg(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await signup(SingUpInput(username, email, password, confirmPassword, selectedImg, bio, null));
        localStorage.setItem('token', data.signUp.token);

        const errMsg = data.signUp.status ? '' : data.signUp.message;
        setUser(data.signUp.data, errMsg);
        if(data.signUp.status === false) setSuccess(false);
    };

    return (
        <div className='flexCenter w-full'>
            <form className='w-[50%] flexCenter flex-col m-5' onSubmit={handleSubmit}>
                {
                    message && (
                        <p className={success ? 'msg' : 'err'}>{message}</p>
                    )
                }
                <label className='label'>
                    <span className='font-bold'>Username</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[85%]'>
                        <input
                            type="text"
                            placeholder='Write your username here'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                </label>
                <label className='label'>
                    <span className='font-bold'>Email</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[85%]'>
                        <input
                            type="email"
                            placeholder='email@emailexample.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </label>
                <label className='label'>
                    <span className='font-bold'>Password</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[85%]'>
                        <input
                            type="password"
                            placeholder='Write your password here' 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </label>
                <label className='label'>
                    <span className='font-bold'>Confirm</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[85%]'>
                        <input
                            type="password"
                            placeholder='Confirm your username here'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </label>
                <label className='flexCenter w-full'>
                    <span className='btn w-[50%]'>Upload Image</span>
                    <input type="file" className='hidden' onChange={handleImageUpload} />
                    {
                        selectedImg && (
                            <div className="mb-3 flex items-center gap-2">
                                <div className="relative">
                                    <img
                                        src={selectedImg}
                                        alt="Preview"
                                        className="w-full h-20 object-cover rounded-lg border border-zinc-700"
                                    />
                                    <button className='XBtn' type='button' onClick={removeImage}>X</button>
                                </div>
                            </div>
                        )
                    }
                </label>
                <label className='w-[90%] max-md:w-full'>
                    <div className='mt-10 border border-gray-300 p-3 rounded-2xl shadow-md'>
                        <span className='font-bold'>Write your Bio</span>
                        <div>
                            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder='Write about yourself' />
                        </div>
                    </div>
                </label>
                <Button text="Sign up" icon="/icons/signup.svg" type="submit" />
                <Button text="Already have an account" icon="/icons/login.svg" type="button" href="/login" />
            </form>
            <div className='block max-md:hidden'>
                <Banner
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
                />
            </div>
        </div>
    )
}

export default Signup