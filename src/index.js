import './styles/index.css';
import { createCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { openAvatarModal, handleAvatarFormSubmit, closeAvatarModal } from './components/avatar.js';
import { handleLikeButtonClick } from './components/like.js';
import {
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
    profileTitleStatic,
    profileDescriptionStatic,
    popupImage,
    popupImageElement,
    popupCaption,
    cardContainer,
    popUpEditProfile,
    buttonOpenPopupProfile,
    buttonClosePopupProfile,
    popUpAddCard,
    buttonOpenAddCard,
    buttonCloseAddCard,
    formEditProfile,
    addCardForm,
    cardNameInput,
    cardLinkInput,
    profileImage,
    photoButton,
    profileDialog
} from './components/constants.js';


import {
    getMyProfile,
    getCards,
    updateAvatar,
    editMyProfile,
    addNewCard,
    deleteCard,
    likeCard,
    dislikeCard,
    loadInitialCards
} from './components/api.js'

// Общая функция для обработки формы и закрытия модального окна
function handleFormSubmit(form, handleSubmit, closeModalCallback) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        handleSubmit(evt);
        closeModalCallback();
    });
}

// Функция для обработки отправки формы добавления карточки
function handleAddCardFormSubmit() {
    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;
    addNewCard({ name: cardNameValue, link: cardLinkValue })
        .then((newCard) => {
            createAndAddCardToContainer(newCard);
            clearForm(addCardForm);
            closeModal(popUpAddCard);
        })
        .catch((err) => {
            console.error('Ошибка при добавлении карточки:', err);
        });
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    editMyProfile({ name: newName, about: newDescription })
        .catch((err) => {
            console.error('Ошибка при сохранении профиля:', err);
        });
}

// Функция для очистки формы
function clearForm(form) {
    form.reset();
}

window.addEventListener('load', function () {
    getMyProfile()
      .then(function (profile) {
        if (profile) {
          updateProfileOnPage(profile);
        }
      })
      .catch(function (error) {
        console.error('Ошибка при загрузке профиля:', error);
      });
  });
  
  function updateProfileOnPage(profile) {
    const nameElement = document.querySelector('.profile__title');
    const descriptionElement = document.querySelector('.profile__description');
  
    if (nameElement && descriptionElement) {
      nameElement.textContent = profile.name;
      descriptionElement.textContent = profile.description;
    }
  }
// Функция для добавления карточки в контейнер
function addCardToContainer(cardElement) {
    cardContainer.prepend(cardElement);
}

// Функция для создания и добавления карточки в контейнер
function createAndAddCardToContainer(cardData) {
    const cardElement = createCard(cardData, handleLike, handleImageClick);
    addCardToContainer(cardElement);
    // Добавляем обработчик события на кнопку лайка для каждой созданной карточки
    cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeButtonClick);
}

// Функция для обработки события клика на изображение карточки
function handleImageClick(imageSrc, imageName) {
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageName;
    popupCaption.textContent = imageName;
    openModal(popupImage);
}

function updateCardsOnPage(cards) {
    cards.forEach(cardData => {
        createAndAddCardToContainer(cardData);
    });
}

window.addEventListener('load', function () {
    getCards()
        .then(function (cards) {
            if (cards) {
                updateCardsOnPage(cards);
            }
        })
        .catch(function (error) {
            console.error('Ошибка при загрузке карточек:', error);
        });
});

// Добавление слушателя для кнопки открытия формы добавления карточки
buttonOpenAddCard.addEventListener('click', () => openModal(popUpAddCard));

// Добавление слушателя события для формы добавления карточки
handleFormSubmit(addCardForm, handleAddCardFormSubmit, () => closeModal(popUpAddCard));

// Добавление слушателя для кнопки открытия формы редактирования профиля
buttonOpenPopupProfile.addEventListener('click', () => {
    openModal(popUpEditProfile);
    nameInput.value = profileTitleStatic;
    descriptionInput.value = profileDescriptionStatic;
});

// Добавление слушателя для формы редактирования профиля
handleFormSubmit(formEditProfile, handleFormEditProfileSubmit, () => closeModal(popUpEditProfile));

// Добавление слушателя для кнопки открытия формы обновления аватара
profileImage.addEventListener('click', openAvatarModal);

// Добавление слушателя для формы обновления аватара
handleFormSubmit(document.forms['edit_avatar'], handleAvatarFormSubmit, closeAvatarModal);

// Функция для настройки модальных окон
function setupModalWindows() {
    const modalWindows = document.querySelectorAll('.popup');
    modalWindows.forEach(modal => {
        const openButtons = document.querySelectorAll(`[data-modal-target="${modal.id}"]`);
        const closeButtons = modal.querySelectorAll('.popup__close');
        openButtons.forEach(button => {
            button.addEventListener('click', () => openModal(modal));
        });
        closeButtons.forEach(button => {
            button.addEventListener('click', () => closeModal(modal));
        });
        modal.addEventListener('click', event => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

// Добавление слушателей событий при загрузке DOM
document.addEventListener('DOMContentLoaded', function () {

    // Включение валидации для форм
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inputErrorClass: 'popup__input-error_active',
        popup__input_type_error: 'popup__input_type_error',
    });

    // Добавление слушателей для открытия/закрытия модальных окон
    setupModalWindows();
});
