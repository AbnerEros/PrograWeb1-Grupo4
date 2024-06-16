document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById ('username');    

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim(); 

        if (username) {
            localStorage.setItem('username', username); 
            alert('Nombre de usuario almacenado en localStorage.');
           
        } else {
            document.getElementById('error-message').textContent = 'Por favor, ingresa tu nombre de usuario.';
        }
    });
});

