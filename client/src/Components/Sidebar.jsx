import React, { useState, useEffect } from 'react'
import User from './User';
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../Lib/GraphQL/Queries'
import { useAuth } from '../Lib/Zustand'
import SidebarSkeleton from './Skeleton/SidebarSkeleton';

const Sidebar = () => {
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    const { data, loading } = useQuery(GET_ALL_USERS);

    const { currentUser, onlineUsers } = useAuth();

    console.log(onlineUsers);

    const filterdData = data?.getAllUsers?.filter(u => u.unique_id !== currentUser.unique_id);

    const filteredUsers = showOnlineOnly
        ? filterdData?.filter(user => onlineUsers?.includes(user.unique_id))
        : filterdData;

    if(loading) return <SidebarSkeleton />
    if(!data) return <div className='text-center'>No User Yet You Can Come Back Later</div>

    return (
        <aside className="sidebar">
            <div className='sidebarHead'>
                <div className='flex items-center gap-2'>
                    <img src='/icons/user.svg' className='size-6' alt='contacts' />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                <div className='mt-3 hidden lg:flex items-center gap-2'>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>
            <div className='sidebarUsers'>
                {
                    filterdData?.length === 0
                        ? (
                            <div className='NoUsers'>
                                No User Yet You Can Come Back Later
                            </div>
                        )
                        : (
                            <>
                                {
                                    filteredUsers?.map((user, index) => (
                                        <User key={index} user={user} />
                                    ))
                                }
                            </>
                        )
                }
            </div>
        </aside>
    )
}

export default Sidebar