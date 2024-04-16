import { openModal, closeModal} from './modal.js';
import { updateAvatar } from './api.js';

// Функция для обработки отправки формы обновления аватара
export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = document.getElementById('avatar__input').value;
  updateAvatar(avatarUrl)
    .then(() => {
      // Если запрос успешен, обновляем аватар на странице и закрываем модальное окно
      updateAvatarOnPage(avatarUrl);
      closeAvatarModal();
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    });
}

// Функция для обновления аватара на странице
export function updateAvatarOnPage(avatarUrl) {
  const profileImage = document.querySelector('.profile__image');
  profileImage.src = avatarUrl;
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
