const LOGIN_FORM = document.querySelector('form');
const USERNAME_INPUT = document.getElementById ('username');
const PASSWORD_INPUT = document.getElementById ('password');  
const LOGIN_ERROR_MSG = document.querySelector("#login-error-message")

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
    if (USERNAME_INPUT.value != localStorage.getItem("username"))
        return "El usuario ingresado no es correcto."
    
    if (PASSWORD_INPUT.value.hashCode() != localStorage.getItem("password"))
        return "La contraseña ingresada no es correcta."

    return "OK"
}

LOGIN_FORM.addEventListener('submit', function(event) {
    const username = USERNAME_INPUT.value.trim();
    const password = PASSWORD_INPUT.value.trim();
    let error_msg = isLoginInfoOk()

    if ( error_msg === 'OK' ) {
        LOGIN_ERROR_MSG.style.visibility = 'hidden';
        localStorage.setItem('username', username);
        localStorage.setItem('password', password.hashCode());
    } else {
        event.preventDefault();
        LOGIN_ERROR_MSG.textContent = error_msg;
        return false
    }
}, false);