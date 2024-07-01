const REGEX_LETTERS = /^[A-Za-z]+$/i;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_USERNAME = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
const REGEX_CARD_KEY = /^[1-9]{3}$/; 
const REGEX_CARD_NUMBER = /^\d{16,19}$/;
const REGEX_ATLEAST2_SPECIAL = /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/
const REGEX_ATLEAST2_LETTERS = /(?:[^a-zA-Z]*[a-zA-Z]){2}/
const REGEX_ATLEAST2_NUMBERS = /(?:[^\d]*[\d]){2}/
let actualPayMethod;

localStorage.setItem("pay_method", "tarjeta-credito");

const ERROR_MESSAGE = {
  name: {
    empty: "El nombre es requerido",
    noValid: "El nombre debe contener solamente letras"
  },
  lastName: {
    empty: "El apellido es requerido",
    noValid: "El apellido debe contener solamente letras"
  },
  email: {
    empty: "El email es requerido",
    noValid: "Ingrese un formato valido",
    existing: "El email ya está registrado"
  },
  username: {
    empty: "El usuario es requerido",
    noValid: "Ingrese un usuario que contenga letras y números",
    existing: "El nombre de usuario ya existe"
  },
  password: {
    empty: "La contraseña es requerida",
    noValid: "La contraseña debe tener al menos 8 caracteres, incluyendo al menos 2 letras, 2 números y 2 carácteres especiales",
    noMatch: "Las contraseñas no coinciden"
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
const inputCardName = document.querySelector('#tarjeta-nombre');
const inputCardVenc = document.querySelector('#tarjeta-venc');
const errorMsg = document.querySelector(".field-name .help");
const errorLastMsg = document.querySelector (".field-last_name .help");
const errorUserMsg = document.querySelector (".field-user .help");
const errorEmailMsg = document.querySelector(".field-email .help");
const errorPasswordMsg = document.querySelector(".field-password .help");
const errorRepeatPasswordMsg = document.querySelector(".field-repeat_password .help");
const errorCardKeyMsg = document.querySelector(".field-card_key .help");
const errorCardNumberMsg = document.querySelector(".field-card_number .help");

inputCardNumber.addEventListener("input", () => {
  fixCardNumberAndCvvLength()
})

function validateIfUsernameNotExists(input, errorMsg, errorElem) {
  let localStorageUsers = JSON.parse(localStorage.getItem("users_db"))


  if ( !localStorageUsers )
    return true;

  if ( localStorageUsers.findIndex(user => user.username == input.value) >= 0 ) {
    showError(input, errorElem, errorMsg);
    return false;
  } else {
    hideError(input, errorElem);
    return true;
  }
}

function validateIfEmailNotExists(input, errorMsg, errorElem) {
  let localStorageUsers = JSON.parse(localStorage.getItem("users_db"))

  if ( !localStorageUsers )
    return true;

  if ( localStorageUsers.findIndex(user => user.email == input.value) >= 0 ) {
    showError(input, errorElem, errorMsg);
    return false;
  } else {
    hideError(input, errorElem);
    return true;
  }
}

function validate(event) {  
  let isValid = true;

  isValid = isValid && validateField(inputName, REGEX_LETTERS, ERROR_MESSAGE.name.empty, ERROR_MESSAGE.name.noValid, errorMsg);
  isValid = isValid && validateField(inputLastName, REGEX_LETTERS, ERROR_MESSAGE.lastName.empty, ERROR_MESSAGE.lastName.noValid, errorLastMsg);
  isValid = isValid && validateField(inputEmail, REGEX_EMAIL, ERROR_MESSAGE.email.empty, ERROR_MESSAGE.email.noValid, errorEmailMsg);
  isValid = isValid && validateField(inputUserName, REGEX_USERNAME, ERROR_MESSAGE.username.empty, ERROR_MESSAGE.username.noValid, errorUserMsg);
  isValid = isValid && validatePassword(inputPassword, ERROR_MESSAGE.password.empty, ERROR_MESSAGE.password.noValid, errorPasswordMsg);
  isValid = isValid && validateIfUsernameNotExists(inputUserName, ERROR_MESSAGE.username.existing, errorUserMsg);
  isValid = isValid && validateIfEmailNotExists(inputEmail, ERROR_MESSAGE.email.existing, errorEmailMsg);

  if (inputRepeatPassword.value === "") {
    showError(inputRepeatPassword, errorRepeatPasswordMsg, ERROR_MESSAGE.password.empty);
    isValid = false;
  } else if (inputPassword.value !== inputRepeatPassword.value) {
    showError(inputRepeatPassword, errorRepeatPasswordMsg, ERROR_MESSAGE.password.noMatch);
    isValid = false;
  } else {
    hideError(inputRepeatPassword, errorRepeatPasswordMsg);
  }

  if ( CREDIT_INPUT.checked === true ) {
    isValid = validateField(inputCardKey, REGEX_CARD_KEY, ERROR_MESSAGE.cardKey.empty, ERROR_MESSAGE.cardKey.noValid, errorCardKeyMsg) && isValid;
    isValid = validateCardNumber(inputCardNumber, errorCardNumberMsg) && isValid;
  }

  if (isValid)
    return true
  else
    return false
}

function validatePassword(input, emptyMsg, invalidMsg, errorMsgElem) {
  if (input.value === "") {
    showError(input, errorMsgElem, emptyMsg);
    return false;
  } else if ( REGEX_ATLEAST2_LETTERS.test(input.value) && REGEX_ATLEAST2_NUMBERS.test(input.value) && REGEX_ATLEAST2_SPECIAL.test(input.value)) {
    hideError(input, errorMsgElem);
    return true;
  } else {
    showError(input, errorMsgElem, invalidMsg);
    return false;
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
  errorMsgElem.style.visibility = 'visible'
}

function hideError(input, errorMsgElem) {
  input.classList.remove("is-danger");
  errorMsgElem.classList.add("is-hidden");
  errorMsgElem.style.visibility = 'hidden'
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

const userInput = document.querySelector("#usuario");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector('#contraseña');

function validateFields() {
  const userValid = userInput.value.trim() !== '';
  const emailValid = emailInput.value.trim() !== '';
  
  submitBtn.disabled = !(userValid && emailValid);
}

function saveToLocalStorage() {
  const inputEmail = document.querySelector("#email");
  const inputUsername = document.querySelector('#usuario');
  const inputPassword = document.querySelector('#contraseña');
  const inputCvv = document.querySelector('#CVV');
  const inputCardNumber = document.querySelector('#tarjeta-numero');
  const inputCardName = document.querySelector('#tarjeta-nombre');
  const inputCardVenc = document.querySelector('#tarjeta-venc');

  const email = inputEmail.value.trim();
  const username = inputUsername.value.trim();
  const password = inputPassword.value.trim().hashCode();
  const card_cvv = inputCvv.value.trim();
  const card_number = inputCardNumber.value.trim();
  const card_name = inputCardName.value.trim();
  const card_venc = inputCardVenc.value.trim();

  if ( card_number )
    localStorage.setItem("pay_method_card", card_number)

  if ( card_cvv )
    localStorage.setItem("pay_method_cvv", card_cvv)

  if ( card_name )
    localStorage.setItem("pay_method_card_name", card_name)

  if ( card_venc )
    localStorage.setItem("pay_method_card_venc", card_venc)

  if ( username )
    localStorage.setItem('username', username);

  if ( email )
    localStorage.setItem('email', email);

  if ( password )
    localStorage.setItem('password', password);

  let newUser = {
    username: username,
    password: password,
    email: email,
    pay_method: actualPayMethod,
    pay_method_card: card_number,
    pay_method_cvv: card_cvv,
    pay_method_card_name: card_name,
    pay_method_card_venc: card_venc
  }

  if ( localStorage.getItem("users_db") ) {
    localStorageUsers = JSON.parse(localStorage.getItem("users_db"))

    localStorageUsers.push(newUser)
    localStorage.setItem( "users_db", JSON.stringify (localStorageUsers) )
  }
  else {
    let user_array = new Array()
    user_array.push(newUser)
    localStorage.setItem( "users_db", 
      JSON.stringify (
        [user_array[0]]
      )
    )
  }
}

userInput.addEventListener('input', validateFields);
emailInput.addEventListener('input', validateFields);
inputPassword.addEventListener('input', validateFields);

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();

  if ( validate(event) ) {
    saveToLocalStorage();
    window.location.href = "../index.html";
  }
});

function fixCardNumberAndCvvLength() {
  if ( inputCardNumber.value.length > 19 )
    inputCardNumber.value = inputCardNumber.value.substring(0, 19)
      
  if ( inputCardKey.value.length > 3 )
    inputCardKey.value = inputCardKey.value.substring(0, 3)

  if ( inputCardName.value.length > 50 )
    inputCardName.value = inputCardName.value.substring(0, 50)
}

const PAY_METHOD_SECTION = document.querySelector(".box.b .grid.b")
function showCardInfo() {
  PAY_METHOD_SECTION.style.display = 'flex'
  inputCardNumber.required = true
  inputCardKey.required = true
  inputCardVenc.required = true
  inputCardName.required = true
}

function hideCardInfo() {
  PAY_METHOD_SECTION.style.display = 'none'
  inputCardNumber.required = false
  inputCardKey.required = false
  inputCardVenc.required = false
  inputCardName.required = false
}

const PAY_METHODS_INPUTS = document.querySelectorAll('.box.b input[name="metodo-pago"]')
const CREDIT_INPUT = document.querySelector('.box.b .grid.a #tarjeta-credito')
const TRANSFER_INPUT = document.querySelector('.box.b .transferencia #transferencia')
const TRANSFER_P = document.querySelector('.box.b h4')

PAY_METHODS_INPUTS.forEach(input => {
  input.addEventListener("input", function() {
    localStorage.setItem("pay_method", input.value);
    actualPayMethod = input.value;

    if (CREDIT_INPUT.checked === true) {
        showCardInfo()
    } else
        hideCardInfo()

    if ( TRANSFER_INPUT.checked === true )
      TRANSFER_P.style.visibility = 'visible'
    else
      TRANSFER_P.style.visibility = 'hidden'
  })   
});

const savedUsername = localStorage.getItem('username');
const savedEmail = localStorage.getItem('email');
const savedPassword = localStorage.getItem('password');

if (savedUsername) {
  userInput.value = savedUsername;
}
if (savedEmail) {
  emailInput.value = savedEmail;
}
if (savedPassword){
  passwordInput.value = savedPassword;
}

validateFields();  // Asegura que el botón esté en el estado correcto al cargar la página