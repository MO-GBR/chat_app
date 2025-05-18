import React from 'react'

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
    return (
        <>
            {
                skeletonMessages.map((_, index) => (
                    <div className={`flex ${ index % 2 === 0 ? "justify-end" : "justify-start" }`} key={index}>
                        <div className={`w-[200px] h-12 bg-gray-300 rounded-lg skeleton gap-10 flexCenter ${ index % 2 === 0 ? "ml-2" : "mr-2" }`}>
                            <div className='p-1 w-2 h-2 rounded-full animate-pulse border-2 border-white' />
                            <div className='p-1 w-2 h-2 rounded-full animate-pulse border-2 border-white' />
                            <div className='p-1 w-2 h-2 rounded-full animate-pulse border-2 border-white' />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default MessageSkeleton