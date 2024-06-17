document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById ('nombre');
    const lastnameInput = document.getElementById ('apellido');
    const errorMessage = document.getElementById ('error-message');

    nameInput.addEventListener('input', function(event) {
        const nombre = nameInput.value.trim();
        const isValid = /^[A-Za-z]+$/i.test('nombre');

        if(!isValid){
            errorMessage.textContent = 'el nombre de usuario solo puede contener letras.';
            nameInput.setCustomValidity ('El nombre de usuario solo puede contener letras');
        } else {
            errorMessage.textContent = '';
            nameInput.setCustomValidity ('');
        }


        });
    
        lastnameInput.addEventListener ('input', function(event){
            const apellido = lastnameInput.value.trim();
            const isValid = /^[A-Za-z]+$/.test('apellido')

            if(!isValid){
                errorMessage.textContent = 'el apellido de usuario solo puede contener letras.';
                nameInput.setCustomValidity ('El apellido de usuario solo puede contener letras');
            } else {
                errorMessage.textContent = '';
                nameInput.setCustomValidity ('');
            }

        });

});







