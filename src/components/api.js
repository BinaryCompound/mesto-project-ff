import { checkResponse } from './utils';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'a6c324f3-515d-4107-9910-fdcad5920d1c',
    'Content-Type': 'application/json'
  }
};

function getMyProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse) // Проверяем ответ
};
      
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)// Проверяем ответ
};

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar
    })
  })
    .then(checkResponse);
};

function editMyProfile({ name, about }) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(checkResponse)
};

function addNewCard({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(checkResponse)
};

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse) // Проверяем ответ
};

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse) // Проверяем ответ
};

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse) // Проверяем ответ
};

function loadInitialCards() {
  return getCards();
};

export {
  getMyProfile,
  getCards,
  updateAvatar,
  editMyProfile,
  addNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
  loadInitialCards
};