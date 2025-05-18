import React, { useState, useEffect } from 'react'
import Banner from '../Components/Banner'
import Button from '../Components/Button'
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Lib/Zustand';
import { RESET_PASSWORD } from '../Lib/GraphQL/Mutations';
import { ResetPasswordInput } from '../Lib/GraphQL/Inputs';

const ResetPassword = () => {
    const resetToken = useParams().resetToken;

    const [ success, setSuccess ] = useState(true);
    const [ password, setPassword ] = useState('');
    const [ confirmassword, setConfirmassword ] = useState('');

    const { message, setMessage } = useAuth();

    const [ resetpassword, others ] = useMutation(RESET_PASSWORD);

    useEffect(() => {
        setMessage(null);
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await resetpassword(ResetPasswordInput(resetToken, password, confirmassword));
        setMessage(data.resetPassword.message);
        if(data.resetPassword.status === false) setSuccess(false);
    };
    return (
        <div className='w-full h-screen flexCenter'>
            <div className='flexCenter'>
                <div className='block max-md:hidden'>
                    <Banner />
                </div>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    {
                        message && (
                            <p className={`flexCenter flex-col ${ success ? 'msg' : 'err' }`}>
                                {message}
                                <Button text="Login" icon="/icons/login.svg" href="/login" />
                            </p>
                        )
                    }
                    <label className='label'>
                        <span className='font-bold m-2'>Password</span>
                        <div className='g1 p-2 rounded-xl m-2 w-[97%] flex items-center'>
                            <img src='/icons/lock.svg' alt='email' />
                            <input type="password" placeholder='Write your new password here' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </label>
                    <label className='label'>
                        <span className='font-bold m-2'>Confirm</span>
                        <div className='g1 p-2 rounded-xl m-2 w-[97%] flex items-center'>
                            <img src='/icons/lock.svg' alt='email' />
                            <input type="password" placeholder='Confirm your new password here' value={confirmassword} onChange={e => setConfirmassword(e.target.value)} />
                        </div>
                    </label>
                    <Button text="Reset" icon="/icons/reset.svg" />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword