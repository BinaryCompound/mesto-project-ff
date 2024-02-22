// @todo: Темплейт карточки
const templateCard = document.querySelector('#card-template').content; //получил доступ ко всему содержимого template
// @todo: DOM узлы
let cardContainer = document.querySelector('.places__list');//получение доступа к списку(контейнеру), куда надо поместить карточки

// @todo: Функция создания карточки
initialCards.forEach(function (cardData) {
    const cardElement = templateCard.querySelector('.places__item').cloneNode(true); //клонируем шаблон карточки
    //заполняем шаблон переданным объектом
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    //получаем доступ к кнопке удаления на карточке
    const deleteButton = cardElement.querySelector('.card__delete-button');
    //добавляем слушатель события на кнопку удаления
    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement);
    });

    cardContainer.append(cardElement);

});

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    cardElement.remove(); // Удаляем переданный элемент карточки из DOM
}