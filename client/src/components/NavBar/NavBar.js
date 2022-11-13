import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NavBar.module.css';

export default function NavBar() {
    return (
        <header className={style.navbar}>
            <div>
            {/* <img className='img' src={img} alt='icono'/> */}
            </div>
            <div><h2 className={style.h2}>Movie App</h2></div>
            <nav>
                <ul className={style.list}>
                    <li >
                        <NavLink className={style.link} to="/main_page">Home</NavLink>
                        <NavLink className={style.link} to="/about">About</NavLink>
                        
                    </li>
                </ul>
            </nav>
        </header>
    )
}