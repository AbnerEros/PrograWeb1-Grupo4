const PAY_METHODS_INPUTS = document.querySelectorAll(".pay-method input")
const CHANGE_PASSWORD_INPUTS = document.querySelectorAll(".change-password input")

const INPUT_CREDIT = document.querySelector(".credit-card .credit-card-label #tarjeta-credito")
const CVV_AND_VENC_DIV = document.querySelector(".credit-card .credit-card-col2")
const CVV = document.querySelector(".credit-card .credit-card-col2 #cvv")
const CARD_VENC = document.querySelector(".credit-card .credit-card-col2 #vencimiento")
const CARD_NUMBER = document.querySelector(".credit-card .input_style_1[type='number']")
const CARD_NAME_LABEL = document.querySelector(".credit-card .credit-card-col1 .name-label")
const CARD_NAME = document.querySelector(".credit-card .input_style_1[type='text']")
const USERNAME_H1 = document.querySelector(".user-name h1#username")
const PASSWORD_ERROR_MSG = document.querySelector("#password-error-message")
const PAY_METHOD_ERROR_MSG = document.querySelector("#pay-method-error-message")

const TRANSFER_INPUT = document.querySelector(".transfer input")
const TRANSFER_P = document.querySelector(".transfer p")
const PAY_METHOD_BTN = document.querySelector("#update-pay-method")
const CHANGE_PASSWORD_BTN = document.querySelector("#update-password")
const USER_EMAIL = document.querySelector(".change-password input[id='email']")
const USER_ACTUAL_PASSWORD = document.querySelector(".change-password input[id='password']")
const USER_NEW_PASSWORD = document.querySelector(".change-password input[id='new-password']")
const USER_REPEAT_NEW_PASSWORD = document.querySelector(".change-password input[id='repeat-password']")

const SHOW_PASSWORD_DELAY_TIME = 1500
const DELAY = ms => new Promise(res => setTimeout(res, ms));
const SHOW_MESSAGES = document.querySelectorAll(".show-password")

const REGEX_LETTERS_AND_SPACES = /^[a-zA-Z\s]*$/;
const REGEX_NUMBERS = /^[0-9]*$/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_YEAR_MONTH = /([12]\d{3}-(0[1-9]|1[0-2]))/
const REGEX_ATLEAST2_SPECIAL = /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/
const REGEX_ATLEAST2_LETTERS = /(?:[^a-zA-Z]*[a-zA-Z]){2}/
const REGEX_ATLEAST2_NUMBERS = /(?:[^\d]*[\d]){2}/
const REGEX_3_NUMBERS_NOT_ZERO = /^[1-9]{3}$/
const URL_VISTA = document.location.href
const URL_GEN = new URL(URL_VISTA)

const PARAM_CUPON_PAGO = URL_GEN.searchParams.get("cupon-pago")
const PARAM_CARD_NUMBER = URL_GEN.searchParams.get("numero-tarjeta")
const PARAM_CVV_NUMBER = URL_GEN.searchParams.get("numero-cvv")
const PARAM_EMAIL = URL_GEN.searchParams.get("email")
const PARAM_NEW_PASSWORD = URL_GEN.searchParams.get("new-password")
const PARAM_CARD_NAME = URL_GEN.searchParams.get("nombre-tarjeta")
const PARAM_CARD_VENC = URL_GEN.searchParams.get("vencimiento")

const ENABLE_STATE = 1
const DISABLE_STATE = 0
const HIDDEN_ELEMENT = 'hidden'
const VISIBLE_ELEMENT = 'visible'

const TODAY_DATE = new Date()
const TODAY_DAY = TODAY_DATE.getUTCDate()
const TODAY_MONTH = TODAY_DATE.getUTCMonth() + 1
const TODAY_YEAR = TODAY_DATE.getUTCFullYear()

function fixCardNumberAndCvvLength() {
    if ( CARD_NUMBER.value.length > 16 )
        CARD_NUMBER.value = CARD_NUMBER.value.substring(0, 16)
        
    if ( CVV.value.length > 3 )
        CVV.value = CVV.value.substring(0, 3)

    if ( CARD_NAME.value.length > 50 )
        CARD_NAME.value = CARD_NAME.value.substring(0, 50)
}

function sumNumbersInString(str) {
    let sum = 0;

    for (char in str) {
        if ( Number.isInteger( Number(str[char])) )
            sum += Number(str[char])
    }

    return sum;
}

