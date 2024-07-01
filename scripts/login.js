const LOGIN_FORM = document.querySelector('form');
const LOGIN_ERROR_MSG = document.querySelector("#login-error-message")
const VISIBILITY_HIDDEN = 'hidden'
const VISIBILITY_VISIBLE = 'visible'

const LOGIN_ERROR_MESSAGES = {
    NOT_VALID_USERNAME: "El usuario ingresado no existe.",
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
    let localStorageUsers = JSON.parse(localStorage.getItem("users_db"))
    let actualUser = localStorageUsers.findIndex(user => user.username == USERNAME_INPUT.value)

    if ( actualUser < 0 )
        return LOGIN_ERROR_MESSAGES.NOT_VALID_USERNAME

    if ( PASSWORD_INPUT.value.hashCode() != localStorageUsers[actualUser].password )
        return LOGIN_ERROR_MESSAGES.NOT_VALID_PASSWORD

    return "OK"
}

LOGIN_FORM.addEventListener('submit', function(event) {
    let USERNAME_INPUT = document.getElementById('username');
    const savedUsername = USERNAME_INPUT.value.trim();

    let error_msg = isLoginInfoOk()

    if ( error_msg === 'OK' ) {
        LOGIN_ERROR_MSG.style.visibility = VISIBILITY_HIDDEN;

        let storage_users = JSON.parse(localStorage.getItem("users_db"))
        let actual_id = storage_users.findIndex(user => user.username == savedUsername)
        let actual_user = storage_users[actual_id]

        localStorage.setItem('username', actual_user.username);
        localStorage.setItem('password', actual_user.password);


        if ( actual_user.username )
            localStorage.setItem('username', actual_user.username);

        if ( actual_user.email )
            localStorage.setItem('email', actual_user.email);

        if ( actual_user.password )
            localStorage.setItem('password', actual_user.password);

        if ( actual_user.pay_method )
            localStorage.setItem("pay_method", actual_user.pay_method);

        if ( actual_user.pay_method_card )
            localStorage.setItem("pay_method_card", actual_user.pay_method_card)

        if ( actual_user.pay_method_cvv )
            localStorage.setItem("pay_method_cvv", actual_user.pay_method_cvv)

        if ( actual_user.pay_method_card_name )
            localStorage.setItem("pay_method_card_name", actual_user.pay_method_card_name)

        if ( actual_user.pay_method_card_venc )
            localStorage.setItem("pay_method_card_venc", actual_user.pay_method_card_venc)
    } else {
        event.preventDefault();
        LOGIN_ERROR_MSG.style.visibility = VISIBILITY_VISIBLE;
        LOGIN_ERROR_MSG.textContent = error_msg;
        return false;
    }
}, false);