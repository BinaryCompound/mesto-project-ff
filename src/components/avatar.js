import { openModal, closeModal } from './modal.js';
import { updateAvatar } from './api.js';
import { clearForm } from '../index.js'; 

// Глобальные переменные для DOM элементов
const profileImage = document.querySelector('.profile__image');
const avatarModalWindow = document.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['edit_avatar'];

// Функция для обработки отправки формы обновления аватара
export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = document.getElementById('avatar__input').value;
  updateAvatar(avatarUrl)
    .then((profile) => {
      // Если запрос успешен, обновляем аватар на странице и закрываем модальное окно
      updateAvatarOnPage(profile.avatar);
      saveAvatarUrlToLocalStorage(profile.avatar); // Сохраняем новый URL аватара в localStorage
      closeAvatarModal();
      clearForm(avatarForm); // Очищаем форму после успешной отправки
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    });
}

// Функция для сохранения нового URL аватара в localStorage
function saveAvatarUrlToLocalStorage(avatarUrl) {
  localStorage.setItem('avatarUrl', avatarUrl);
}


// Функция для обновления аватара на странице
export function updateAvatarOnPage(avatarUrl) {
  profileImage.src = avatarUrl;
}

// Функция для открытия модального окна обновления аватара
export function openAvatarModal() {
  openModal(avatarModalWindow);
}

// Функция для закрытия модального окна обновления аватара
export function closeAvatarModal() {
  closeModal(avatarModalWindow);
}
