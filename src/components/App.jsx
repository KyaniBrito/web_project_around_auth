import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import RemoveCard from "./Popup/removeCard/RemoveCard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserData(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.error("Erro ao buscar cartões:", err));
  }, []);

  async function handleCardLike(card) {
    try {
      const newCard = card.isLiked
        ? await api.unlikeCard(card._id)
        : await api.likeCard(card._id);

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error("Erro ao curtir/descurtir cartão:", error);
    }
  }

  useEffect(() => {
    api
      .getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
      });
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    (async () => {
      await api.editProfile(name, about).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleUpdateAvatar = ({ avatar }) => {
    (async () => {
      await api.updateAvatar(avatar).then((newData) => {
        setCurrentUser(newData);
      });
    })();
  };

  const handleAddPlaceSubmit = async ({ name, link }) => {
    try {
      const newCard = await api.addCard(name, link);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error("Erro ao adicionar cartão:", error);
    }
  };

  function handleOpenDeletePopup(card) {
    setCardToDelete(card);
    setPopup({
      title: "Tem certeza?",
      children: (
        <RemoveCard
          cardToDelete={card}
          handleClosePopup={handleClosePopup}
          onConfirm={handleConfirmDelete}
        />
      ),
    });
  }

  async function handleConfirmDelete(cardToDelete) {
    if (!cardToDelete) return;
    try {
      await api.deleteCard(cardToDelete._id);
      setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
    } catch (error) {
      console.error("Erro ao deletar cartão:", error);
    } finally {
      setCardToDelete(null);
      handleClosePopup();
    }
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleOpenDeletePopup}
                  popup={popup}
                  handleOpenPopup={handleOpenPopup}
                  handleClosePopup={handleClosePopup}
                  handleAddPlaceSubmit={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} />}
          />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => setIsInfoTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
