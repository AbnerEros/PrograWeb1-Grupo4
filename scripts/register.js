const REGEX_LETTERS = /^[A-Za-z]+$/i;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_USERNAME = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
const REGEX_CARD_KEY = /^[1-9]{3}$/; 
const REGEX_CARD_NUMBER = /^\d{16,19}$/;

const ERROR_MESSAGE = {
  name: {
    empty: "El nombre es requerido",
    noValid: "El nombre debe contener solamente letras",
  },

  lastName: {
    empty: "El apellido es requerido",
    noValid: "El apellido debe contener solamente letras",
  },
  email: {
    empty: "El email es requerido",
    noValid: "Ingrese un formato valido",
  },
  username: {
    empty: "El usuario es requerido",
    noValid: "Ingrese un usuario que contenga letras y numeros",
  },

  password: {
    empty: "La contraseña es requerida",
    noValid: "La contraseña debe tener al menos 8 caracteres, incluyendo al menos dos letras, dos números y dos caracteres especiales",
    noMatch: "Las contraseñas no coinciden",
  },

  cardKey: {
    empty: "La clave de la tarjeta es requerida",
    noValid: "La clave de la tarjeta debe ser un número de tres dígitos distintos de cero y no puede ser '000'"
  },
  cardNumber: {
    empty: "El número de tarjeta es requerido",
    noValid: "El número de tarjeta debe tener entre 16 y 19 dígitos",
    invalidLastDigit: "El último dígito de la tarjeta no es válido"
  }

};

const submitBtn = document.querySelector(".btn");
submitBtn.addEventListener("click", validate);

