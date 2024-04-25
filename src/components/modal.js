import { clearValidationErrors } from './validation.js';

// Функция для установки текста кнопки и блокировки кнопки
function setButtonLoading(button) {
  button.textContent = 'Сохранение...';
  button.setAttribute('disabled', true);
}

// Функция для восстановления исходного текста кнопки и разблокировки кнопки
function restoreButton(button, originalText) {
  button.textContent = originalText;
  button.removeAttribute('disabled');
}

// Функция для обработки отправки формы
function handleFormSubmit(form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    // Получаем кнопку отправки формы
    const submitButton = form.querySelector('.popup__button');

    // Сохраняем исходный текст кнопки
    const originalButtonText = submitButton.textContent;

    // Устанавливаем текст кнопки "Сохранение..." и блокируем кнопку
    setButtonLoading(submitButton);

    setTimeout(() => {
      form.reset();
      // Восстанавливаем исходный текст кнопки и разблокируем кнопку
      restoreButton(submitButton, originalButtonText);
    }, 2000); // Временная задержка для демонстрации, вы можете убрать её после добавления реального кода отправки данных
  });
}

export function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
  
  // Получаем форму в модальном окне
  const form = modalWindow.querySelector('.popup__form');
  if (form) {
    // Обрабатываем отправку формы
    handleFormSubmit(form);
  }
}

// Функция для закрытия модального окна
export function closeModal(modalWindow) {
  clearValidationErrors(modalWindow); // Очистить ошибки валидации перед закрытием
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
