import {
  nameInput,
  jobInput,
  profileName,
  profileAbout,
  popupEdit,
} from "../index.js";
import { closePopup } from "../componets/utils.js";

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = jobValue;
  closePopup(popupEdit);
  evt.target.reset();
}

export { handleProfileFormSubmit };
