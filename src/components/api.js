import { checkResponse } from './utils';

// Конфигурация для запросов к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
    headers: {
        authorization: 'a6c324f3-515d-4107-9910-fdcad5920d1c',
        'Content-Type': 'application/json'
    }
};

// Получение профиля пользователя
async function getMyProfile() {
    const response = await fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    });
    return checkResponse(response);
};

// Получение списка карточек
async function getCards() {
    const response = await fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    });
    return checkResponse(response);
};

// Обновление аватара пользователя
async function updateAvatar(avatar) {
    const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar
        })
    });
    return checkResponse(response);
};

// Редактирование профиля пользователя
async function editMyProfile({ name, about }) {
    const response = await fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about
        })
    });
    return checkResponse(response);
};

// Добавление новой карточки
async function addNewCard({ name, link }) {
    const response = await fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            ...config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            link
        })
    });
    return checkResponse(response);
};

// Удаление карточки
async function deleteCard(cardId) {
    const response = await fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
    return checkResponse(response);
};

// Постановка лайка на карточку
async function likeCard(cardId) {
    const response = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });
    return checkResponse(response);
};

// Снятие лайка с карточки
async function dislikeCard(cardId) {
    const response = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
    return checkResponse(response);
};

// Загрузка начальных карточек
async function fetchInitialCards() {
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
    fetchInitialCards
};
