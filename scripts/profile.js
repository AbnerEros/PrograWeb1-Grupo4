const PAY_METHODS_INPUTS = document.querySelectorAll(".pay-method input")
const CHANGE_PASSWORD_INPUTS = document.querySelectorAll(".change-password input")
const INPUT_CREDIT = document.querySelector(".credit-card .credit-card-label input")
const CVV_DIV = document.querySelector(".credit-card .credit-card-col2")
const CVV = document.querySelector(".credit-card .credit-card-col2 input")
const CARD_NUMBER = document.querySelector(".credit-card .input_style_1")
const TRANSFER_INPUT = document.querySelector(".transfer input")
const TRANSFER_P = document.querySelector(".transfer p")
const PAY_METHOD_BTN = document.querySelector("#update-pay-method")
const CHANGE_PASSWORD_BTN = document.querySelector("#update-password")
const USER_EMAIL = document.querySelector(".change-password input[id='email']")
const USER_ACTUAL_PASSWORD = document.querySelector(".change-password input[id='password']")
const USER_NEW_PASSWORD = document.querySelector(".change-password input[id='new-password']")
const USER_REPEAT_NEW_PASSWORD = document.querySelector(".change-password input[id='repeat-password']")
const REGEX_LETTERS = /^[A-Za-z]+$/i;
const REGEX_NUMBERS = /^[0-9]*$/;
const REGEX_ALPHANUM = /^\w+$/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_VISTA = document.location.href
const URL_GEN = new URL(URL_VISTA)
const PARAM_CUPON_PAGO = URL_GEN.searchParams.get("cupon-pago")
const PARAM_CARD_NUMBER = URL_GEN.searchParams.get("numero-tarjeta")
const PARAM_CVV_NUMBER = URL_GEN.searchParams.get("numero-cvv")
const PARAM_EMAIL = URL_GEN.searchParams.get("email")

function fixCardNumberAndCvvLength() {
    if ( CARD_NUMBER.value.length > 16 )
        CARD_NUMBER.value = CARD_NUMBER.value.substring(0, 16)
        
    if ( CVV.value.length > 3 )
        CVV.value = CVV.value.substring(0, 3)
}

function isCardInfoOk() {
    if ( CARD_NUMBER.value.length === 16 && CVV.value.length === 3 && !isNaN(Number(CARD_NUMBER.value)) && !isNaN(Number(CVV.value)) )
        return true
    
    return false
}

function isChangePasswordInfoOk() {
    if ( 
        REGEX_EMAIL.test(USER_EMAIL.value) && 
        REGEX_ALPHANUM.test(USER_ACTUAL_PASSWORD.value) && 
        REGEX_ALPHANUM.test(USER_NEW_PASSWORD.value) && 
        REGEX_ALPHANUM.test(USER_REPEAT_NEW_PASSWORD.value) && 
        USER_ACTUAL_PASSWORD.value != USER_NEW_PASSWORD.value &&
        USER_NEW_PASSWORD.value === USER_REPEAT_NEW_PASSWORD.value
    )
        return true
    
    return false
}

function showCardInfo() {
    CARD_NUMBER.style.display = 'block'
    CARD_NUMBER.required = true
    CVV_DIV.style.display = 'block'
    CVV.required = true
}

function hideCardInfo() {
    CARD_NUMBER.style.display = 'none'
    CARD_NUMBER.required = false
    CVV_DIV.style.display = 'none'
    CVV.required = false
}

function enablePaymentBtn() {
    PAY_METHOD_BTN.disabled = false;
}

function disablePaymentBtn() {
    PAY_METHOD_BTN.disabled = true;
}

function showPaymentModal() {
    // Muestro el modal de método de pago actualizado
    // Quiero guardar el método de pago del cliente en el localStorage y luego utilizarlo desde ahí
}

function showChangePasswordModal() {
    // Muestro el modal de contraseña actualizada
}

function setProfileDefaultValues() {
    TRANSFER_P.style.visibility = 'hidden'
    CARD_NUMBER.required = true
    CVV.required = true
    PAY_METHOD_BTN.disabled = true;
    CHANGE_PASSWORD_BTN.disabled = true;

    if ( localStorage.getItem("pay_method") ) {
        pay_method_selected = document.querySelector(`.pay-method input[id=${localStorage.getItem("pay_method")}]`)
    
        if ( pay_method_selected )
            pay_method_selected.checked = true
    
        if ( localStorage.getItem("pay_method") == "tarjeta-credito" ) {
            CARD_NUMBER.value = localStorage.getItem("pay_method_card")
            CVV.value = localStorage.getItem("pay_method_cvv")
        } else
            hideCardInfo()
        
        if ( localStorage.getItem("pay_method") == "transferencia" )
            visibleTransferCbu()
    } else
        hideCardInfo()
}

function visibleTransferCbu() {
    TRANSFER_P.style.visibility = 'visible'
}

function hiddenTransferCbu() {
    TRANSFER_P.style.visibility = 'hidden'
}

PAY_METHODS_INPUTS.forEach(input => {
    input.addEventListener("input", function() {
        if (INPUT_CREDIT.checked === true) {
            fixCardNumberAndCvvLength()
            showCardInfo()
            if ( isCardInfoOk() )
                enablePaymentBtn()
            else
                disablePaymentBtn()
        } else {
            hideCardInfo()
            enablePaymentBtn()
        }

        if ( TRANSFER_INPUT.checked === true ) 
            visibleTransferCbu()
        else
            hiddenTransferCbu()
    })   
});

CHANGE_PASSWORD_INPUTS.forEach(input => {
    input.addEventListener("input", function() {
        if ( isChangePasswordInfoOk() )
            CHANGE_PASSWORD_BTN.disabled = false;
        else
            CHANGE_PASSWORD_BTN.disabled = true;
    })
});

// Quiero mostrar un modal cuando recién hayas cambiado la contraseña o actualizado el método de pago
if ( URL_GEN ) {
    if ( PARAM_CUPON_PAGO ) {
        localStorage.setItem("pay_method", PARAM_CUPON_PAGO)
        console.log(PARAM_CUPON_PAGO)
        showPaymentModal()

        if ( PARAM_CUPON_PAGO == 'tarjeta-credito' ) {
            localStorage.setItem("pay_method_card", PARAM_CARD_NUMBER)
            localStorage.setItem("pay_method_cvv", PARAM_CVV_NUMBER)
        }
    }
    else if ( PARAM_EMAIL )
        showChangePasswordModal()
}

setProfileDefaultValues()