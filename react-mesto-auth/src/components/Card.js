import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card);
    };


    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash-button ${isOwn ? 'element__trash-button_visible' : 'element__trash-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );



    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <button
                className={cardDeleteButtonClassName}
                type="button"
                aria-label="Удалить"
                onClick={handleDeleteClick}
            ></button>
            <div className="element__bottom">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="Поставить лайк"
                        onClick={handleLikeClick}
                    ></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;