// Объявляем функцию handleFormInput внешними по отношению к validateForm и enableValidation
function handleFormInput(form, settings) {
    const inputs = form.querySelectorAll(settings.inputSelector);
    let isFormValid = true;

    inputs.forEach(input => {
        if (!input.validity.valid) {
            isFormValid = false;
            return;
        }
    });

    const submitButton = form.querySelector(settings.submitButtonSelector);
    if (isFormValid) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}

export function enableValidation(settings) {
    if (!settings || typeof settings !== 'object') {
        console.error('Invalid settings object');
        return;
    }

    const forms = document.querySelectorAll(settings.formSelector);

    forms.forEach(form => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            validateForm(form, settings);
        });

        form.addEventListener('input', function (evt) {
            validateInput(evt.target, settings);
            handleFormInput(form, settings);
        });
    });
}

export function validateInput(input, settings) {
    const errorElement = input.nextElementSibling;
    if (!input.validity.valid) {
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(settings.inputErrorClass);
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove(settings.inputErrorClass);
    }
}

export function clearValidationErrors(popupElement) {
    const errorElements = popupElement.querySelectorAll('.popup__input-error');
    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
        errorElement.classList.remove('popup__input-error_active');
    });
}

export function validateForm(form, settings) {
    const inputs = form.querySelectorAll(settings.inputSelector);
    let isValidForm = true;

    inputs.forEach(input => {
        validateInput(input, settings);
        if (!input.validity.valid) {
            isValidForm = false;
        }
    });

    const submitButton = form.querySelector(settings.submitButtonSelector);
    if (isValidForm) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }
}