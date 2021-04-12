import {login} from '../api/auth.js';

window.addEventListener('load', async () => {
    const token = window.localStorage.getItem('token');
    if(token){
        window.location.href = '/frontend/home.html';
    }
    document.getElementById('login').addEventListener('click', async () => {
        const errorLabel = document.getElementById('error-label');
        errorLabel.innerText = '';
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        login(username, password).then(response => {
            if (response.success === true) {
                window.localStorage.setItem('token', response.data);
                window.location.href = '/frontend/home.html';
            } else {
                errorLabel.innerText = response.message;
            }
        });
    });
});
