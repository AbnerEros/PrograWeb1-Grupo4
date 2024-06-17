document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.getElementById ('wrapper');
    const nameInput = document.getElementById ('nombre');
    const lastnameInput = document.getElementById ('apellido');
    const emailInput = document.getElementById ('email');
    const submitButton = document.getElementById ('btn');
    const errorMessage = document.getElementById ('error-message');

    const validateInput = (input, pattern) => {
        const value = input.value.trim();
        const isValid = pattern.test(value);
        return isValid;
    };

    const checkFormValidity = () => {
        const isFirstNameValid = validateInput (nameInput, /^[A-Za-z]+$/);
        const isLastNameValid = validateInput (lastnameInput,  /^[A-Za-z]+$/);
        const isEmailValid = validateInput (emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/ );

        if (isFirstNameValid && isLastNameValid && isEmailValid){
            errorMessage.textContent = '';
            submitButton.disabled = false;
        } else {
            if (!isValid || isLastNameValid){
                errorMessage.textContent = "El nombre y el apellido solo pueden contener letras.";
            } else if (!isEmailValid){
                errorMessage.textContent = "Por favor, introduce un correo electronico válido.";
            }
            submitButton.disabled = true;
            }
        };

        nameInput.addEventListener ('input', checkFormValidity);
        lastnameInput.addEventListener ('input', checkFormValidity);
        emailInput.addEventListener ('input', checkFormValidity);

        wrapper.addEventListener ('submit', function (event){
            event.preventDefault();

            const nombre = nameInput.value.trim();
            const apellido = lastnameInput.value.trim();
            const email = emailInput.value.trim();
            
            if (nombre && apellido && email &&
                /^[A-Za-z]+$/.test(firstName) && 
                /^[A-Za-z]+$/.test(lastName) && 
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Formulario enviado correctamente.');
                // Aquí puedes manejar el envío del formulario
            } else {
                errorMessage.textContent = 'Por favor, completa los campos correctamente.';
            }      
        
    });
    






});
