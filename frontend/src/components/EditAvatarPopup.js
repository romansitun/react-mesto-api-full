import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    };



    return (

        <PopupWithForm name='confirm' title='Обновить автар' isOpen={isOpen}
            buttonText={onLoading ? 'Ща все будет...' : 'Сохранить'}
            onClose={onClose} onSubmit={handleSubmit} children={<>
                <input

                    type="url"
                    className="popup__form-item popup__form-item_type_link"
                    name="link"
                    id="link-input"
                    aria-label="Введите ссылку на изображение"
                    placeholder="Ссылка на автар"
                    required
                    ref={avatarRef}
                />

                <span className="link-input-error popup__form-item-error"></span>


            </>} />

    );
}

export default EditAvatarPopup;