import { likeCard } from './api.js';

// Функция для обновления счетчика лайков на карточке
export function updateLikesCounter(cardElement, likes) {
  const likeCounter = cardElement.querySelector('.card__like-counter');
  likeCounter.textContent = likes.length;
}

// Функция для добавления лайка на карточку
export function handleLikeButtonClick(event) {
  const likeButton = event.target;
  const cardElement = likeButton.closest('.places__item');
  const cardId = cardElement.dataset.cardId; // Предположим, что у вас есть атрибут data-card-id на карточке, содержащий ее идентификатор
  const isLiked = likeButton.classList.contains('card__like-button_liked');

  // Если карточка уже была лайкнута, то убираем лайк
  if (isLiked) {
    likeButton.classList.remove('card__like-button_liked');
    likeCard(cardId)
      .then((data) => {
        updateLikesCounter(cardElement, data.likes);
      })
      .catch((err) => {
        console.error('Ошибка при удалении лайка:', err);
      });
  } else {
    likeButton.classList.add('card__like-button_liked');
    likeCard(cardId)
      .then((data) => {
        updateLikesCounter(cardElement, data.likes);
      })
      .catch((err) => {
        console.error('Ошибка при добавлении лайка:', err);
      });
  }
}