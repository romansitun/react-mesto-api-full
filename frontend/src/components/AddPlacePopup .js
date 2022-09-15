import React from "react";
import PopupWithForm from "./PopupWithForm";



function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');




    function handleNameChange(e) {
        setName(e.target.value);

    };

    function handleLinkChange(e) {
        setLink(e.target.value);

    };

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: name,
            link: link
        });

    };

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);



    return (
        <PopupWithForm name='add-image' title='Новое место' isOpen={isOpen}
            buttonText={onLoading ? 'Ван секонд...' : 'Создать'}
            onClose={onClose} onSubmit={handleSubmit}>


            <input
                type="text"
                className="popup__form-item popup__form-item_type_title"
                aria-label="Введите заголовок для изображения"
                name="name"
                id="title-input"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name || ""}
                onChange={handleNameChange}
                required

            />
            <span className="title-input-error popup__form-item-error"></span>

            <input

                type='url'
                className="popup__form-item popup__form-item_type_link"
                name="link"
                id="avatar-link-input"
                aria-label="Введите ссылку на изображение"
                placeholder="Ссылка на картинку"
                value={link || ""}
                onChange={handleLinkChange}
                required

            />
            <span className="avatar-link-input-error popup__form-item-error"></span>



        </PopupWithForm>

    );
}

export default AddPlacePopup;