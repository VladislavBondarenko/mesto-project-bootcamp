import { openPopup } from "../componets/utils.js";
import { cardsContainer } from "../main.js";
import { deleteCard, deleteLike, fetchCards, putLike } from "./api.js";

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
  const likeNumber = cardElement.querySelector(".element__like-count");
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
    removeButton.setAttribute("id", cardId);
    cardElement.addEventListener("click", (evt) => {
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

// const renderCards = (imageValue, titleValue) => {
//   const likeNumbers = document.querySelector(".element__like-count");
//   likeNumbers.textContent = "0";
//   const cardElement = createCard(imageValue, titleValue, likeNumbers);
//   cardsContainer.prepend(cardElement);
// };

// fetchCards().then((elements) => {
//   console.log(elements);
//   elements.forEach((element) => {
//     const cardElement = createCard(element.link, element.name, element.likes);
//     const removeButton = cardElement.querySelector(".element__remove-button");
//     if (element["owner"]["_id"] !== "5d05e97582a44e0e5de2165a") {
//       removeButton.remove();
//     }
//     cardElement.addEventListener("click", (evt) => {
//       if (
//         evt.target.classList.contains("element__remove-button") &&
//         element["owner"]["_id"] === "5d05e97582a44e0e5de2165a"
//       ) {
//         evt.currentTarget.remove();
//         deleteCard(element["_id"]);
//       }
//     });
//     const likeNumber = cardElement.querySelector(".element__like-coun");
//     cardElement.addEventListener("click", (evt) => {
//       if (evt.target.classList.contains("element__like-button")) {
//         if (evt.target.classList.contains("element__like-button_active")) {
//           deleteLike(element["_id"]);
//           evt.target.classList.remove("element__like-button_active");
//           likeNumber.textContent--;
//         } else {
//           evt.target.classList.add("element__like-button_active");
//           putLike(element["_id"]);
//           likeNumber.textContent++;
//         }
//       }
//     });
//     cardsContainer.append(cardElement);
//   });
// });

function deleteUserCard(evt, cardId) {
  if (
    evt.target.classList.contains("element__remove-button") &&
    cardId === evt.target.getAttribute("id")
  ) {
    deleteCard(cardId).catch((res) => {
      console.log(res);
      evt.currentTarget.remove();
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
    evt.target.classList.remove("element__like-button_active");
    deleteLike(cardId)
      .then((res) => {
        console.log(res);
        likeNumbers.textContent--;
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    evt.target.classList.add("element__like-button_active");
    putLike(cardId)
      .then((res) => {
        console.log(res);
        likeNumbers.textContent++;
      })
      .catch((res) => {
        console.log(res);
      });
  }
}

// function fetchLikeButton(likeNumber, button, cardId) {
//   if (button.classList.contains("element__like-button_active")) {
//     deleteLike(cardId)
//       .then((res) => {
//         likeNumber.textContent = res.likes.length;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } else {
//     putLike(cardId)
//       .then((res) => {
//         likeNumber.textContent = res.likes.length;
//         button.classList.add("element__like-button_active");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

export { createCard, fetchCard };
