import React from "react";
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {

    const initialData = {
        email: '',
        password: '',
    }

    const [profileData, setProfileData] = React.useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileData(profileData => ({
            ...profileData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(profileData)
    }

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h1 className="register__title">Регистрация</h1>
            <input required className="register__email-input" placeholder="Email" id="email" name="email" type="email" value={profileData.email} onChange={handleChange}></input>
            <input required className="register__password-input" placeholder="Пароль" id="password" name="password" type="password" value={profileData.password} onChange={handleChange}></input>
            <button type="submit" className="register__button">Зарегистрироваться</button>
            <Link to="sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
        </form>
    )
}

