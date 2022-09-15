import React from "react";


function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_open-image ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__background">
                <button
                    className="popup__close-button popup__close-button_place_open-image"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <img alt={card.name} src={card.link} className="popup__photo" />
                <h2 className="popup__description">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;