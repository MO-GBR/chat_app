import React, { useState, useEffect } from 'react'
import Banner from '../Components/Banner'
import Button from '../Components/Button'
import { LOGIN } from '../Lib/GraphQL/Mutations'
import { LoginInput } from '../Lib/GraphQL/Inputs'
import { useMutation } from '@apollo/client'
import { useAuth } from '../Lib/Zustand'
import { Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_MODE === "development" ? import.meta.env.VITE_BASE_URL : "/";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ success, setSuccess ] = useState(true);

    const [login, others] = useMutation(LOGIN);

    const { setUser, message, setMessage } = useAuth();

    useEffect(() => {
        setMessage(null);
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await login(LoginInput(email, password));
        localStorage.setItem('token', data.login.token);
        
        const errMsg = data.login.status ? '' : data.login.message;
        setUser(data.login.data, errMsg);
        if(data.login.status === false) setSuccess(false);
    };

    return (
        <div className='w-full h-screen flexCenter'>
            <form className='w-[50%] flexCenter flex-col m-5' onSubmit={handleSubmit}>
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
                <label className='label'>
                    <span className='font-bold m-2'>Password</span>
                    <div className='g1 p-2 rounded-xl m-2 w-[97%] flex items-center'>
                        <img src='/icons/lock.svg' alt='email' />
                        <input type="password" placeholder='Write your password here' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </label>
                <Button text="Login" icon="/icons/login.svg" />
                <Button text="Create Account" href="/signup" icon="/icons/user.svg" />
                <Button text="Login with Google" href={`${baseUrl}auth/google`} />
                <Link className='font-bold underline text-violet-600 hover:text-blue-600' to="/forgetpassword">Forget Password</Link>
            </form>
            <div className='block max-md:hidden'>
                <Banner />
            </div>
        </div>
    )
}


export default Login