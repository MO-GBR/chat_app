import React from 'react'
import Card from '../Components/Card'
import { useAuth } from '../Lib/Zustand'

const Profile = () => {
    const { currentUser } = useAuth();
    return (
        <div className='w-full h-screen flexCenter'>
            <Card user={currentUser} current={true} />
        </div>
    )
}

export default Profile