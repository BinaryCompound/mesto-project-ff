// Импорт стилей и компонентов
import './styles/index.css';
import { renderCards, createCardElement} from './components/card.js';
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

// Общая функция для обработки формы с возможностью закрытия модального окна
function handleFormSubmit(form, handleSubmit, closeModal) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        handleSubmit(evt, closeModal); // Передаем функцию закрытия модального окна
    });
}

// Очищает содержимое полей в форме
function clearForm(form) {
    const inputFields = form.querySelectorAll('input');
    inputFields.forEach(input => {
        input.value = ''; // Очищаем значение поля ввода
    });
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

// Функция для обновления данных профиля на странице
function updateProfileData(data) {
    // Обновляем данные профиля на странице
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
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
        formEditProfile.elements['name__input'].value = userProfileData.name;
        formEditProfile.elements['description__input'].value = userProfileData.about;
    } catch (error) {
        console.error('Данные профиля не загружены:', error);
    }
});

// Обработчик отправки формы редактирования профиля
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
            clearForm(formEditProfile); // Очищаем форму после успешного сохранения
        })
        .catch((err) => {
            console.error('Ошибка при сохранении профиля:', err);
        });
}

// Вызываем функцию загрузки данных профиля при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [profile, cards] = await Promise.all([getMyProfile(), getCards()]);
        const userId = profile._id;
        renderCards(cards, userId);
        loadProfileDataFromLocalStorage(); // Загружаем данные из localStorage
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }

});

// Функция для добавления карточки в контейнер
function addCardToContainer(cardElement) {
    cardContainer.prepend(cardElement);
}

// Добавление слушателя для кнопки открытия формы добавления карточки
buttonOpenAddCard.addEventListener('click', () => openModal(popUpAddCard));

// Обработчик отправки формы добавления карточки
function handleAddCardFormSubmit(evt, closeModal) {
    evt.preventDefault();

    // Создаем объект FormData для сбора данных из формы
    const formData = new FormData(addCardForm);
    console.log('Данные, отправляемые на сервер:', formData);
    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    // Здесь выполняем отправку данных формы на сервер
    addNewCard(formData)
        .then((data) => {

            console.log('Данные после успешного добавления карточки:', data);
            // Если запрос успешен, закрываем модальное окно
            closeModal(popUpAddCard);
            // Очищаем форму после успешного добавления
            clearForm(addCardForm);
        })
        .catch((error) => {
            console.error('Ошибка при добавлении карточки:', error);
        });
}


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
