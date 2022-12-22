const popups = document.querySelectorAll(".popup");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKey);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleKey);
}

function handleKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    console.log(openedPopup);
    closePopup(openedPopup);
  }
}

// function closePopupByOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     closePopup(evt);
//   }
// }

// popups.forEach(function (popup) {
//   popup.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("popup__close-button")) {
//       closePopup(popup);
//     }
//   });
// });

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

function loadRender(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}

export { closePopup, openPopup, handleKey, loadRender };
