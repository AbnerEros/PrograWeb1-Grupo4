const VISIBILITY_HIDDEN = 'hidden';
const VISIBILITY_VISIBLE = 'visible';
const DISPLAY_NONE = 'none'
const DISPLAY_FLEX = 'flex'
const MODAL_RESET_PASSWORD = document.querySelector("#reset-password-modal")
const MODAL_DELETE_SUSCRIPTION_LOGIN = document.querySelector("#reset-password-modal #reset-password-modal-btn-login")
const MODAL_DELETE_SUSCRIPTION_BACK = document.querySelector("#reset-password-modal #reset-password-modal-btn-back")
const USERNAME_INPUT = document.getElementById('saveUsuario');
const EMAIL_INPUT = document.getElementById('saveEmail');  

const LOGIN_ERROR_MESSAGES = {
    NOT_VALID_USERNAME: "El usuario ingresado no existe.",
    NOT_VALID_EMAIL: "El email ingresado no corresponde al usuario ingresado."
};

function isLoginInfoOk() {
    let localStorageUsers = JSON.parse(localStorage.getItem("users_db"))
    let actualUser = localStorageUsers.findIndex(user => user.username == USERNAME_INPUT.value)

    if ( actualUser < 0 )
        return LOGIN_ERROR_MESSAGES.NOT_VALID_USERNAME

    if ( EMAIL_INPUT.value != localStorageUsers[actualUser].email )
        return LOGIN_ERROR_MESSAGES.NOT_VALID_EMAIL

    return "OK";
}

function showResetPasswordModal() {
    MODAL_RESET_PASSWORD.style.display = DISPLAY_FLEX;
}

function hideResetPasswordModal() {
    MODAL_RESET_PASSWORD.style.display = DISPLAY_NONE;
}

MODAL_DELETE_SUSCRIPTION_LOGIN.addEventListener('click', function() {
    window.location.href = "../index.html";
});

MODAL_DELETE_SUSCRIPTION_BACK.addEventListener('click', function() {
    hideResetPasswordModal();
});

const RESET_FORM = document.querySelector('form');
RESET_FORM.addEventListener('submit', function(event) {
    event.preventDefault()
    const RESET_ERROR_MSG = document.getElementById('login-error-message');
    let error_msg = isLoginInfoOk();

    if (error_msg === 'OK') {
        RESET_ERROR_MSG.style.visibility = VISIBILITY_HIDDEN;
        showResetPasswordModal();
        USERNAME_INPUT.value = ''
        EMAIL_INPUT.value = ''
    } else {
        RESET_ERROR_MSG.style.visibility = VISIBILITY_VISIBLE;
        RESET_ERROR_MSG.textContent = error_msg;
        return false;
    }
}, false);
