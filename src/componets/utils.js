const popups = document.querySelectorAll(".popup");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleKey);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
  document.addEventListener("keydown", handleKey);
}

function handleKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    console.log(openedPopup);
    closePopup(openedPopup);
  }
}

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

function loadRender(isLoading, button) {
  if (isLoading) {
    button.textContent = button.textContent + "...";
  } else {
    button.textContent = button.textContent + "...";
  }
}

export { closePopup, openPopup, handleKey, loadRender };
