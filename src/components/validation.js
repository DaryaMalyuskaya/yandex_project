function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    rules: {
        'required': (_, value) => {
            if (value.length === 0) {
                return 'Вы пропустили это поле.'
            }
            return null;
        },
        'type': (type, value) => {
            if (type === 'url') {
                if (!isValidHttpUrl(value)) {
                    return 'Введите адрес сайта.'
                }
            } else {
                return null;
            }
        },
        'minlength': (opt, value) => {
            if (value.length < Number(opt)) {
                return `Минимальное количество символов: ${opt}. Длина текста сейчас: ${value.length} символ.`
            }
            return null;
        },
        'maxlength': (opt, value) => {
            if (value.length > Number(opt)) {
                return `Максимальное количество символов: ${opt}. Длина текста сейчас: ${value.length} символ.`
            }
            return null;
        }
    }
}

export const validation = new Map()

function enableValidation(settings) {
    const validationRules = settings.rules;
    const validatedAttributes = Object.keys(validationRules)
    document.querySelectorAll(settings.formSelector).forEach(form => {
        const formInputs = form.querySelectorAll(settings.inputSelector)
        const formSubmit = form.querySelector(settings.submitButtonSelector)
        let formErrors = new Map()
        let formAttributes = new Map()
        let formErrorLabels = new Map()
        let formError = false;

        function validateInput(input) {
            const fieldAttributes = formAttributes.get(input)
            const errorElement = formErrorLabels.get(input)

            const errors = []
            for (let [attr, val] of fieldAttributes) {
                const error = validationRules[attr](val, input.value)
                if (error) {
                    errors.push(error)
                }
            }
            if (errors.length > 0) {
                input.classList.add(settings.inputErrorClass)
                errorElement.textContent = errors[0]
            } else {
                input.classList.remove(settings.inputErrorClass)
                errorElement.textContent = ''
            }

            formErrors.set(input, errors)

            formError = formErrors.values().some(it => it.length > 0)
            if (formError) {
                formSubmit.classList.add(settings.inactiveButtonClass)
                form.classList.add(settings.errorClass)
            } else {
                formSubmit.classList.remove(settings.inactiveButtonClass)
                form.classList.remove(settings.errorClass)
            }
        }

        formInputs.forEach(input => {
            const fieldAttributes =
                validatedAttributes
                    .map(attr => input.attributes.getNamedItem(attr))
                    .filter(it => it)
                    .map(attr => [attr.name, attr.value])


            const errorElement = document.createElement('div')
            errorElement.classList.add('popup__input-error')
            input.parentNode.insertBefore(
                errorElement,
                input.nextSibling
            )

            formErrors.set(input, [])
            formAttributes.set(input, fieldAttributes)
            formErrorLabels.set(input, errorElement)

            input.addEventListener('input', () => {
                validateInput(input)
            })
        })

        form.setAttribute('novalidate', '')
        form.addEventListener('submit', e => {
            formInputs.forEach(i => validateInput(i))
            if (formError) {
                e.preventDefault()
                e.stopImmediatePropagation()
            }
        })
        validation.set(form, {
            reset: function () {
                formErrors = new Map()
                formError = false

                formInputs.forEach(input => {
                    const errorElement = formErrorLabels.get(input)
                    input.classList.remove(settings.inputErrorClass)
                    errorElement.textContent = ''
                })

                formSubmit.classList.remove(settings.inactiveButtonClass)
                form.classList.remove(settings.errorClass)
            }
        })
    })
}

enableValidation(validationSettings);

