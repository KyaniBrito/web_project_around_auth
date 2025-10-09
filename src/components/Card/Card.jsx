import ImagePopup from "../Popup/ImagePopup/ImagePopup";

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { name, link } = card;

  const imageComponent = {
    children: <ImagePopup card={card} />,
  };

  const isLiked = card.isLiked;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div className="card__elements">
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
        <img
          className="card__image"
          src={link}
          alt=""
          onClick={() => handleOpenPopup(imageComponent)}
        />
        <div className="card__description">
          <p className="card__title">{name}</p>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        </div>
      </div>
    </li>
  );
}
