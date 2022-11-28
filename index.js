const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const popups = document.querySelectorAll(".popup");
const closeButton = document.querySelectorAll(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
const formProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__field_name");
const jobInput = document.querySelector(".popup__field_about");
const submitEdit = document.querySelector(".popup__submit-button_edit");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupAdd = document.querySelector(".popup_add-card");
const submitAdd = document.querySelector(".popup__submit-button_add");
const likeButtons = document.querySelectorAll(".element__like-button");
const formAddNewPlace = document.querySelector("#formAddNewPlace");
const element = document.querySelectorAll("element__like-button");
const zoomImagePopup = document.querySelector(".popup_zoom_image");
const zoomImage = document.querySelector(".element__image");

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

function render() {
  cardInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  console.log(name, link);
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = name;
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__title").textContent = name;
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
    zoomImagePopup.classList.add("popup_opened");
    const zoomCaption = document.querySelector(".popup__caption");
    const zoomImage = document.querySelector(".popup__image");
    zoomCaption.textContent = name;
    zoomImage.src = link;
    zoomImage.alt = name;
  });
  cardsContainer.prepend(cardElement);
}
render();

addButton.addEventListener("click", function () {
  popupAdd.classList.toggle("popup_opened");
});

editButton.addEventListener("click", function () {
  popupEdit.classList.toggle("popup_opened");
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close-button")) {
      popup.classList.toggle("popup_opened");
    }
  });
});

function formSubmitEdit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = jobValue;
  popups[0].classList.remove("popup_opened");
}

formProfile.addEventListener("submit", formSubmitEdit);

formAddNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const name = document.querySelector(".popup__place_name");
  const image = document.querySelector(".popup__place_url");
  const nameValue = name.value;
  const imageValue = image.value;
  renderCard({ name: nameValue, link: imageValue });
  popupAdd.classList.remove("popup_opened");
});
