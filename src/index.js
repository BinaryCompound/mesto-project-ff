import './styles/index.css';
import { createCard, handleLike, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { editMyProfile } from './components/api.js';
import { handleLikeButtonClick } from './components/like.js';

// Глобальные переменные
const arkhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
const chelyabinskRegion = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
const kholmogoryDistrict = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

const initialCards = [
    { name: 'Архыз', link: arkhyz },
    { name: 'Челябинская область', link: chelyabinskRegion },
    { name: 'Иваново', link: ivanovo },
    { name: 'Камчатка', link: kamchatka },
    { name: 'Холмогорский район', link: kholmogoryDistrict },
    { name: 'Байкал', link: baikal },
];

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleStatic = profileName.textContent;
const profileDescriptionStatic = profileDescription.textContent;
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const cardContainer = document.querySelector('.places__list');
const popUpEditProfile = document.querySelector('.popup_type_edit');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = popUpEditProfile.querySelector('.popup__close');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = popUpAddCard.querySelector('.popup__close');
const formEditProfile = document.forms['edit_profile'];
const addCardForm = document.forms['new_place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');


// Function declarations
function addCardToContainer(cardElement) {
    cardContainer.prepend(cardElement);
}

function createAndAddCardToContainer(cardData) {
    const cardElement = createCard(cardData, handleLike, handleImageClick);
    addCardToContainer(cardElement);
    // Добавляем обработчик события на кнопку лайка для каждой созданной карточки
    cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeButtonClick);
}

function handleformEditProfileSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    closeModal(popUpEditProfile);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;
    const newCardData = {
        name: cardNameValue,
        link: new URL(cardLinkValue),
    };
    const cardElement = createCard(newCardData, handleLike, handleImageClick);
    addCardToContainer(cardElement);
    clearForm(addCardForm);
    closeModal(popUpAddCard);
}

function clearForm(form) {
    form.reset();
}

function openImagePopup(imageSrc, imageName) {
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageName;
    popupCaption.textContent = imageName;
    openModal(popupImage);
}

function handleImageClick(imageSrc, imageName) {
    openImagePopup(imageSrc, imageName);
}

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

// Слушатели событий
document.addEventListener('DOMContentLoaded', function () {

    enableValidation({
        formSelector: '.popup_type_edit .popup__form',
        inputSelector: '.popup_type_edit .popup__input',
        submitButtonSelector: '.popup_type_edit .popup__button',
        inputErrorClass: 'popup__input-error_active',
        popup__input_type_error: 'popup__input_type_error',
    });

    enableValidation({
        formSelector: '.popup_type_new-card .popup__form',
        inputSelector: '.popup_type_new-card .popup__input',
        submitButtonSelector: '.popup_type_new-card .popup__button',
        inputErrorClass: 'popup__input-error_active',
    });


    profileImage.addEventListener('click', () => {
        const editAvatarPopup = document.querySelector('.popup_type_new-avatar');
        openModal(editAvatarPopup);
    });

    buttonOpenPopupProfile.addEventListener('click', () => {
        openModal(popUpEditProfile);
        nameInput.value = profileTitleStatic;
        descriptionInput.value = profileDescriptionStatic;
    });

    buttonClosePopupProfile.addEventListener('click', () => closeModal(popUpEditProfile));
    buttonOpenAddCard.addEventListener('click', () => openModal(popUpAddCard));
    buttonCloseAddCard.addEventListener('click', () => closeModal(popUpAddCard));
    formEditProfile.addEventListener('submit', handleformEditProfileSubmit);
    addCardForm.addEventListener('submit', handleAddCardFormSubmit);

    setupModalWindows();

    initialCards.forEach(createAndAddCardToContainer);
});

document.querySelectorAll('.card__like-button').forEach((button) => {
    button.addEventListener('click', handleLikeButtonClick);
});

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    const saveButton = formEditProfile.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...'; // Изменение текста кнопки
    editMyProfile({ name: newName, about: newDescription })
        .then(() => {
            closeModal(popUpEditProfile);
        })
        .catch((err) => {
            console.error('Ошибка при сохранении профиля:', err);
        })
        .finally(() => {
            saveButton.textContent = 'Сохранить'; // Возврат исходного текста кнопки
        });
});

export function updateAvatar(avatarUrl) {
    // Здесь должен быть код отправки запроса на сервер
    // После успешного ответа от сервера обновляем аватар на странице
    const profileImage = document.querySelector('.profile__image');
    profileImage.src = avatarUrl;
}

// Функция для обработки отправки формы обновления аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = document.getElementById('avatar__input').value;
    updateAvatar(avatarUrl);
    closeModal(document.querySelector('.popup_type_new-avatar'));
}

// Функция для открытия модального окна обновления аватара
export function openAvatarModal() {
    const modalWindow = document.querySelector('.popup_type_new-avatar');
    openModal(modalWindow);
}

// Функция для закрытия модального окна обновления аватара
export function closeAvatarModal() {
    const modalWindow = document.querySelector('.popup_type_new-avatar');
    closeModal(modalWindow);
}

// Обработчики событий

document.addEventListener('DOMContentLoaded', function () {
    const avatarForm = document.forms['edit_avatar'];

    // Добавляем обработчик отправки формы
    if (avatarForm) {
        avatarForm.addEventListener('submit', handleAvatarFormSubmit);
    }

    // Включаем валидацию для формы обновления аватара
    enableValidation({
        formSelector: '.popup_type_new-avatar .popup__form',
        inputSelector: '.popup_type_new-avatar .popup__input',
        submitButtonSelector: '.popup_type_new-avatar .popup__button',
        inputErrorClass: 'popup__input-error_active',
    });
});