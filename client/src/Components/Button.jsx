import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, href, icon, type, event }) => {
    const handleClick = () => {
        if (event) {
            event();
        };
        console.log(text);
    }
    return (
        <button className='btn w-[35%] max-md:w-full flexAround' type={type} onClick={handleClick}>
            {
                href ? (
                    <Link to={href}>{text}</Link>
                ) : (
                    <span>{text}</span>
                )
            }
            {icon && (<img src={icon} alt={text} />)}
        </button>
    )
}

export default Button