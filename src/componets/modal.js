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
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  loadRender(true, submitProfileEdit);
  editProfileInfo(profileName, profileAbout)
    .catch((res) => {
      console.log(`Ошибка:${res.status}`);
    })
    .finally(() => {
      closePopup(popupEdit);
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
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      closePopup(popupAdd);
      loadRender(false, submitToAddNewPlace);
    });
  evt.target.reset();
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  loadRender(true, submitToAddNewPlace);
  profileAvatar.setAttribute("src", `${avatarFormInput.value}`);
  editAvatar(profileAvatar.getAttribute("src"))
    .catch((res) => {
      console.log(`Ошибка:${res.status}`);
    })
    .finally(() => {
      closePopup(popupAvatar);
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