function isCardInfoOk() {
    let date_venc = new Date(CARD_VENC.value)
    month_venc = date_venc.getUTCMonth() + 1
    year_venc = date_venc.getUTCFullYear()
    let sumCardNumbers;
    
    if ( !isNaN(Number(CARD_NUMBER.value)) )
        sumCardNumbers = sumNumbersInString( String(CARD_NUMBER.value.substring(0, CARD_NUMBER.value.length - 1)) )

    if ( sumCardNumbers % 2 == 0 && CARD_NUMBER.value.substring(CARD_NUMBER.value.length - 1, CARD_NUMBER.value.length) % 2 == 0 )
        return "Si la suma de los números de la tarjeta (sin incluir el último) es par, el último número debe ser par"
    
    if ( sumCardNumbers % 2 == 1 && CARD_NUMBER.value.substring(CARD_NUMBER.value.length - 1, CARD_NUMBER.value.length) % 2 == 1 )
        return "Si la suma de los números de la tarjeta (sin incluir el último) es impar, el último número debe ser par"

    if ( CARD_NUMBER.value.length < 16 || CARD_NUMBER.value.length > 19 )
        return "El número de la tarjeta debe tener entre 16 y 19 caracteres de longitud."

    if ( CVV.value.length != 3 )
        return "El número de CVV/CVC debe tener 3 caracteres de longitud."

    if ( !REGEX_3_NUMBERS_NOT_ZERO.test(CVV.value) )
        return "El número de CVV/CVC debe ser de 3 números distintos de 0 (cero)."

    if ( isNaN(Number(CARD_NUMBER.value)) )
        return "El número de la tarjeta sólo debe contener números."

    if ( isNaN(Number(CVV.value)) )
        return "El número de CVV/CVC sólo debe contener números."

    if ( !REGEX_LETTERS_AND_SPACES.test(CARD_NAME.value) )
        return "El nombre del titular debe contener sólo letras y espacios."

    if ( !REGEX_YEAR_MONTH.test(CARD_VENC.value) )
        return "El mes de vencimiento debe tener el formato correcto."

    if ( !(month_venc >= TODAY_MONTH && year_venc == TODAY_YEAR ) || !(year_venc > TODAY_YEAR) )
        return "El mes de vencimiento debe ser mayor o igual al mes actual."

    return "OK"
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

function isChangePasswordInfoOk() {
    if ( !REGEX_EMAIL.test(USER_EMAIL.value) )
        return "Formato inválido de email."

    if ( !USER_ACTUAL_PASSWORD.value )
        return "Debe ingresar la contraseña actual."

    if ( USER_ACTUAL_PASSWORD.value.hashCode() != localStorage.getItem("password") )
        return "La contraseña actual es incorrecta."

    if ( USER_NEW_PASSWORD.value.length < 8 )
        return "La nueva contraseña debe tener al menos 8 caracteres de longitud."

    if ( !REGEX_ATLEAST2_LETTERS.test(USER_NEW_PASSWORD.value) || !REGEX_ATLEAST2_SPECIAL.test(USER_NEW_PASSWORD.value) || !REGEX_ATLEAST2_NUMBERS.test(USER_NEW_PASSWORD.value) )
        return "La nueva contraseña debe contener al menos 2 letras, 2 números y 2 caracteres especiales."

    if ( USER_NEW_PASSWORD.value != USER_REPEAT_NEW_PASSWORD.value )
        return "La nueva contraseña debe escribirse igual ambas veces."

    if ( USER_ACTUAL_PASSWORD.value == USER_NEW_PASSWORD.value )
        return "La nueva contraseña debe ser diferente a la actual."

    return "OK"
}

function showCardInfo() {
    CARD_NUMBER.style.display = 'block'
    CARD_NUMBER.required = true
    CVV_AND_VENC_DIV.style.display = 'block'
    CVV.required = true
    CARD_VENC.required = true
    CARD_NAME.style.display = 'block'
    CARD_NAME.required = true
    CARD_NAME_LABEL.style.display = 'block'
}

function hideCardInfo() {
    CARD_NUMBER.style.display = 'none'
    CARD_NUMBER.required = false
    CVV_AND_VENC_DIV.style.display = 'none'
    CVV.required = false
    CARD_VENC.required = false
    CARD_NAME.style.display = 'none'
    CARD_NAME.required = false
    CARD_NAME_LABEL.style.display = 'none'
}

function changeBtnState(btn, state) {
    if ( state )
        btn.disabled = false;
    else
        btn.disabled = true;
}

function changeVisibility(element, visibility) {
    element.style.visibility = visibility
}

async function showPassword(input) {
    input.type = 'text';
    await DELAY(SHOW_PASSWORD_DELAY_TIME);
    input.type = 'password';
}

function showPaymentModal() {
    // Muestro el modal de método de pago actualizado
    // Quiero guardar el método de pago del cliente en el localStorage y luego utilizarlo desde ahí
}

function showChangePasswordModal() {
    // Muestro el modal de contraseña actualizada
}

function setDefaultProfileValues() {
    USERNAME_H1.textContent = localStorage.getItem("username")
    changeVisibility(TRANSFER_P, HIDDEN_ELEMENT)
    CARD_NUMBER.required = true
    CARD_NAME.required = true
    CVV.required = true
    CARD_VENC.required = true
    PAY_METHOD_BTN.disabled = true;
    CHANGE_PASSWORD_BTN.disabled = true;

    if ( localStorage.getItem("pay_method") ) {
        pay_method_selected = document.querySelector(`.pay-method input[id=${localStorage.getItem("pay_method")}]`)
    
        if ( pay_method_selected )
            pay_method_selected.checked = true
    
        if ( localStorage.getItem("pay_method") == "tarjeta-credito" ) {
            CARD_NUMBER.value = localStorage.getItem("pay_method_card")
            CVV.value = localStorage.getItem("pay_method_cvv")
            CARD_NAME.value = localStorage.getItem("pay_method_card_name")
            CARD_VENC.value = localStorage.getItem("pay_method_card_venc")
        } else
            hideCardInfo()
        
        if ( localStorage.getItem("pay_method") == "transferencia" )
            changeVisibility(TRANSFER_P, VISIBLE_ELEMENT)
    } else
        hideCardInfo()
}

function setDefaultListeners() {
    PAY_METHODS_INPUTS.forEach(input => {
        input.addEventListener("input", function() {
            if (INPUT_CREDIT.checked === true) {
                fixCardNumberAndCvvLength()
                showCardInfo()
                pay_method_error_msg = isCardInfoOk()
                if ( pay_method_error_msg == "OK" ) {
                    changeVisibility(PAY_METHOD_ERROR_MSG, HIDDEN_ELEMENT)
                    changeBtnState(PAY_METHOD_BTN, ENABLE_STATE)
                } else {
                    PAY_METHOD_ERROR_MSG.textContent = pay_method_error_msg
                    changeVisibility(PAY_METHOD_ERROR_MSG, VISIBLE_ELEMENT)
                    changeBtnState(PAY_METHOD_BTN, DISABLE_STATE)
                }
            } else {
                hideCardInfo()
                changeBtnState(PAY_METHOD_BTN, ENABLE_STATE)
            }
    
            if ( TRANSFER_INPUT.checked === true )
                changeVisibility(TRANSFER_P, VISIBLE_ELEMENT)
            else
                changeVisibility(TRANSFER_P, HIDDEN_ELEMENT)
        })   
    });
    
    CHANGE_PASSWORD_INPUTS.forEach(input => {
        input.addEventListener("input", function() {
            let password_error_msg = isChangePasswordInfoOk()
            if ( password_error_msg === "OK" ) {
                changeVisibility(PASSWORD_ERROR_MSG, HIDDEN_ELEMENT)
                changeBtnState(CHANGE_PASSWORD_BTN, ENABLE_STATE)
            } else {
                PASSWORD_ERROR_MSG.textContent = password_error_msg
                changeVisibility(PASSWORD_ERROR_MSG, VISIBLE_ELEMENT)
                changeBtnState(CHANGE_PASSWORD_BTN, DISABLE_STATE)
            }
        })
    });
    
    SHOW_MESSAGES.forEach(h4 => {
        h4.addEventListener("click", async function() {
            switch( h4.id ) {
                case 'show-password':
                    showPassword(USER_ACTUAL_PASSWORD)
                    break;
                case 'show-new-password':
                    showPassword(USER_NEW_PASSWORD)
                    break;
                case 'show-repeat-password':
                    showPassword(USER_REPEAT_NEW_PASSWORD)
                    break;
            }
        })
    });
}

function setDefaultParamCatcher() {
    // Quiero mostrar un modal cuando recién hayas cambiado la contraseña o actualizado el método de pago
    if ( URL_GEN ) {
        if ( PARAM_CUPON_PAGO ) {
            localStorage.setItem("pay_method", PARAM_CUPON_PAGO)
            showPaymentModal()
    
            if ( PARAM_CUPON_PAGO == 'tarjeta-credito' ) {
                localStorage.setItem("pay_method_card", PARAM_CARD_NUMBER)
                localStorage.setItem("pay_method_cvv", PARAM_CVV_NUMBER)
                localStorage.setItem("pay_method_card_name", PARAM_CARD_NAME)
                localStorage.setItem("pay_method_card_venc", PARAM_CARD_VENC)
                CARD_NUMBER.value = PARAM_CARD_NUMBER
                CVV.value = PARAM_CVV_NUMBER
                CARD_NAME.value = PARAM_CARD_NAME
                CARD_VENC.value = PARAM_CARD_VENC
            }
        }
        else if ( PARAM_EMAIL ) {
            localStorage.setItem("update_password_email", PARAM_EMAIL)
            localStorage.setItem("update_password_password", PARAM_NEW_PASSWORD)
            showChangePasswordModal()
        }
    }
}

setDefaultListeners()
setDefaultProfileValues()
setDefaultParamCatcher()