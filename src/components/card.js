export function createCard(cardData, likeHandler, imageClickHandler) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link.href;
    cardImage.alt = cardData.name;
    cardImage.addEventListener('click', function () {
        imageClickHandler(cardData.link.href, cardData.name);
    });

    cardElement.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function () {
        likeHandler(likeButton);
    });

    return cardElement;
}

// Функция для обработки события лайка
export function handleLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// Функция для обработки события удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

