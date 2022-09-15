import React from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup ";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from '../utils/Api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";



function App() {


  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopup] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [removedCardId, setRemovedCardId] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false);


  const [cards, setCards] = React.useState([]);

  const [profileEmail, setProfileEmail] = React.useState('');



  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    api.getInitialCards(jwt)
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  // function handleLogin() {
  //   setLoggedIn(true)
  // }

  const history = useHistory();

  React.useEffect(() => {

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.checkToken(jwt)
        .then((data) => {
          if (data) {
            setProfileEmail(data.email)
            setLoggedIn(true)
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);



  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked, jwt).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    const jwt = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id, jwt).then(() => {
      setCards((state) => state.filter((item) => item._id !== card._id));
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }



  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    api.getUserInfo(jwt)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [loggedIn]);


  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }


  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }



  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }


  function handleConfirmDeleteClick(cardId) {
    setIsConfirmDeletePopup(!isConfirmDeletePopupOpen);
    setRemovedCardId(cardId);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeletePopup(false);
    setIsInfoTooltipOpen(false);
  }

  const isOpen = isInfoTooltipOpen || isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  React.useEffect(() => {
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

  function handleUpdateUser(user) {
    setIsLoading(true)
    const jwt = localStorage.getItem('jwt');
    api.editProfile(user, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  function handleUpdateAvatar(data) {
    setIsLoading(true)
    const jwt = localStorage.getItem('jwt');
    api.editAvatar(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {

        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        history.push('/sign-in');

      })
      .catch(err => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      })
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {

        if (data.token) {
          setProfileEmail(email);
          setLoggedIn(true);
          history.push('/');

        }
      })
      .catch(err => {
        console.log(err)
        openInfoTooltip();
      }); // запускается, если пользователь не найден
  }



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header handleSignOut={handleSignOut} email={profileEmail} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDeleteClick} />

          <Route path="/sign-in">
            <Login onLogin={handleLogin} openInfoTooltip={openInfoTooltip} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        < Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onLoading={isLoading} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} card={removedCardId} onLoading={isLoading} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isRegistrationSuccessful} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
