import {register} from '../api/auth.js';

window.addEventListener('load', async () => {
    const token = window.localStorage.getItem('token');
    if(token){
        window.location.href = '/nodejs-frontend/home.html';
    }
    document.getElementById('register').addEventListener('click', async () => {
        const errorLabel = document.getElementById('error-label');
        errorLabel.innerText = '';
        const username = document.querySelector('input[name="username"]').value;
        const name = document.querySelector('input[name="name"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const file = document.querySelector('input[name="image"]').files[0];
        const form = new FormData();
        form.append('password', password);
        form.append('username', username);
        form.append('name', name);
        form.append('image', file);

        register(form).then(data => {
            if (data.success === true) {
                window.location.href = '/nodejs-frontend/login.html';
            } else {
                errorLabel.innerText = data.message;
            }
        });
    });
});
