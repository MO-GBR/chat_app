import React, { useState } from 'react'
import { SETTING } from '../Constants'
import { Link } from 'react-router-dom';
import { useAuth } from '../Lib/Zustand';
import { LOG_OUT } from '../Lib/GraphQL/Mutations'
import { useMutation } from '@apollo/client'

const Toolbar = () => {
    const { currentUser, LogUserOut } = useAuth();
    const [logout, others] = useMutation(LOG_OUT);
    const [show, setShow] = useState(false);
    return (
        <div>
            <div className='toolbarHead' onClick={() => setShow(!show)}>
                <img src='/icons/setting.svg' className='size-7' alt='setting' />
            </div>
            <div className={`toolbar ${show ? '' : 'hidden'}`}>
                {
                    SETTING.map((card, index) => {
                        const handleClick = async () => {
                            if(card.text === 'Log Out') {
                                const { data } = await logout();
                                LogUserOut();
                                localStorage.removeItem('token');
                            };
                            
                            console.log(card.text);
                        };
                
                        let hoverText;
                        if (card.text === 'Profile') {
                            hoverText = `View ${currentUser.username}'s Profile`;
                        } else if (card.text === 'Log Out') {
                            hoverText = `Log out of ${currentUser.username}'s account`;
                        } else {
                            hoverText = `Go to ${card.text}`;
                        };

                        return (
                            <Link key={index} to={card.href} className='hover:scale-105 hover:bg-base-300 p-2 rounded-full' onClick={handleClick} title={hoverText}>
                                <img src={card.icon} alt={card.text} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Toolbar