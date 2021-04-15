import {forgotPassword} from '../api/auth.js';

window.addEventListener('load', async () => {
    document.querySelector('button').addEventListener('click', async ()=>{
        const email = document.querySelector('input').value;
        const response = await forgotPassword(email);

        document.querySelector('label').innerText = response.message;
    });
});
