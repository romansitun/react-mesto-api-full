import React from "react";
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup({ isOpen, onClose, onSubmit, card, onLoading }) {

    const handleConfirmiation = (event) => {
        event.preventDefault();
        onSubmit(card);
    };


    return (
        <PopupWithForm name='confiem' title='Вы уверены?' isOpen={isOpen} onSubmit={handleConfirmiation} onClose={onClose} buttonText={onLoading ? 'Ща все будет...' : 'Да'} />
    );
}

export default ConfirmDeletePopup;