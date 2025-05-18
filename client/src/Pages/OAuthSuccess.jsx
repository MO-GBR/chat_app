import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../Lib/GraphQL/Queries';
import { useAuth } from '../Lib/Zustand';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [loadUser, { data }] = useLazyQuery(GET_USER);
    const [tokenLoaded, setTokenLoaded] = useState(false);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            localStorage.setItem('token', token);
            setTokenLoaded(true);
        } else {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (tokenLoaded) {
            loadUser(); // trigger the GraphQL query after token is set
        }
    }, [tokenLoaded]);

    useEffect(() => {
        if (data?.passport) {
            setUser(data.passport, 'Login successful');
            navigate('/');
        }
    }, [data]);

    return (
        <div className='w-full h-screen flexCenter font-bold text-3xl'>Logging you in...</div>
    );
};

export default OAuthSuccess;
