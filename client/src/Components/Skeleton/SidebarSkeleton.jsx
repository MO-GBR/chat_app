import React from 'react'

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);
    return (
        <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <img src='/icons/user.svg' alt='user' className='w-6 h-6' />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
            </div>
            <div className="overflow-y-auto w-full py-3">
                {
                    skeletonContacts.map((_, index) => (
                        <div key={index} className="flex items-center gap-2 p-3">
                            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="flex flex-col">
                                <div className="w-24 h-4 bg-gray-300 animate-pulse mb-2"></div>
                                <div className="w-16 h-4 bg-gray-300 animate-pulse"></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarSkeleton