import './styles/index.css';
import avatarImage from './images/avatar.jpg';
import { createCard, handleLike, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

document.querySelector('.profile__image').style.backgroundImage = `url(${avatarImage})`;

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

document.addEventListener('DOMContentLoaded', function () {
    // Создание карточек при загрузке страницы
    function createInitialCards() {
        initialCards.forEach(cardData => {
            createCard(cardData, closePopup, handleLike, handleImageClick);
        });
    }
    createInitialCards(); // Вызов функции при загрузке страницы

    // Настройка модальных окон
    setupModalWindows();

    // Открытие и закрытие всплывающего окна редактирования профиля
    const popUpEditProfile = document.querySelector('.popup_type_edit');
    const openButtonEditProfile = document.querySelector('.profile__edit-button');
    const closeButtonEditProfile = popUpEditProfile.querySelector('.popup__close');

    openButtonEditProfile.addEventListener('click', () => {
        openModal(popUpEditProfile);
        // Заполнение формы данными профиля
        const nameInput = document.querySelector('.popup__input_type_name');
        const descriptionInput = document.querySelector('.popup__input_type_description');
        nameInput.value = document.querySelector('.profile__title').textContent;
        descriptionInput.value = document.querySelector('.profile__description').textContent;
    });

    closeButtonEditProfile.addEventListener('click', () => closeModal(popUpEditProfile));

    // Открытие и закрытие всплывающего окна добавления новой карточки
    const popUpAddCard = document.querySelector('.popup_type_new-card');
    const openButtonAddCard = document.querySelector('.profile__add-button');
    const closeButtonAddCard = popUpAddCard.querySelector('.popup__close');

    openButtonAddCard.addEventListener('click', () => openModal(popUpAddCard));
    closeButtonAddCard.addEventListener('click', () => closeModal(popUpAddCard));

    // Добавляем обработчик события для клавиатурного события keydown
    document.addEventListener('keydown', closeOnEsc);

    // Находим форму в DOM для редактирования профиля
    const editProfileForm = document.forms['edit-profile'];
    const nameInput = document.querySelector('.popup__input_type_name');
    const descriptionInput = document.querySelector('.popup__input_type_description');

    // Обработчик отправки формы редактирования профиля
    function handleEditProfileFormSubmit(evt) {
        evt.preventDefault();

        // Получаем значения из полей ввода
        const newName = nameInput.value;
        const newDescription = descriptionInput.value;

        // Обновляем данные профиля

        const profileName = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');

        profileName.textContent = newName;
        profileDescription.textContent = newDescription;
        closeModal(popUpEditProfile);

    }

    // Прикрепляем обработчик к форме редактирования профиля
    editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

    // Находим форму в DOM для добавления новой карточки
    const addCardForm = document.forms['new-place'];
    const cardNameInput = document.querySelector('.popup__input_type_card-name');
    const cardLinkInput = document.querySelector('.popup__input_type_url');

    // Обработчик отправки формы добавления новой карточки
    function handleAddCardFormSubmit(evt) {
        evt.preventDefault();

        // Получаем значения из полей ввода
        const cardNameValue = cardNameInput.value;
        const cardLinkValue = cardLinkInput.value;

        // Создаем объект с данными новой карточки
        const newCardData = {
            name: cardNameValue,
            link: new URL(cardLinkValue),
        };

        // Создаем новую карточку
        createCard(newCardData, closePopup);

        // Очищаем поля формы добавления новой карточки
        addCardForm.reset();

        // Закрываем всплывающее окно добавления новой карточки
        closeModal(popUpAddCard);
    }

    // Прикрепляем обработчик к форме добавления новой карточки
    addCardForm.addEventListener('submit', handleAddCardFormSubmit);

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

    // Функция для открытия попапа с изображением
    function openImagePopup(imageSrc, imageName) {
        const popupImage = document.querySelector('.popup_type_image');
        const popupImageElement = popupImage.querySelector('.popup__image');
        const popupCaption = popupImage.querySelector('.popup__caption');

        popupImageElement.src = imageSrc;
        popupImageElement.alt = imageName;
        popupCaption.textContent = imageName;

        openModal(popupImage);
    }

    // Обработчик клика по изображению
    function handleImageClick(imageSrc, imageName) {
        openImagePopup(imageSrc, imageName);
    }

    // Функция для закрытия всплывающего окна и очистки формы
    function closePopup() {
        const popup = document.querySelector('.popup');
        const form = popup.querySelector('.popup__form');
        form.reset();
    }

    // Функция для закрытия всплывающего окна при нажатии на Esc
    function closeOnEsc(event) {
        if (event.key === 'Escape') {
            const openedModal = document.querySelector('.popup_is-opened');
            if (openedModal) {
                closeModal(openedModal);
            }
        }
    }

    // Вызов функции для настройки модальных окон
    setupModalWindows();

});