import React from "react";
import successIcon from '../images/success-icon.svg'
import unsuccessIcon from '../images/unsuccess-icon.svg'


function InfoTooltip({ isOpen, onClose, isSuccess }) {



    return (

        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                ></button>
                <img className="popup__signup-icon"
                    src={isSuccess ? successIcon : unsuccessIcon}
                    alt={
                        isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
                    }></img>
                <h2 className="popup__signup-title">{isSuccess
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>


            </div>
        </div >

    );
}

export default InfoTooltip;