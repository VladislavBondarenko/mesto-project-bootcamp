import { openPopup } from "../componets/utils.js";
import { cardsContainer } from "../main.js";
import { deleteCard, deleteLike, putLike } from "./api.js";

const zoomImagePopup = document.querySelector(".popup_zoom_image");
const zoomCaption = document.querySelector(".popup__caption");
const zoomImage = document.querySelector(".popup__image");
const cardTemplate = document.querySelector(".card-template").content;

const createCard = (element, user) => {
  const card = element;
  const userId = user;
  const cardOwner = card.owner;
  const cardOwnerId = cardOwner._id;
  const cardName = card.name;
  const cardImageSrc = card.link;
  const cardId = card._id;
  const likes = card.likes;
  const likesLength = likes.length;

  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like-button");
  const removeButton = cardElement.querySelector(".element__remove-button");

  cardImage.setAttribute("src", cardImageSrc);
  cardImage.setAttribute("alt", cardName);
  cardElement.querySelector(".element__title").textContent = cardName;
  cardElement.querySelector(".element__like-count").textContent = likesLength;

  likes.forEach((element) => {
    const userLike = element;
    const userLikeId = element._id;
    if (userId === userLikeId) {
      likeButton.classList.add("element__like-button_active");
    } else {
      likeButton.classList.remove("element__like-button_active");
    }
  });
  likeButton.addEventListener("click", (evt) => {
    putLikes(evt, cardId, cardElement);
  });
  if (userId === cardOwnerId) {
    removeButton.addEventListener("click", (evt) => {
      deleteUserCard(evt, cardId);
    });
  } else {
    removeButton.remove();
  }

  cardImage.addEventListener("click", function () {
    openPopup(zoomImagePopup);
    zoomCaption.textContent = cardName;
    zoomImage.src = cardImageSrc;
    zoomImage.alt = cardName;
  });
  return cardElement;
};

function fetchCard(element, user) {
  const cardElement = createCard(element, user);
  cardsContainer.prepend(cardElement);
}

function deleteUserCard(evt, cardId) {
  const targetElement = evt.currentTarget;
  const currentElementRemove = targetElement.closest(".element");
  if (evt.target.classList.contains("element__remove-button")) {
    deleteCard(cardId)
      .then((res) => {
        currentElementRemove.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function putLikes(evt, cardId, element) {
  const cardElement = element;
  const likeNumbers = cardElement.querySelector(".element__like-count");
  if (
    evt.target.classList.contains("element__like-button") &&
    evt.target.classList.contains("element__like-button_active")
  ) {
    deleteLike(cardId)
      .then((res) => {
        const likes = res.likes;
        evt.target.classList.remove("element__like-button_active");
        likeNumbers.textContent = likes.length;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    putLike(cardId)
      .then((res) => {
        const likes = res.likes;
        likeNumbers.textContent = likes.length;
        evt.target.classList.add("element__like-button_active");
      })
      .catch((res) => {
        console.log(res);
      });
  }
}

export { createCard, fetchCard };
