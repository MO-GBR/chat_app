import React from 'react'
import { PREVIEW_MESSAGES } from '../Constants'

const Preview = () => {
    return (
        <div className='preview'>
            <div className='p-4 bg-base-200'>
                <div className='max-w-lg mx-auto'>
                    <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                        <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                                    <img src='https://avatar.iran.liara.run/public/boy' alt='preview' />
                                </div>
                                <div>
                                    <div className="font-medium text-sm">John Doe</div>
                                    <p className="text-xs text-base-content/70">Online</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                            {
                                PREVIEW_MESSAGES.map((message) => (
                                    <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                                        <div className={`
                                            max-w-[80%] rounded-xl p-3 shadow-sm
                                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                                        `}>
                                            <p className="text-sm">{message.content}</p>
                                            <p className={`
                                                text-[10px] mt-1.5
                                                ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                                            `}>12:00 PM</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="p-4 border-t border-base-300 bg-base-100">
                            <div className="flex gap-2 items-center">
                                <input
                                    type='text'
                                    className='input input-bordered flex-1 text-sm h-10'
                                    placeholder='Type a message...'
                                    value='This is a preview'
                                    readOnly
                                />
                                <button className="btn h-10 min-h-0">
                                    <img src='/icons/send.svg' alt='send-preview' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview