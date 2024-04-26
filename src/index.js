// Импорт стилей и компонентов
import './styles/index.css';
import { renderCards, createCardElement } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation } from './components/validation.js';
import { openAvatarModal, handleAvatarFormSubmit, closeAvatarModal } from './components/avatar.js';
import {
    nameInput,
    descriptionInput,
    profileName,
    profileDescription,
    profileTitleStatic,
    profileDescriptionStatic,
    cardContainer,
    popUpEditProfile,
    buttonOpenPopupProfile,
    popUpAddCard,
    buttonOpenAddCard,
    formEditProfile,
    addCardForm,
    cardNameInput,
    cardLinkInput,
    profileImage,
    profileDialog
} from './components/constants.js';

import {
    editMyProfile,
    addNewCard,
    getMyProfile,
    getCards
} from './components/api.js'

// Общая функция для обработки формы и закрытия модального окна
function handleFormSubmit(form, handleSubmit, closeModalCallback) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        handleSubmit(evt);
        closeModalCallback();
    });
}

// Очищает содержимое полей в форме
function clearForm(form) {
    const inputFields = form.querySelectorAll('input');
    inputFields.forEach(input => {
        input.value = ''; // Очищаем значение поля ввода
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

// Функция для обработки отправки формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    // Вызываем функцию editMyProfile для отправки данных на сервер
    editMyProfile({ name: newName, about: newDescription })
        .then((data) => {
            // Если запрос успешен, сохраняем данные профиля в localStorage
            saveProfileDataLocally(data);
            // Обновляем данные профиля на странице
            updateProfileData(data);
            clearForm(editMyProfileForm); // Очищаем форму после успешного сохранения
        })
        .catch((err) => {
            console.error('Ошибка при сохранении профиля:', err);
        });
}

// Функция для сохранения данных профиля в localStorage
function saveProfileDataLocally(data) {
    localStorage.setItem('profileData', JSON.stringify(data));
}

// Функция для обновления данных профиля на странице
function updateProfileData(data) {
    // Обновляем данные профиля на странице
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
}

// Функция для загрузки данных профиля при загрузке страницы
function loadProfileData() {
    const storedData = localStorage.getItem('profileData');
    if (storedData) {
        const data = JSON.parse(storedData);
        updateProfileData(data);
        // Заполняем значения инпутов данными из сервера
        nameInput.value = data.name;
        descriptionInput.value = data.about;
    }
}

// Вызываем функцию загрузки данных профиля при загрузке страницы
loadProfileData();


// Функция для добавления карточки в контейнер
function addCardToContainer(cardElement) {
    cardContainer.prepend(cardElement);
}

// Функция для создания и добавления карточки в контейнер

function createAndAddCardToContainer(cardData) {
    const cardElement = createCardElement(cardData);
    addCardToContainer(cardElement);
}

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
document.addEventListener('DOMContentLoaded', async () => {

    try {
        const [profile, cards] = await Promise.all([getMyProfile(), getCards()]);
        const userId = profile._id;
        renderCards(cards, userId);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});

// Обработчик открытия формы редактирования профиля
buttonOpenPopupProfile.addEventListener('click', async () => {
    try {
        const profile = await getMyProfile();
        openModal(popUpEditProfile);
        formEditProfile.elements['user_name'].value = profile.name;
        formEditProfile.elements['user_about'].value = profile.about;
    } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
    }
});

// Обработчик открытия формы добавления карточки
buttonOpenAddCard.addEventListener('click', () => openModal(popUpAddCard));

// Обработчик закрытия модального окна при клике на оверлей или кнопку закрытия
document.querySelectorAll('.popup').forEach(modal => {
    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.classList.contains('popup__close')) {
            closeModal(modal);
        }
    });
});

// Обработчик открытия модального окна смены аватара
profileImage.addEventListener('click', () => openModal(profileDialog));

    renderCards();

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
