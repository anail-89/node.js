import {activate} from '../api/auth.js';

window.addEventListener('load', async () => {
    const h1 = document.querySelector('h1');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('activation-code');
    if (token) {
        const response = await activate(token);
        if (response.success) {
            h1.innerText = 'Activated';
        } else {
            h1.innerText = response.message;
        }
    } else {
        h1.innerText = 'Code not provided';
    }
});
