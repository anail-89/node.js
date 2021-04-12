import {resetPassword} from '../api/auth.js';

window.addEventListener('load', async () => {
    document.querySelector('button').addEventListener('click', async ()=>{
        const newPassword = document.querySelector('input[name="new-password"]').value;
        const repeatPassword = document.querySelector('input[name="repeat-password"]').value;
        const label = document.querySelector('label');
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('activation-code');
        if (token) {
            if (newPassword === repeatPassword) {
                await resetPassword(token, newPassword);
            }
            label.innerText = response.message;
        }  else {
            label.innerText = 'Code not provided';
        }
    });
});