function validate(event) {
  event.preventDefault();

  const inputName = document.querySelector("#nombre");
  const inputLastName = document.querySelector('#apellido');
  const inputEmail = document.querySelector("#email");
  const inputUserName = document.querySelector('#usuario')
  const inputPassword = document.querySelector('#contraseña');
  const inputRepeatPassword = document.querySelector('#repetir-contraseña');
  const inputCardKey = document.querySelector('#CVV');
  const inputCardNumber = document.querySelector('#tarjeta-numero');
  const errorMsg = document.querySelector(".field-name .help");
  const errorLastMsg = document.querySelector (".field-last_name .help")
  const errorUserMsg = document.querySelector (".field-user .help")
  const errorEmailMsg = document.querySelector(".field-email .help");
  const errorPasswordMsg = document.querySelector(".field-password .help");
  const errorRepeatPasswordMsg = document.querySelector(".field-repeat_password .help");
  const errorCardKeyMsg = document.querySelector(".field-card_key .help");
  const errorCardNumberMsg = document.querySelector(".field-card_number .help");

  let isValid = true;

  if (inputName.value === "") {
    inputName.classList.add("is-danger");
    errorMsg.classList.remove("is-hidden");
    errorMsg.textContent = ERROR_MESSAGE.name.empty;
    isValid = false;
  } else if (!letterValidate(inputName.value)) {
    inputName.classList.add("is-danger");
    errorMsg.classList.remove("is-hidden");
    errorMsg.textContent = ERROR_MESSAGE.name.noValid;
    isValid = false;
  } else {
    inputName.classList.remove("is-danger");
    errorMsg.classList.add("is-hidden");
  }

  if (inputLastName.value === "") {
    inputLastName.classList.add("is-danger");
    errorLastMsg.classList.remove("is-hidden");
    errorLastMsg.textContent = ERROR_MESSAGE.lastName.empty;
    isValid = false;
  } else if (!letterValidate(inputLastName.value)) {
    inputLastName.classList.add("is-danger");
    errorLastMsg.classList.remove("is-hidden");
    errorLastMsg.textContent = ERROR_MESSAGE.lastName.noValid;
    isValid = false;
  } else {
    inputLastName.classList.remove("is-danger");
    errorLastMsg.classList.add("is-hidden");
  }

  if (inputUserName.value === "") {
    inputUserName.classList.add("is-danger");
    errorUserMsg.classList.remove("is-hidden");
    errorUserMsg.textContent = ERROR_MESSAGE.username.empty;
    isValid = false;
  } else if (!usernameValidate(inputUserName.value)) {
    inputUserName.classList.add("is-danger");
    errorUserMsg.classList.remove("is-hidden");
    errorUserMsg.textContent = ERROR_MESSAGE.username.noValid;
    isValid = false;
  } else {
    inputUserName.classList.remove("is-danger");
    errorUserMsg.classList.add("is-hidden");
  }

  if (inputEmail.value === "") {
    inputEmail.classList.add("is-danger");
    errorEmailMsg.classList.remove("is-hidden");
    errorEmailMsg.textContent = ERROR_MESSAGE.email.empty;
    isValid = false;
  } else if (!emailValidate(inputEmail.value)) {
    inputEmail.classList.add("is-danger");
    errorEmailMsg.classList.remove("is-hidden");
    errorEmailMsg.textContent = ERROR_MESSAGE.email.noValid;
    isValid = false;
  } else {
    inputEmail.classList.remove("is-danger");
    errorEmailMsg.classList.add("is-hidden");
  }

  if (inputPassword.value === "") {
    inputPassword.classList.add("is-danger");
    errorPasswordMsg.classList.remove("is-hidden");
    errorPasswordMsg.textContent = ERROR_MESSAGE.password.empty;
    isValid = false;
  } else if (!passwordValidate(inputPassword.value)) {
    inputPassword.classList.add("is-danger");
    errorPasswordMsg.classList.remove("is-hidden");
    errorPasswordMsg.textContent = ERROR_MESSAGE.password.noValid;
    isValid = false;
  } else {
    inputPassword.classList.remove("is-danger");
    errorPasswordMsg.classList.add("is-hidden");
  }

  if (inputRepeatPassword.value === "") {
    inputRepeatPassword.classList.add("is-danger");
    errorRepeatPasswordMsg.classList.remove("is-hidden");
    errorRepeatPasswordMsg.textContent = ERROR_MESSAGE.password.empty;
    isValid = false;
  } else if (inputPassword.value !== inputRepeatPassword.value) {
    inputRepeatPassword.classList.add("is-danger");
    errorRepeatPasswordMsg.classList.remove("is-hidden");
    errorRepeatPasswordMsg.textContent = ERROR_MESSAGE.password.noMatch;
    isValid = false;
  } else {
    inputRepeatPassword.classList.remove("is-danger");
    errorRepeatPasswordMsg.classList.add("is-hidden");
  } 

  if (inputCardKey.value === "") {
    inputCardKey.classList.add("is-danger");
    errorCardKeyMsg.classList.remove("is-hidden");
    errorCardKeyMsg.textContent = ERROR_MESSAGE.cardKey.empty;
    isValid = false;
  } else if (!cardKeyValidate(inputCardKey.value)) {
    inputCardKey.classList.add("is-danger");
    errorCardKeyMsg.classList.remove("is-hidden");
    errorCardKeyMsg.textContent = ERROR_MESSAGE.cardKey.noValid;
    isValid = false;
  } else {
    inputCardKey.classList.remove("is-danger");
    errorCardKeyMsg.classList.add("is-hidden");
  }

  if (inputCardNumber.value === "") {
    inputCardNumber.classList.add("is-danger");
    errorCardNumberMsg.classList.remove("is-hidden");
    errorCardNumberMsg.textContent = ERROR_MESSAGE.cardNumber.empty;
    isValid = false;
  } else if (!cardNumberValidate(inputCardNumber.value)) {
    inputCardNumber.classList.add("is-danger");
    errorCardNumberMsg.classList.remove("is-hidden");
    errorCardNumberMsg.textContent = ERROR_MESSAGE.cardNumber.noValid;
    isValid = false;
  } else {
    const cardNumber = inputCardNumber.value;
    const lastDigit = parseInt(cardNumber[cardNumber.length - 1]);
    const sumOfDigits = cardNumber.slice(0, -1).split('').reduce((sum, digit) => sum + parseInt(digit), 0);

    if ((sumOfDigits % 2 === 0 && lastDigit % 2 !== 0) || (sumOfDigits % 2 !== 0 && lastDigit % 2 === 0)) {
      inputCardNumber.classList.remove("is-danger");
      errorCardNumberMsg.classList.add("is-hidden");
    } else {
      inputCardNumber.classList.add("is-danger");
      errorCardNumberMsg.classList.remove("is-hidden");
      errorCardNumberMsg.textContent = ERROR_MESSAGE.cardNumber.invalidLastDigit;
      isValid = false;
    }
  }

  if (isValid) {
    // Aquí puedes manejar el envío del formulario si todos los campos son válidos
    console.log("Formulario válido y listo para enviar.");
  }

  submitBtn.disabled = !isValid; 
}


function letterValidate(text) {
  return REGEX_LETTERS.test(text);
}

function emailValidate(email) {
  return REGEX_EMAIL.test(email);
}

function usernameValidate(username) {
  return REGEX_USERNAME.test(username);
}

function passwordValidate(password) {
  return REGEX_PASSWORD.test(password);
}

function cardKeyValidate(cardKey) {
  return REGEX_CARD_KEY.test(cardKey) && cardKey !== '000';
}

function cardNumberValidate(cardNumber) {
  return REGEX_CARD_NUMBER.test(cardNumber);
}

function validateFields() {
  const userValid = userInput.value.trim() !== '';
  const emailValid = emailInput.value.trim() !== '';
  submitBtn.disabled = !(userValid && emailValid);
}

function saveToLocalStorage() {
  const username = userInput.value.trim();
  const email = emailInput.value.trim();
  if (username && email) {
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
  }
}

userInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  saveToLocalStorage();
  alert('Información guardada en el local storage.');
});


const savedUsername = localStorage.getItem('username');
const savedEmail = localStorage.getItem('email');
if (savedUsername) {
  userInput.value = savedUsername;
}
if (savedEmail) {
  emailInput.value = savedEmail;
}
validateFields();  // Asegura que el botón esté en el estado correcto al cargar la página
