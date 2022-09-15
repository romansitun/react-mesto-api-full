import React, { useState } from "react";

export default function Login({ onLogin }) {
    const initialData = {
        email: '',
        password: '',
    }

    const [profileData, setProfileData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfileData(profileData => ({
            ...profileData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!profileData.password || !profileData.email) {
            return;
        }

        onLogin(profileData)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Вход</h1>
            <input className="login-input__email" placeholder="Email" required id="email" name="email" type="email" value={profileData.email} onChange={handleChange} ></input>
            <input className="login-input__password" placeholder="Пароль" required id="password" name="password" type="password" value={profileData.password} onChange={handleChange}></input>
            <button type="submit" className="login__button">Войти</button>
        </form>
    )
}


