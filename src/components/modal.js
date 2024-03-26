export function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    modalWindow.classList.add('popup_is-animated');
}

// Функция для закрытия модального окна
export function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    modalWindow.classList.add('popup_is-animated');
}