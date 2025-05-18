import React from 'react'

const Banner = ({ title, subtitle }) => {
    return (
        <div className='flexCenter flex-col'>
            <div className='flexCenter bg-gray-300 m-3 rounded-full p-3 animate-bounce'>
                <img src="/icons/logo.svg" alt="logo" className='w-10' />
            </div>
            <h1 className='font-bold text-2xl'>Welcome to Chatty</h1>
            <div className='w-full h-fit flexCenter'>
                <div className='grid grid-cols-1 grid-rows-3'>
                    <div className='banner1 flash' />
                    <div className='banner2 flash' />
                    <div className='banner1 flash' />
                </div>
                <div className='grid grid-cols-1 grid-rows-3'>
                    <div className='banner2 flash' />
                    <div className='banner1 flash' />
                    <div className='banner2 flash' />
                </div>
                <div className='grid grid-cols-1 grid-rows-3'>
                    <div className='banner1 flash' />
                    <div className='banner2 flash' />
                    <div className='banner1 flash' />
                </div>
            </div>
            {title && (<h2 className="text-2xl font-bold mb-4">{title}</h2>)}
            {subtitle && (<p className="text-base-content/60 w-[300px] text-center">{subtitle}</p>)}
        </div>
    )
}

export default Banner