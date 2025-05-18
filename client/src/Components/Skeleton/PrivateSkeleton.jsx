import React from 'react'

const PrivateSkeleton = () => {
    return (
        <div className='w-[90%] flexCenter'>
            <div className='flex items-center justify-end w-[60%] h-[60px] rounded-3xl skeleton'>
                <div className='w-[70px] h-[50px] rounded-2xl m-3 skeleton' />
            </div>
        </div>
    )
}

export default PrivateSkeleton