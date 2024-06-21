const RESET_FORM = document.querySelector('form');
const USERNAME_INPUT = document.getElementById('saveUsuario');
const EMAIL_INPUT = document.getElementById('saveEmail');  
const RESET_ERROR_MSG = document.getElementById('login-error-message');
const VISIBILITY_HIDDEN = 'hidden';
const VISIBILITY_VISIBLE = 'visible';

const LOGIN_ERROR_MESSAGES = {
    NOT_VALID_USERNAME: "El usuario ingresado no es correcto.",
    NOT_VALID_EMAIL: "El email ingresado no es correcto."
};

function isLoginInfoOk() {
    if (USERNAME_INPUT.value !== localStorage.getItem("savedUsername"))
        return LOGIN_ERROR_MESSAGES.NOT_VALID_USERNAME;
    
    if (EMAIL_INPUT.value !== localStorage.getItem("savedEmail"))
        return LOGIN_ERROR_MESSAGES.NOT_VALID_EMAIL;

    return "OK";
}

RESET_FORM.addEventListener('submit', function(event) {
    const savedUsername = USERNAME_INPUT.value.trim();
    const savedEmail = EMAIL_INPUT.value.trim();
    let error_msg = isLoginInfoOk();

    if (error_msg === 'OK') {
        RESET_ERROR_MSG.style.visibility = VISIBILITY_HIDDEN;
        localStorage.setItem('savedUsername', savedUsername);
        localStorage.setItem('savedEmail', savedEmail);
    } else {
        event.preventDefault();
        RESET_ERROR_MSG.style.visibility = VISIBILITY_VISIBLE;
        RESET_ERROR_MSG.textContent = error_msg;
        return false;
    }
}, false);
