const REGEX_LETTERS = /^[A-Za-z]+$/i;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_USERNAME = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

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
  const errorMsg = document.querySelector(".field-name .help");
  const errorLastMsg = document.querySelector (".field-last_name .help")
  const errorUserMsg = document.querySelector (".field-user .help")
  const errorEmailMsg = document.querySelector(".field-email .help");
  const errorPasswordMsg = document.querySelector(".field-password .help");
  const errorRepeatPasswordMsg = document.querySelector(".field-repeat_password .help");

  if (inputName.value === "") {
    inputName.classList.add("is-danger");
    errorMsg.classList.remove("is-hidden");
    errorMsg.textContent = ERROR_MESSAGE.name.empty;
    inputName.focus();
  } else {
    inputName.classList.remove("is-danger");
    errorMsg.classList.add("is-hidden");
  }

  if (inputLastName.value === "") {
    inputLastName.classList.add("is-danger");
    errorLastMsg.classList.remove("is-hidden");
    errorLastMsg.textContent = ERROR_MESSAGE.lastName.empty;
    inputLastName.focus();
  } else {
    inputLastName.classList.remove("is-danger");
    errorLastMsg.classList.add("is-hidden");
  }

  if (inputUserName.value === "") {
    inputUserName.classList.add("is-danger");
    errorUserMsg.classList.remove("is-hidden");
    errorUserMsg.textContent = ERROR_MESSAGE.username.empty;
    inputUserName.focus();
  } else {
    inputUserName.classList.remove("is-danger");
    errorUserMsg.classList.add("is-hidden");
  }

  if (inputEmail.value === "") {
    inputEmail.classList.add("is-danger");
    errorEmailMsg.classList.remove("is-hidden");
    errorEmailMsg.textContent = ERROR_MESSAGE.email.empty;
    inputEmail.focus();
  }

  if (!letterValidate(inputName.value)) {
    errorMsg.classList.remove("is-hidden");
    inputName.classList.add("is-danger");
    errorMsg.textContent = `${ERROR_MESSAGE.name.noValid} ${ERROR_MESSAGE.name.empty}`;
    inputName.focus();
  }

  if (!letterValidate(inputLastName.value)) {
    errorMsg.classList.remove("is-hidden");
    inputLastName.classList.add("is-danger");
    errorLastMsg.textContent = `${ERROR_MESSAGE.lastName.noValid} ${ERROR_MESSAGE.lastName.empty}`;
    inputLastName.focus();
  }

  if (!letterValidate(inputUserName.value)) {
    errorUserMsg.classList.remove("is-hidden");
    inputUserName.classList.add("is-danger");
    errorUserMsg.textContent = `${ERROR_MESSAGE.name.noValid} ${ERROR_MESSAGE.usernamename.empty}`;
    inputName.focus();
  }

  if (!emailValidate(inputEmail.value)) {
    errorEmailMsg.classList.remove("is-hidden");
    errorEmailMsg.textContent = ERROR_MESSAGE.email.noValid;
  } else {
    inputEmail.classList.remove("is-danger");
    errorEmailMsg.classList.add("is-hidden");
  }

  if (inputPassword.value === "") {
    inputPassword.classList.add("is-danger");
    errorPasswordMsg.classList.remove("is-hidden");
    errorPasswordMsg.textContent = ERROR_MESSAGE.password.empty;
    inputPassword.focus();
  } else if (!passwordValidate(inputPassword.value)) {
    inputPassword.classList.add("is-danger");
    errorPasswordMsg.classList.remove("is-hidden");
    errorPasswordMsg.textContent = ERROR_MESSAGE.password.noValid;
    inputPassword.focus();
  } else {
    inputPassword.classList.remove("is-danger");
    errorPasswordMsg.classList.add("is-hidden");
  }

  if (inputRepeatPassword.value === "") {
    inputRepeatPassword.classList.add("is-danger");
    errorRepeatPasswordMsg.classList.remove("is-hidden");
    errorRepeatPasswordMsg.textContent = ERROR_MESSAGE.password.empty;
    inputRepeatPassword.focus();
  } else if (inputPassword.value !== inputRepeatPassword.value) {
    inputRepeatPassword.classList.add("is-danger");
    errorRepeatPasswordMsg.classList.remove("is-hidden");
    errorRepeatPasswordMsg.textContent = ERROR_MESSAGE.password.noMatch;
    inputRepeatPassword.focus();
  } else {
    inputRepeatPassword.classList.remove("is-danger");
    errorRepeatPasswordMsg.classList.add("is-hidden");
  }

  if (isValid) {
    // Aquí puedes manejar el envío del formulario si todos los campos son válidos
    console.log("Formulario válido y listo para enviar.");
  }
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
