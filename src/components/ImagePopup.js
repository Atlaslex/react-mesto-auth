import React from "react";

function ImagePopup({ card, onClose }) {

  function handleCLoseOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup popup_type_img ${card.isOpen ? 'popup_opened' : ''}`} onClick={handleCLoseOverlayClick}>
      <div className="popup__img-container">
        <button className="popup__close" type="button" onClick={() => { onClose(card.card) }}></button>
        <div className="popup__img-title">
          <img className="popup__image" alt={card.card.name} src={card.card.link} />
          <h2 className="popup__title">{card.card.name}</h2>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;