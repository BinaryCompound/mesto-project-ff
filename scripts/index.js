// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content; // Получаем доступ ко всему содержимому template

// @todo: DOM узлы
let cardContainer = document.querySelector('.places__list'); // Получаем доступ к списку(контейнеру), куда нужно поместить карточки

// @todo: Функция создания карточки
function createCard(cardData, deleteCardHandler) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true); // Клонируем шаблон карточки

    // Заполняем шаблон переданными данными карточки
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.altText;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    // Получаем доступ к кнопке удаления на карточке
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // Добавляем слушатель события на кнопку удаления
    deleteButton.addEventListener('click', () => cardElement.remove());

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Использование createCard в цикле для добавления карточек в DOM
initialCards.forEach(function (cardData) {
    const altText = "";
    const card = createCard(cardData, deleteCard, altText);

    // Добавляем карточку в DOM
    cardContainer.append(card);
});

