import { openModal, closeModal } from './modal.js';
import { updateAvatar, getMyProfile } from './api.js';

// Глобальные переменные для DOM элементов
const profileImage = document.querySelector('.profile__image');
const avatarModalWindow = document.querySelector('.popup_type_new-avatar');

// Функция для обработки отправки формы обновления аватара
export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = document.getElementById('avatar__input').value;
  updateAvatar(avatarUrl)
    .then((profile) => {
      // Если запрос успешен, обновляем аватар на странице и закрываем модальное окно
      updateAvatarOnPage(profile.avatar);
      closeAvatarModal();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    });
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

// Получение данных профиля при загрузке страницы
window.addEventListener('load', () => {
  getMyProfile()
    .then(function (profile) {
      if (profile) {
        // Обновляем аватар на странице
        updateAvatarOnPage(profile.avatar);
      }
    })
    .catch(function (error) {
      console.error('Ошибка при загрузке аватара:', error);
    });
});
