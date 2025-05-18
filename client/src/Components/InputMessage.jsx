import React, { useState, useRef } from 'react'
import { useAuth, useChat } from '../Lib/Zustand';
import { SEND_MESSAGE } from '../Lib/GraphQL/Mutations';
import { MessageInput } from '../Lib/GraphQL/Inputs';
import { useMutation } from '@apollo/client';

const InputMessage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [text, setText] = useState("");
    const fileInputRef = useRef(null);

    const { currentUser } = useAuth();
    const { selectedUser, sendMessage } = useChat();

    const [ sendmsg, others ] = useMutation(SEND_MESSAGE);
    
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
        };
    };

    const removeImage = () => {
        setSelectedImg(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await sendmsg(MessageInput(currentUser.unique_id, selectedUser.unique_id, text, selectedImg));
        sendMessage(data.sendMessage);

        setText("");
        setSelectedImg(null);
    };

    return (
        <div className="p-4 w-full" onSubmit={handleSubmit}>
            {
                selectedImg && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={selectedImg}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button className='XBtn' type='button' onClick={removeImage}>X</button>
                        </div>
                    </div>
                )
            }
            <form className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <div className='w-full border border-gray-300 rounded-2xl'>
                        <input
                            className='p-3'
                            type="text"
                            placeholder="Type a message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${selectedImg ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <img src='/icons/img.svg' alt='send-img' className='w-[30px]' />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn h-10 min-h-0"
                    disabled={!text.trim() && !selectedImg}
                >
                    <img src='/icons/send.svg' alt='send-message' className='w-[30px]' />
                </button>
            </form>
        </div>
    )
}

export default InputMessage