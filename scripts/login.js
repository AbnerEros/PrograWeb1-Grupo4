const LOGIN_FORM = document.querySelector('form');
const LOGIN_ERROR_MSG = document.querySelector("#login-error-message")
const VISIBILITY_HIDDEN = 'hidden'
const VISIBILITY_VISIBLE = 'visible'

const LOGIN_ERROR_MESSAGES = {
    NOT_VALID_USERNAME: "El usuario ingresado no es correcto.",
    NOT_VALID_PASSWORD: "La contraseña ingresada no es correcta."
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

function isLoginInfoOk(){
    let USERNAME_INPUT = document.getElementById ('username');
    let PASSWORD_INPUT = document.getElementById ('password');  

    if (USERNAME_INPUT.value != localStorage.getItem("username"))
        return LOGIN_ERROR_MESSAGES.NOT_VALID_USERNAME
    
    if (PASSWORD_INPUT.value.hashCode() != localStorage.getItem("password"))
        return LOGIN_ERROR_MESSAGES.NOT_VALID_PASSWORD

    return "OK"
}

LOGIN_FORM.addEventListener('submit', function(event) {
    let USERNAME_INPUT = document.getElementById ('username');
    let PASSWORD_INPUT = document.getElementById ('password');

    const savedUsername = USERNAME_INPUT.value.trim();
    const savedPassword = PASSWORD_INPUT.value.trim();
    let error_msg = isLoginInfoOk()
    console.log(error_msg)

    if ( error_msg === 'OK' ) {
        LOGIN_ERROR_MSG.style.visibility = VISIBILITY_HIDDEN;
        localStorage.setItem('username', savedUsername);
        localStorage.setItem('password', savedPassword.hashCode());
    } else {
        event.preventDefault();
        LOGIN_ERROR_MSG.style.visibility = VISIBILITY_VISIBLE;
        LOGIN_ERROR_MSG.textContent = error_msg;
        return false;
    }
}, false);