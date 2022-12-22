import {
  nameInput,
  aboutInput,
  popupEdit,
  popupAvatar,
  popupAdd,
  submitProfileEdit,
  submitToAddNewPlace,
} from "../main.js";
import { closePopup, loadRender } from "../componets/utils.js";
import { createNewCard, editAvatar, editProfileInfo } from "./api.js";
import { fetchCard } from "./card.js";

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__image");
const avatarFormInput = document.querySelector(".popup__avatar_url");
const name = document.querySelector(".popup__place_name");
const image = document.querySelector(".popup__place_url");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  loadRender(true, submitProfileEdit);
  editProfileInfo(nameInput, aboutInput)
    .then((res) => {
      console.log(res);
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((res) => {
      console.log(`Ошибка:${res.status}`);
    })
    .finally(() => {
      loadRender(false, submitProfileEdit);
    });
};

const handleNewPlaceFormSubmit = (evt) => {
  evt.preventDefault();
  loadRender(true, submitToAddNewPlace);
  const nameValue = name.value;
  const imageValue = image.value;
  createNewCard(nameValue, imageValue)
    .then((res) => {
      console.log(res);
      const currentUser = res.owner._id;
      const card = fetchCard(res, currentUser);
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      loadRender(false, submitToAddNewPlace);
    });
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  loadRender(true, submitToAddNewPlace);
  // profileAvatar.setAttribute("src", `${avatarFormInput.value}`);
  editAvatar(avatarFormInput)
    .then((res) => {
      profileAvatar.setAttribute("src", `${res.avatar}`);
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((res) => {
      console.log(`Ошибка:${res.status}`);
    })
    .finally(() => {
      loadRender(false, submitToAddNewPlace);
    });
};

export {
  handleProfileFormSubmit,
  handleAvatarFormSubmit,
  handleNewPlaceFormSubmit,
  profileName,
  profileAbout,
  profileAvatar,
};
