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
    noValid: "Ingrese un usuario que contenga letras y números",
  },
  password: {
    empty: "La contraseña es requerida",
    noValid: "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra, un número y un carácter especial",
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
const inputName = document.querySelector("#nombre");
const inputLastName = document.querySelector('#apellido');
const inputEmail = document.querySelector("#email");
const inputUserName = document.querySelector('#usuario');
const inputPassword = document.querySelector('#contraseña');
const inputRepeatPassword = document.querySelector('#repetir-contraseña');
const inputCardKey = document.querySelector('#CVV');
const inputCardNumber = document.querySelector('#tarjeta-numero');
const errorMsg = document.querySelector(".field-name .help");
const errorLastMsg = document.querySelector (".field-last_name .help");
const errorUserMsg = document.querySelector (".field-user .help");
const errorEmailMsg = document.querySelector(".field-email .help");
const errorPasswordMsg = document.querySelector(".field-password .help");
const errorRepeatPasswordMsg = document.querySelector(".field-repeat_password .help");
const errorCardKeyMsg = document.querySelector(".field-card_key .help");
const errorCardNumberMsg = document.querySelector(".field-card_number .help");

function validate(event) {
  event.preventDefault();
  
  let isValid = true;

  isValid = validateField(inputName, REGEX_LETTERS, ERROR_MESSAGE.name.empty, ERROR_MESSAGE.name.noValid, errorMsg) && isValid;
  isValid = validateField(inputLastName, REGEX_LETTERS, ERROR_MESSAGE.lastName.empty, ERROR_MESSAGE.lastName.noValid, errorLastMsg) && isValid;
  isValid = validateField(inputEmail, REGEX_EMAIL, ERROR_MESSAGE.email.empty, ERROR_MESSAGE.email.noValid, errorEmailMsg) && isValid;
  isValid = validateField(inputUserName, REGEX_USERNAME, ERROR_MESSAGE.username.empty, ERROR_MESSAGE.username.noValid, errorUserMsg) && isValid;
  isValid = validateField(inputPassword, REGEX_PASSWORD, ERROR_MESSAGE.password.empty, ERROR_MESSAGE.password.noValid, errorPasswordMsg) && isValid;

  if (inputRepeatPassword.value === "") {
    showError(inputRepeatPassword, errorRepeatPasswordMsg, ERROR_MESSAGE.password.empty);
    isValid = false;
  } else if (inputPassword.value !== inputRepeatPassword.value) {
    showError(inputRepeatPassword, errorRepeatPasswordMsg, ERROR_MESSAGE.password.noMatch);
    isValid = false;
  } else {
    hideError(inputRepeatPassword, errorRepeatPasswordMsg);
  }

  isValid = validateField(inputCardKey, cardKeyValidate, ERROR_MESSAGE.cardKey.empty, ERROR_MESSAGE.cardKey.noValid, errorCardKeyMsg) && isValid;
  isValid = validateCardNumber(inputCardNumber, errorCardNumberMsg) && isValid;

  if (isValid) {
    console.log("Formulario válido y listo para enviar.");
    saveToLocalStorage();
    alert('Información se ha guardado correctamente.');
    window.location.href = "../index.html";
  }


}


function validateField(input, regex, emptyMsg, invalidMsg, errorMsgElem) {
  if (input.value === "") {
    showError(input, errorMsgElem, emptyMsg);
    return false;
  } else if (!regex.test(input.value)) {
    showError(input, errorMsgElem, invalidMsg);
    return false;
  } else {
    hideError(input, errorMsgElem);
    return true;
  }
}

function validateField(input, validator, emptyMsg, invalidMsg, errorMsgElem) {
  if (input.value === "") {
    showError(input, errorMsgElem, emptyMsg);
    return false;
  } else if (typeof validator === 'function' ? !validator(input.value) : !validator.test(input.value)) {
    showError(input, errorMsgElem, invalidMsg);
    return false;
  } else {
    hideError(input, errorMsgElem);
    return true;
  }
}

function validateCardNumber(input, errorMsgElem) {
  if (input.value === "") {
    showError(input, errorMsgElem, ERROR_MESSAGE.cardNumber.empty);
    return false;
  } else if (!cardNumberValidate(input.value)) {
    showError(input, errorMsgElem, ERROR_MESSAGE.cardNumber.noValid);
    return false;
  } else {
    const cardNumber = input.value;
    const lastDigit = parseInt(cardNumber[cardNumber.length - 1]);
    const sumOfDigits = cardNumber.slice(0, -1).split('').reduce((sum, digit) => sum + parseInt(digit), 0);

    if ((sumOfDigits % 2 === 0 && lastDigit % 2 !== 0) || (sumOfDigits % 2 !== 0 && lastDigit % 2 === 0)) {
      hideError(input, errorMsgElem);
      return true;
    } else {
      showError(input, errorMsgElem, ERROR_MESSAGE.cardNumber.invalidLastDigit);
      return false;
    }
  }
}

function showError(input, errorMsgElem, msg) {
  input.classList.add("is-danger");
  errorMsgElem.classList.remove("is-hidden");
  errorMsgElem.textContent = msg;
}

function hideError(input, errorMsgElem) {
  input.classList.remove("is-danger");
  errorMsgElem.classList.add("is-hidden");
}

function cardKeyValidate(cardKey) {
  return REGEX_CARD_KEY.test(cardKey) && cardKey !== '000';
}

function cardNumberValidate(cardNumber) {
  return REGEX_CARD_NUMBER.test(cardNumber);
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

submitBtn.addEventListener("click", validate);

const userInput = document.querySelector("#usuario");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector('#contraseña');

function validateFields() {
  const userValid = userInput.value.trim() !== '';
  const emailValid = emailInput.value.trim() !== '';
  submitBtn.disabled = !(userValid && emailValid);
}

function saveToLocalStorage() {
  const username = userInput.value.trim();
  const email = emailInput.value.trim();
  const password = inputPassword.value.trim();
  if (username && email && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password)
  }
}

userInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);
inputPassword.addEventListener('input', validateFields);


submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  saveToLocalStorage();
  alert('Información se ha guardado correctamente.');
});

const savedUsername = localStorage.getItem('username');
const savedEmail = localStorage.getItem('email');
const savedPassword = localStorage.getItem('password')
if (savedUsername) {
  userInput.value = savedUsername;
}
if (savedEmail) {
  emailInput.value = savedEmail;
}
if (savedPassword){
  inputPassword.value = savedPassword;
}
validateFields();  // Asegura que el botón esté en el estado correcto al cargar la página
