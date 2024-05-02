import { getCards, getMyProfile } from "./api.js";
import { cardContainer } from "./constants.js";
import { likeCard, dislikeCard, deleteCard } from "./api.js";
import { handleImageClick } from "../index.js";

export async function renderCards() {
    try {
        const profile = await getMyProfile();
        const userId = profile._id;

        const cards = await getCards();
        cards.forEach(card => {
            const cardElement = createCardElement(card, userId, handleImageClick);
            cardContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке профиля или карточек:', error.message);
    }
}

 function createCardElement(cardData, userId, handleImageClick) { // Добавлен аргумент handleImageClick
    const template = document.querySelector('#card-template');
    if (!template) {
        console.error('Шаблон карточки не найден');
        return null;
    }

    const cardElement = template.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    deleteButton.dataset.cardId = cardData._id;
    likeButton.dataset.cardId = cardData._id;
    likeCounter.textContent = cardData.likes.length;

    const isCurrentUserCard = cardData.owner._id === userId;
    deleteButton.style.display = isCurrentUserCard ? 'block' : 'none';

    deleteButton.addEventListener('click', () => handleDeleteButtonClick(deleteButton, cardData._id));
    likeButton.addEventListener('click', () => handleLikeButtonClick(likeButton, likeCounter, cardData._id));
    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    return cardElement;
}

async function handleDeleteButtonClick(deleteButton, cardId) {
    try {
        const cardListItem = deleteButton.closest('.card');
        await deleteCard(cardId);
        cardListItem.remove();
    } catch (error) {
        console.error('Ошибка при удалении карточки:', error.message);
    }
}

async function handleLikeButtonClick(likeButton, likeCounter, cardId) {
    try {
        const response = likeButton.classList.contains('card__like-button_is-active') ?
            await dislikeCard(cardId) :
            await likeCard(cardId);

        likeButton.classList.toggle('card__like-button_is-active');
        likeCounter.textContent = response.likes.length;
    } catch (error) {
        console.error('Ошибка при обработке лайка/дизлайка карточки:', error.message);
    }
}
