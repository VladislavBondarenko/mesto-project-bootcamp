import { enableValidation } from "../src/componets/validate.js";
import { handleProfileFormSubmit } from "./componets/modal.js";
import { openPopup, closePopup, keyHandle } from "./componets/utils.js";
import { render } from "./componets/card.js";

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const popups = document.querySelectorAll(".popup");
const addButton = document.querySelector(".profile__add-button");
const formProfile = document.querySelector(".popup__form_profile-edit");
const nameInput = document.querySelector(".popup__field_name");
const jobInput = document.querySelector(".popup__field_about");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupAdd = document.querySelector(".popup_add-card");
const formAddNewPlace = document.querySelector("#formAddNewPlace");
const name = document.querySelector(".popup__place_name");
const image = document.querySelector(".popup__place_url");
const zoomImagePopup = document.querySelector(".popup_zoom_image");
const zoomCaption = document.querySelector(".popup__caption");
const zoomImage = document.querySelector(".popup__image");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".card-template").content;
const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__title").alt = name;
  const image = cardElement.querySelector(".element__image");
  image.src = link;
  image.alt = name;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });
  const removeButton = cardElement.querySelector(".element__remove-button");
  removeButton.addEventListener("click", function () {
    cardElement.remove();
  });
  image.addEventListener("click", function () {
    openPopup(zoomImagePopup);
    zoomCaption.textContent = name;
    zoomImage.src = link;
    zoomImage.alt = name;
  });
  cardsContainer.prepend(cardElement);
}

render();

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close-button")) {
      popup.classList.toggle("popup_opened");
    }
  });
});

formProfile.addEventListener("submit", handleProfileFormSubmit);

formAddNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const nameValue = name.value;
  const imageValue = image.value;
  createCard({ name: nameValue, link: imageValue });
  closePopup(popupAdd);
  evt.target.reset();
});

enableValidation();

popups.forEach((popup) => {
  document.body.addEventListener("keyup", (evt) => keyHandle(evt, popup));
});

export {
  createCard,
  cardInfo,
  nameInput,
  jobInput,
  profileName,
  profileAbout,
  popupEdit,
  formAddNewPlace,
};
