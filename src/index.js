import "./styles/index.css";
import avatarImage from "./images/avatar.jpg";
import { makeCard, handleLike, removeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation } from "./components/validation.js";
import {
  getMyProfile,
  editMyProfile,
  loadInitialCards,
  addNewCard,
  updateAvatar,
  deleteCard,
  likeCard,
  dislikeCard,
} from "./components/api.js"; // Импортируем функции из api.js

document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.querySelector(".places__list");
  document.querySelector(".profile__image").style.backgroundImage = `url(${avatarImage})`;

  const arkhyz = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg");
  const chelyabinskRegion = new URL(
    "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  );
  const ivanovo = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg");
  const kamchatka = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg");
  const kholmogoryDistrict = new URL(
    "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  );
  const baikal = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg");

  const initialCards = [
    { name: "Архыз", link: arkhyz },
    { name: "Челябинская область", link: chelyabinskRegion },
    { name: "Иваново", link: ivanovo },
    { name: "Камчатка", link: kamchatka },
    { name: "Холмогорский район", link: kholmogoryDistrict },
    { name: "Байкал", link: baikal },
  ];

  const renderCard = (cardData) => {
    const cardElement = makeCard(cardData, handleLike, handleImageClick);
    const likeCount = cardData.likes ? cardData.likes.length : 0; // Проверяем, существует ли свойство likes
    const likeCountElement = cardElement.querySelector(".card__like-count");
    likeCountElement.textContent = likeCount; // Обновляем текстовое содержимое элемента с количеством лайков
    cardContainer.appendChild(cardElement);
  };

  initialCards.forEach(renderCard);
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileTitleStatic = profileName.textContent;
  const profileDescriptionStatic = profileDescription.textContent;
  const popupImage = document.querySelector(".popup_type_image");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");
  const popUpEditProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopupProfile = popUpEditProfile.querySelector(".popup__close");
  const popUpAddCard = document.querySelector(".popup_type_new-card");
  const buttonOpenAddCard = document.querySelector(".profile__add-button");
  const buttonCloseAddCard = popUpAddCard.querySelector(".popup__close");
  const addCardForm = document.forms["new-place"];
  const cardNameInput = document.querySelector(".popup__input_type_card-name");
  const cardLinkInput = document.querySelector(".popup__input_type_url");
  const formElement = document.querySelector(".popup__form");

  const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const clearValidation = (formElement, settings) => {
    const inputs = formElement.querySelectorAll(settings.inputSelector);
    const errorMessages = formElement.querySelectorAll(settings.errorSelector);
    const submitButton = formElement.querySelector(settings.submitButtonSelector);

    inputs.forEach((input) => {
      const errorElement = input.nextElementSibling; // Предполагается, что сообщение об ошибке следует за полем ввода
      errorElement.textContent = "";
      errorElement.classList.remove(settings.errorActiveClass);
    });

    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });

    submitButton.setAttribute("disabled", "");
  };

  enableValidation(settings);
  clearValidation(formElement, settings);

  function addCardToContainer(cardElement) {
    cardContainer.prepend(cardElement);
  }

  function createAndAddCardToContainer(cardData) {
    const cardElement = makeCard(cardData, handleLike, handleImageClick);
    addCardToContainer(cardElement);
  }

  initialCards.forEach(createAndAddCardToContainer);
  const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#description");

  buttonOpenPopupProfile.addEventListener("click", () => {
    openModal(popUpEditProfile);
    // Заполнение формы данными профиля
    nameInput.value = profileTitleStatic;
    descriptionInput.value = profileDescriptionStatic;
  });

  buttonClosePopupProfile.addEventListener("click", () => closeModal(popUpEditProfile));
  buttonOpenAddCard.addEventListener("click", () => openModal(popUpAddCard));
  buttonCloseAddCard.addEventListener("click", () => closeModal(popUpAddCard));

  // Находим форму в DOM для редактирования профиля
  const editProfileForm = document.forms["edit-profile"];

  // Обработчик отправки формы редактирования профиля
  function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значения из полей ввода
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;

    // Обновляем данные профиля
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    closeModal(popUpEditProfile);
  }

  // Прикрепляем обработчик к форме редактирования профиля
  editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

  // Обработчик отправки формы добавления новой карточки
  function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    // Получаем значения из полей ввода
    const cardNameValue = cardNameInput.value;
    const cardLinkValue = cardLinkInput.value;

    // Вызываем функцию добавления новой карточки с полученными значениями
    addNewCard({
      name: cardNameValue,
      link: cardLinkValue,
    })
      .then((newCard) => {
        // Создаем новую карточку и добавляем её в контейнер
        createAndAddCardToContainer(newCard);

        // Очищаем поля формы добавления новой карточки
        clearForm(addCardForm);

        // Закрываем всплывающее окно добавления новой карточки
        closeModal(popUpAddCard);
      })
      .catch((err) => {
        console.error("Ошибка при добавлении карточки:", err);
      });
  }

  // Прикрепляем обработчик к форме добавления новой карточки
  addCardForm.addEventListener("submit", handleAddCardFormSubmit);

  // Функция для очистки формы
  function clearForm(form) {
    form.reset();
  }

  // Функция для открытия попапа с изображением
  function openImagePopup(imageSrc, imageName) {
    popupImageElement.src = imageSrc;
    popupImageElement.alt = imageName;
    popupCaption.textContent = imageName;
    openModal(popupImage);
  }

  // Обработчик клика по изображению
  function handleImageClick(imageSrc, imageName) {
    openImagePopup(imageSrc, imageName);
  }

  // Функция для настройки модальных окон
  function setupModalWindows() {
    const modalWindows = document.querySelectorAll(".popup");

    modalWindows.forEach((modal) => {
      const openButtons = document.querySelectorAll(`[data-modal-target="${modal.id}"]`);
      const closeButtons = modal.querySelectorAll(".popup__close");

      openButtons.forEach((button) => {
        button.addEventListener("click", () => openModal(modal));
      });

      closeButtons.forEach((button) => {
        button.addEventListener("click", () => closeModal(modal));
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });
  }

  loadInitialCards()
    .then((cards) => {
      console.log("Загруженные карточки:", cards);
      cards.forEach(renderCard);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
    });

  editMyProfile({
    name: "Илья Позволенко",
    about: "Человек",
  })
    .then((data) => {
      console.log("Профиль успешно отредактирован:", data);
    })
    .catch((err) => {
      console.error("Ошибка при редактировании профиля:", err);
    });

  const photoButton = document.getElementById("profile-image-button");
  const profileDialog = document.getElementById("photo-dialog");

  photoButton.addEventListener("click", () => {
    profileDialog.classList.add("popup_is-opened");

    profileDialog.querySelector("[data-close-button]").addEventListener("click", () => {
      profileDialog.classList.remove("popup_is-opened");
    });
  });

  document.getElementById("profile-image-form").addEventListener("submit", (evt) => {
    evt.preventDefault();

    const url = evt.target.querySelector("[name=profile-url]").value;

    if (url) {
      updateAvatar(url).then(({ avatar }) => {
        updateAvatarImage(avatar);
        closeProfileImageDialog();
      });
    }
  });

  getMyProfile().then(({ avatar }) => updateAvatarImage(avatar));

  function updateAvatarImage(url) {
    document.getElementById("profile-img").src = url;
  }

  function closeProfileImageDialog() {
    profileDialog.classList.remove("popup_is-opened");
  }

  setupModalWindows();
});