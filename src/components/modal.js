// Функция для открытия модального окна
export function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
}

// Функция для закрытия модального окна
export function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEsc);
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
