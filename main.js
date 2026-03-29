const form = document.querySelector('form');
const userInput = document.querySelector('[name="username"]');
const emailInput = document.querySelector('[name="email"]');
const userAlert = document.querySelector('.username-error');
const emailAlert = document.querySelector('.email-error');

const showError = (input, container, message) => {
    input.style.border = '2px solid red';
    container.textContent = message;
}

const showSuccess = (input, container) => {
    input.style.border = '2px solid green';
    container.textContent = '';
}

const validateEmail = (email) => {
    const regex = /^[\w.-]+@[a-z]+\.[a-z]{2,6}$/
    return regex.test(email);
}

userInput.addEventListener('blur', () => {
    if (!userInput.value) {
        showError(userInput, userAlert, 'Поле обязательно');
    } else if (userInput.value.length <= 2) {
        showError(userInput, userAlert, 'Поле должно быть больше 2 символов');
    } else {
        showSuccess(userInput, userAlert);
    }
});

emailInput.addEventListener('blur', () => {
    if (!emailInput.value) {
        showError(emailInput, emailAlert, 'Email обязателен');
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailAlert, 'Email введен некорректно');
    } else {
        showSuccess(emailInput, emailAlert);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const formData = new FormData(form)
    const data = Object.fromEntries(formData);

    if (!data.username) {
        showError(userInput, userAlert, 'Поле обязательно');
        isValid = false;
    } else if (data.username.length <= 2) {
        showError(userInput, userAlert, 'Поле должно быть больше 2 символов');
        isValid = false;
    } else {
        showSuccess(userInput, userAlert);
    }

    if (!data.email) {
        showError(emailInput, emailAlert, 'Email обязателен');
        isValid = false;
    } else if (!validateEmail(data.email)) {
        showError(emailInput, emailAlert, 'Email введен некорректно');
        isValid = false;
    } else {
        showSuccess(emailInput, emailAlert);
    }

    if(!isValid){
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok){
            alert('Произошла ошибка, попробуйте ещё');
        }
        return response.json();
    }).then(result => {
        alert('Форма отправлена');
        form.reset();
        showSuccess(userInput, userAlert);
        showSuccess(emailInput, emailAlert);
    })
})