import { enableValidation } from "./componets/validate.js";
import {
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  handleNewPlaceFormSubmit,
  profileAbout,
  profileAvatar,
  profileName,
} from "./componets/modal.js";
import { openPopup } from "./componets/utils.js";
import { fetchCard } from "./componets/card.js";
import "./pages/index.css";
import { fetchCards, fetchProfileInfo } from "./componets/api.js";
import { Promise } from "core-js";

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const addButton = document.querySelector(".profile__add-button");
const formProfile = document.querySelector(".popup__form_profile-edit");
const nameInput = document.querySelector(".popup__field_name");
const aboutInput = document.querySelector(".popup__field_about");
const popupAdd = document.querySelector(".popup_add-card");
const formAddNewPlace = document.querySelector("#formAddNewPlace");
const submitProfileEdit = document.querySelector(".popup__submit-button_edit");
const submitToAddNewPlace = document.querySelector(".popup__submit-button_add");
const buttonAvatar = document.querySelector(".profile__avatar-edit-button");
const popupAvatar = document.querySelector(".popup_add-avatar");
const submitAvatar = document.querySelector(".popup__submit-button-avatar_add");

const cardsContainer = document.querySelector(".elements");

const userInfo = fetchProfileInfo();
const cardsInfo = fetchCards();

Promise.all([userInfo, cardsInfo])
  .then((array) => {
    const user = array[0];
    const userAvatar = user.avatar;
    const userName = user.name;
    const userAbout = user.about;
    const userId = user._id;

    profileAvatar.setAttribute("src", userAvatar);
    profileName.textContent = userName;
    profileAbout.textContent = userAbout;

    const initialCards = array[1];
    initialCards.reverse().forEach((element) => {
      const currentCard = element;
      const card = fetchCard(currentCard, userId);
    });
  })
  .catch((error) => {
    console.log(error);
  });

enableValidation({
  inputSelector: ".popup__field",
  submitButton: ".popup__submit-button",
  formSelector: ".popup__form",
  inputErrorClass: "popup__field_type_error",
  textErrorClass: "popup__field-error_active",
  submitButtonDisabled: "popup__submit-button_disabled",
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

formProfile.addEventListener("submit", handleProfileFormSubmit);

formAddNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);

buttonAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
});

submitAvatar.addEventListener("click", handleAvatarFormSubmit);

export {
  nameInput,
  aboutInput,
  popupEdit,
  formAddNewPlace,
  popupAvatar,
  popupAdd,
  cardsContainer,
  submitProfileEdit,
  submitToAddNewPlace,
};
