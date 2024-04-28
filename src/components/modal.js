// Функция для обработки отправки формы
function handleFormSubmit(form) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
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
    // Добавляем обработчик события отправки формы
    form.addEventListener('submit', (evt) => {
      // Проверяем, валидна ли форма
      if (form.checkValidity()) {
        // Если форма валидна, вызываем функцию закрытия модального окна
        closeModal(modalWindow);
      }
    });
  }
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
