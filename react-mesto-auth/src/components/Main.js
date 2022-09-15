import React from "react";
import Card from '../components/Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image-edit">
                    <img
                        src={currentUser.avatar}
                        alt="Картинка профиля"
                        className="profile__image"
                    />
                    <button
                        title="Загрузить новый аватар"
                        className="profile__image-edit-button"
                        onClick={onEditAvatar}
                    ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__occupation">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить пост"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete} />))}
            </section>
        </main>

    );
}

export default Main;