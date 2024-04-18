// Получение карточек и их вывод на страницу
import { getCards, deleteCard, likeCard, dislikeCard, getMyProfile } from "./api";
import { cardContainer } from "./constants.js";

export function renderCards(profile, handleImageClick) {
    getCards()
        .then(cards => {
            cards.forEach(card => {
                const cardElement = createCardElement(card, profile, handleImageClick);
                cardContainer.appendChild(cardElement);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
        });
}

export function createCardElement(cardData, profile, handleImageClick) {
    // Создание элемента карточки из шаблона
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);

    // Установка данных карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeButton.dataset.cardId = cardData._id; // Используем _id карточки
    likeCounter.textContent = cardData.likes.length;

    // Добавление обработчиков событий
    deleteButton.addEventListener('click', () => {
        // Проверяем, является ли пользователь владельцем карточки
        if (cardData.owner._id !== profile._id) {
            console.error('Нельзя удалять чужие карточки');
            return;
        }

        // Удаляем карточку из DOM
        const cardListItem = deleteButton.closest('.card');
        cardListItem.remove();

        // Получаем ID карточки из атрибута data-card-id кнопки лайка
        const cardId = likeButton.dataset.cardId;

        // Вызываем функцию удаления карточки
        deleteCard(cardId)
            .then(() => {
                console.log('Карточка успешно удалена');
            })
            .catch(error => {
                console.error('Ошибка при удалении карточки:', error);
            });
    });

    // Добавляем обработчик события для кнопки лайка
    likeButton.addEventListener('click', () => {
        // Получаем ID карточки из атрибута data-card-id кнопки лайка
        const cardId = likeButton.dataset.cardId;

        // Обработка лайка
        if (likeButton.classList.contains('card__like-button_is-active')) {
            dislikeCard(cardId)
                .then(response => {
                    likeButton.classList.remove('card__like-button_is-active');
                    likeCounter.textContent = response.likes.length;
                })
                .catch(error => {
                    console.error('Ошибка при дизлайке карточки:', error);
                });
        } else {
            likeCard(cardId)
                .then(response => {
                    likeButton.classList.add('card__like-button_is-active');
                    likeCounter.textContent = response.likes.length;
                })
                .catch(error => {
                    console.error('Ошибка при лайке карточки:', error);
                });
        }
    });

    // Добавляем обработчик события для клика по изображению карточки
    cardImage.addEventListener('click', () => {
        handleImageClick(cardData);
    });

    return cardElement;
}
