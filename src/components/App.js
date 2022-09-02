import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from '../context/CurrentUserContext';
import DeleteCardPopup from "./DeleteCardPopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [selectedCard, setSelectCard] = useState({ isOpen: false, card: {} });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDelete, setIsConfirmationDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const closeAllPopups = () => {
    setSelectCard({ isOpen: false, card: {} });
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationDelete(false);
  };

  function handleConfirmationDeleteClick() {
    setIsConfirmationDelete(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)

  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api.patchAvatarInfo(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => {

          return cards.filter(item => item !== card);

        })
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      api.setLike(card)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.patchUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

  }

  function handleCardClick(card) {
    setSelectCard({ isOpen: true, card: card });

  }

  function handleDeleteCardClick(card) {
    setCard(card);
    setIsConfirmationDelete(true);

  }

  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />
        <Main
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onConfirmationDelete={handleConfirmationDeleteClick}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
          onCardLike={handleCardLike}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />



        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
          onSubmit={handleCardDelete}
          isOpen={isConfirmationDelete}
          onClose={closeAllPopups}
          card={card}
          isLoading={isLoading}
        >

        </DeleteCardPopup>

      </CurrentUserContext.Provider>

    </div>


  );
}




export default App;
