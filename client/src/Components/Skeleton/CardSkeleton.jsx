import React from 'react'

const CardSkeleton = () => {
    return (
        <div className='w-[27rem] h-[20rem] rounded-2xl skeleton flexCenter flex-col'>
            <div className='w-16 h-16 rounded-full skeleton'></div>
            <div className='w-24 h-4 rounded-xl skeleton mt-2'></div>
            <div className='w-36 h-4 rounded-xl skeleton mt-2'></div>
        </div>
    )
}

export default CardSkeleton