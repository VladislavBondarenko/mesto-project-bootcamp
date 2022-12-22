const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wbf-cohort-3",
  headers: {
    authorization: "f8f99adf-83a7-40fe-9367-92f0198372b4",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}}`);
}

const fetchCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const createNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const editProfileInfo = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: `${name.value}`,
      about: `${about.value}`,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const fetchProfileInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then((res) => {
    console.log(res);
    return handleResponse(res);
  });
};

const deleteCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const putLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const deleteLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

const editAvatar = (linkAvatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: `${linkAvatar.value}`,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

export {
  fetchCards,
  createNewCard,
  editProfileInfo,
  fetchProfileInfo,
  deleteCard,
  putLike,
  deleteLike,
  editAvatar,
};
