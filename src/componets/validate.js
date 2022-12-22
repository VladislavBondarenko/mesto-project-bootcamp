function showInputError(formElement, inputElement, errorMessage, data) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.classList.add(data.textErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, data) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.textErrorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, data) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      data
    );
  } else {
    hideInputError(formElement, inputElement, data);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, data) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(data.submitButtonDisabled);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(data.submitButtonDisabled);
    buttonElement.disabled = false;
  }
}

function setEventlisteners(formElement, data) {
  const inputList = Array.from(
    formElement.querySelectorAll(data.inputSelector)
  );
  const buttonElement = formElement.querySelector(data.submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, buttonElement, data);
    });
  });
  toggleButtonState(inputList, buttonElement, data);
}

function enableValidation(data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventlisteners(formElement, data);
  });
}

export { enableValidation };
