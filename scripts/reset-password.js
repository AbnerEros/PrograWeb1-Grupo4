document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.querySelector('#usuario');
    const emailInput = document.querySelector('#email');
    const submitBtn = document.querySelector('#btn');
    
    function validateFields() {
        const userValid = userInput.value.trim() !== '';
        const emailValid = emailInput.value.trim() !== '';
        submitBtn.disabled = !(userValid && emailValid);
    }
    
    userInput.addEventListener('input', validateFields);
    emailInput.addEventListener('input', validateFields);
});
