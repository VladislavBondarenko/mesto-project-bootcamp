import { createCard, cardInfo } from "../index.js";

function render() {
  cardInfo.forEach(createCard);
}

export { render };
