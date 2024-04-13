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

