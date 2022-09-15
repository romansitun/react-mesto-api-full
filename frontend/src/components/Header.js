import React from "react";
import { Route, Link } from 'react-router-dom';
import Logo from '../images/logo.svg'

function Header({ email, handleSignOut }) {
    return (
        <header className="header">
            <img
                src={Logo}
                alt="Логотип"
                className="header__logo"
            />
            <Route path='/sign-in'>
                <Link to='sign-up' className='header__link'>Регистрация</Link>
            </Route>
            <Route path='/sign-up'>
                <Link to='sign-in' className='header__link'>Войти</Link>
            </Route>
            <Route exact path='/'>
                <div className='header__menu'>
                    <p className='header__email'>{email}</p>
                    <button className='header__link header__link_button' onClick={handleSignOut}>Выйти</button>
                </div>
            </Route>
        </header>

    );
}

export default Header;