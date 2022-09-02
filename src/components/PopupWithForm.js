import React from "react";

function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, isLoading, loadingText, textBtn }) {

  function handleCLoseOverlayClick(e) {
    if(e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleCLoseOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно"
        >

        </button>
        <form className="form form_type_edit" name={name} onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>
          <fieldset className="form__input">
            {children}
            <button className="form__save" type="submit" name="save">{isLoading ? loadingText : textBtn}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;