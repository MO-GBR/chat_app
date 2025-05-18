import React, { useState, useEffect } from 'react'
import Banner from '../Components/Banner'
import Button from '../Components/Button'
import { useMutation } from '@apollo/client'
import { SEND_EMAIL } from '../Lib/GraphQL/Mutations'
import { useAuth } from '../Lib/Zustand'

const ForgetPassword = () => {
    const [ success, setSuccess ] = useState(true);
    const [ email, setEmail ] = useState('');

    const { message, setMessage } = useAuth();

    const [forgetpassword, others] = useMutation(SEND_EMAIL);

    useEffect(() => {
        setMessage(null);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await forgetpassword({
            variables: {
                email,
            }
        });
        setMessage(data.sendResetPasswordEmail.message);
        if(data.sendResetPasswordEmail.status === false) setSuccess(false);
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
                            <p className={success ? 'msg' : 'err'}>{message}</p>
                        )
                    }
                    <label className='label'>
                        <span className='font-bold m-2'>Email</span>
                        <div className='g1 p-2 rounded-xl m-2 w-[97%] flex items-center'>
                            <img src='/icons/email.svg' alt='email' />
                            <input type="email" placeholder='email@emailexample.com' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </label>
                    <Button text="Send" icon="/icons/email.svg" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword