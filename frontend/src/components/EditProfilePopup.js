import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    };

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm name='edit' title='Редактировать профиль' isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} buttonText={onLoading ? 'Ща все будет...' : 'Сохранить'} children={
            <>
                <input

                    id="firstname-input"
                    placeholder="Имя"
                    type="text"
                    className="popup__form-item popup__form-item_type_name"
                    name="firstname"
                    minLength="2"
                    maxLength="40"
                    value={name || ""}
                    onChange={handleNameChange}
                    required

                />
                <span className="firstname-input-error popup__form-item-error"></span>

                <input

                    id="info-input"
                    placeholder="Профессиональная деятельность"
                    type="text"
                    className="popup__form-item popup__form-item_type_job"
                    name="info"
                    value={description || ""}
                    onChange={handleDescriptionChange}
                    minLength="2"
                    maxLength="200"
                    required
                />
                <span className="info-input-error popup__form-item-error"></span>
            </>} />
    );
}

export default EditProfilePopup;