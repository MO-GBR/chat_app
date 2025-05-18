import React from 'react'

const NoChatSelected = () => {
    return (
        <div className='NoChatSelected'>
            <div className='max-w-md text-center space-y-6'>
                <div className='flex justify-center gap-4 mb-4'>
                    <div className='relative'>
                        <div className='NoChat'>
                            <img src='/icons/logo.svg' alt='search' />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    )
}

export default NoChatSelected