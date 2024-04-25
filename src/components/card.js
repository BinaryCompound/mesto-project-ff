// Получение карточек и их вывод на страницу
import { getCards, getMyProfile } from "./api";
import { cardContainer } from "./constants.js";
import { deleteCard } from "./api";
import { likeCard, dislikeCard } from "./api";
import { openModal } from "./modal.js";
import {
    popupImage,
    popupImageElement,
    popupCaption, // предположим, что у вас есть функция, возвращающая идентификатор текущего пользователя
} from "./constants.js";

getMyProfile()
    .then(profile => {
        const userId = profile._id; // Получаем идентификатор текущего пользователя
        console.log('ID текущего пользователя:', userId);

        // Создаем элементы карточек после получения профиля
        renderCards(userId);
    })
    .catch(error => {
        console.error('Ошибка при получении профиля:', error);
    });

export async function renderCards() {
    try {
        const profile = await getMyProfile();
        const userId = profile._id; // Получаем идентификатор текущего пользователя
        console.log('ID текущего пользователя:', userId);

        const cards = await getCards();
        cards.forEach(card => {
            const cardElement = createCardElement(card, userId);
            cardContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Ошибка при загрузке профиля или карточек:', error);
    }
}

// Функция для создания элемента карточки
export function createCardElement(cardData, userId) {
    //Создание элемента карточки из шаблона
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

    // Проверяем, создал ли текущий пользователь эту карточку
    if (cardData.owner._id === userId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }


    // Добавление обработчиков событий
    deleteButton.addEventListener('click', () => {
        // Находим родительский элемент карточки (элемент списка)
        const cardListItem = deleteButton.closest('.card');

        // Проверяем, найден ли родительский элемент
        if (cardListItem) {
            // Удаляем карточку из DOM
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
        }
    });

    // Добавляем обработчик события для кнопки лайка
    likeButton.addEventListener('click', () => {
        // Получаем ID карточки из атрибута data-card-id кнопки лайка
        const cardId = likeButton.dataset.cardId;

        // Проверяем, был ли уже поставлен лайк
        if (likeButton.classList.contains('card__like-button_is-active')) {
            // Если был, то отправляем запрос на сервер для дизлайка карточки
            dislikeCard(cardId)
                .then(response => {
                    // Если запрос успешен, обновляем состояние кнопки и счетчика лайков
                    likeButton.classList.remove('card__like-button_is-active');
                    likeCounter.textContent = response.likes.length;
                })
                .catch(error => {
                    console.error('Ошибка при дизлайке карточки:', error);
                });
        } else {
            // Если лайка еще не было, то отправляем запрос на сервер для установки лайка
            likeCard(cardId)
                .then(response => {
                    // Если запрос успешен, обновляем состояние кнопки и счетчика лайков
                    likeButton.classList.add('card__like-button_is-active');
                    likeCounter.textContent = response.likes.length;
                })
                .catch(error => {
                    console.error('Ошибка при лайке карточки:', error);
                });
        }
    });

    // Функция для обработки события клика на изображение карточки
    function handleImageClick(imageSrc, imageName) {
        popupImageElement.src = imageSrc;
        popupImageElement.alt = imageName;
        popupCaption.textContent = imageName;
        openModal(popupImage);
    }

    // Добавляем обработчик события для клика на изображение карточки
    cardImage.addEventListener('click', () => {
        handleImageClick(cardData.link, cardData.name);
    });

    return cardElement;
}
