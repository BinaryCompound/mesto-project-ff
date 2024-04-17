import { likeCard } from './api.js';
import { likeCounters } from "./constants.js";

// Функция для обновления счетчика лайков на карточке
export function updateLikesCounter(cardElement, likesCount) {
    const likeCounter = cardElement.querySelector('.card__like-counter');
    likeCounter.textContent = likesCount;
}

// Функция для добавления лайка на карточку
export function handleLikeButtonClick(event) {
    const likeButton = event.target;
    const cardElement = likeButton.closest('.places__item');
    const cardId = cardElement.dataset.cardId;
    const isLiked = likeButton.classList.contains('card__like-button_liked');

    // Если карточка уже была лайкнута, то убираем лайк
    if (isLiked) {
        likeButton.classList.remove('card__like-button_liked');
        likeCard(cardId)
            .then((data) => {
                updateLikesCounter(cardElement, data.likesCount);
            })
            .catch((err) => {
                console.error('Ошибка при удалении лайка:', err);
            });
    } else {
        likeButton.classList.add('card__like-button_liked');
        likeCard(cardId)
            .then((data) => {
                updateLikesCounter(cardElement, data.likesCount);
            })
            .catch((err) => {
                console.error('Ошибка при добавлении лайка:', err);
            });
    }
}

likeCounters.forEach((counter) => {
    // Получаем текущую карточку
    const cardElement = counter.closest('.places__item');

    // Получаем массив пользователей, лайкнувших текущую карточку
    const likes = cardElement.likes || [];

    // Устанавливаем текст счетчика лайков равным количеству лайков
    counter.textContent = likes.length.toString();
});
