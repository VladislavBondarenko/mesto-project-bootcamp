function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__field_type_error");
  errorElement.classList.add("popup__field-error_active");
  errorElement.textContent = errorMessage;
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__field_type_error");
  errorElement.classList.remove("popup__field-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__submit-button_disabled");
    buttonElement.disabled = false;
  }
}

function setEventlisteners(inputList, buttonElement) {
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__field"));
    const buttonElement = formElement.querySelector(".popup__submit-button");
    formElement.addEventListener("submit", function () {
      toggleButtonState(inputList, buttonElement);
    });
    setEventlisteners(inputList, buttonElement);
  });
}

export { enableValidation };
