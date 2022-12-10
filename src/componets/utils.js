function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
}

function keyHandle(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

export { closePopup, openPopup, keyHandle };
