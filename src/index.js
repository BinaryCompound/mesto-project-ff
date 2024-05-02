// Импорт стилей и компонентов
import './styles/index.css';
import { renderCards } from './components/card.js';
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
    profileDialog,
    popupImage,
    popupImageElement,
    popupCaption
} from './components/constants.js';

import {
    editMyProfile,
    addNewCard,
    getMyProfile,
    getCards,
    deleteCard,
    likeCard,
    dislikeCard
} from './components/api.js';

// Общая функция для обработки формы с возможностью закрытия модального окна
function handleFormSubmit(form, handleSubmit, closeModal) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        handleSubmit(evt, closeModal); // Передаем функцию закрытия модального окна
    });
}

// Функция для очистки содержимого полей в форме
export function clearForm(form) {
    const inputFields = form.querySelectorAll('input');
    inputFields.forEach(input => {
        input.value = ''; // Очищаем значение поля ввода
    });
}

// Функция для обновления данных профиля на странице
function updateProfileData(data) {
    // Обновляем данные профиля на странице
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
}

// Функция для загрузки данных профиля из localStorage
function loadProfileDataFromLocalStorage() {
    const userProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (userProfileData) {
        updateProfileData(userProfileData);
    }
}

// Функция для сохранения данных профиля в localStorage
function saveProfileDataLocally(data) {
    localStorage.setItem('profileData', JSON.stringify(data));
}

// Функция для загрузки данных профиля при загрузке страницы
async function loadProfileData() {
    try {
        const userProfileData = await getMyProfile();
        return userProfileData;
    } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        throw error; // Передать ошибку для обработки в вызывающем коде
    }
}

// Обработчик открытия формы редактирования профиля
buttonOpenPopupProfile.addEventListener('click', async () => {
    openModal(popUpEditProfile);
    try {
        const userProfileData = await loadProfileData();
        // Сохраняем данные в localStorage только при первой загрузке
        saveProfileDataLocally(userProfileData);
        updateProfileData(userProfileData);
    } catch (error) {
        console.error('Данные профиля не загружены:', error);
    }
});

// Обработчик отправки формы редактирования профиля
async function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    try {
        const data = await editMyProfile({ name: newName, about: newDescription });
        saveProfileDataLocally(data);
        updateProfileData(data);
        clearForm(formEditProfile);
        closeModal(popUpEditProfile);
    } catch (error) {
        console.error('Ошибка при сохранении профиля:', error);
    }
}

export function handleImageClick(imageSrc, imageName) {
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageName;
    popupCaption.textContent = imageName;
    openModal(popupImage);
}

// Вызываем функцию загрузки данных профиля при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const profile = await getMyProfile();
        const userId = profile._id;
        let cards;

        // Проверяем, есть ли данные в localStorage
        const storedProfileData = localStorage.getItem('profileData');
        if (storedProfileData) {
            // Если данные есть, используем их
            const userProfileData = JSON.parse(storedProfileData);
            updateProfileData(userProfileData);
            cards = await getCards();
        } else {
            // Если данных нет, просто загружаем карточки
            cards = await getCards();
        }

        renderCards(cards, userId, handleImageClick);
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});

// Добавление слушателя для кнопки открытия формы добавления карточки
buttonOpenAddCard.addEventListener('click', () => openModal(popUpAddCard));

// Добавление слушателя для формы добавления карточки
async function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const addCardButton = addCardForm.querySelector('.popup__button');
    addCardButton.textContent = 'Сохранение...';
    try {
        const data = await addNewCard({ name: cardName, link: cardLink });

        // После успешного добавления карточки, рендерим её и вставляем в разметку
        renderCards(data);

        // Очищаем поля формы
        clearForm(addCardForm);

        // Закрываем модальное окно
        closeModal(popUpAddCard);
    } catch (error) {
        console.error('Ошибка при добавлении карточки:', error);
    } finally {
        addCardButton.textContent = 'Создать';
    }
}

// Добавление слушателя для формы добавления карточки
handleFormSubmit(addCardForm, handleAddCardFormSubmit, () => closeModal(popUpAddCard));

// Добавление слушателя для открытия формы обновления аватара
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

// Добавление слушателей для открытия/закрытия модальных окон
setupModalWindows();

// Включение валидации для форм
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input-error_active',
    popup__input_type_error: 'popup__input_type_error',
});
