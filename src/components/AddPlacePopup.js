import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const linkInputRef = useRef();
  const nameInputRef = useRef();
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  useEffect(() => {
    nameInputRef.current.value = '';
    linkInputRef.current.value = '';
    setIsLinkValid(false);
    setIsNameValid(false);
  }, [isOpen])

  useEffect(() => {
    setIsButtonValid(isLinkValid && isNameValid);
  }, [isNameValid, isLinkValid])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: linkInputRef.current.value,
      name: nameInputRef.current.value
    });
  }

  function handleLinkChange() {
    if (linkInputRef.current.validity.valid) {
      setIsLinkValid(true);
    }
    else {
      setIsLinkValid(false);
    }
  }

  function handleNameChange() {
    if (nameInputRef.current.validity.valid) {
      setIsNameValid(true);
    }
    else {
      setIsNameValid(false);
    }
  }

  return (
    <PopupWithForm

      name="add-image"
      title="Новое место"
      textBtn="Создать"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isButtonValid}
      isLoading={isLoading}
    >
      <fieldset className="form__input" name="addcard">
        <label className="label">
          <input id="input-name" className="form__item form__item_type_location-name" type="text" name="name"
            placeholder="Название" ref={nameInputRef} onChange={handleNameChange} required minLength="2" maxLength="30" autoComplete="off" />
          <span className="form__input-error input-name-error"></span>
        </label>
        <label className="label">
          <input id="input-link" className="form__item form__item_type_link-img" type="url" name="link"
            placeholder="Сылка на картинку" ref={linkInputRef} onChange={handleLinkChange} required autoComplete="off" />
          <span className="form__input-error input-link-error"></span>
        </label>

      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;