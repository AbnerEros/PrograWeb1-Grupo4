pay_methods = document.querySelectorAll(".pay-method input")
input_credit = document.querySelector(".credit-card .credit-card-label input")
cvv_div = document.querySelector(".credit-card .credit-card-col2")
cvv = document.querySelector(".credit-card .credit-card-col2 input")
card_number = document.querySelector(".credit-card .input_style_1")
transfer_input = document.querySelector(".transfer input")
transfer_p = document.querySelector(".transfer p")
update_pay_method_btn = document.querySelector("#update-pay-method")
update_password_btn = document.querySelector("#update-password")

function changeCreditInfo() {
    if ( card_number.value.length == 16 && cvv.value.length == 3 && !isNaN(Number(card_number.value)) && !isNaN(Number(cvv.value)) )
        update_pay_method_btn.disabled = false;
    else
        update_pay_method_btn.disabled = true;
}

pay_methods.forEach(input => {
    input.addEventListener("change", function() {
        if (input_credit.checked == true) {
            card_number.style.display = 'block'
            card_number.required = true
            cvv_div.style.display = 'block'
            cvv.required = true
        } else {
            card_number.style.display = 'none'
            card_number.required = false
            cvv_div.style.display = 'none'
            cvv.required = false
        }

        if ( transfer_input.checked == true ) {
            transfer_p.style.visibility = 'visible'
        } else
            transfer_p.style.visibility = 'hidden'
    })   
});

transfer_p.style.visibility = 'hidden'
card_number.required = true
cvv.required = true
update_pay_method_btn.disabled = true;

card_number.addEventListener("input", changeCreditInfo)
cvv.addEventListener("input", changeCreditInfo)