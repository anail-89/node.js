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
               const response =  await resetPassword(token, newPassword);
               console.log(response);
              document.querySelector('label').innerText = response.message;
            }else{
                 document.querySelector('label').innerText = 'Pass or conform pass is not correct';
            }
            
        }  else {
            label.innerText = 'Code not provided';
        }
    });
});
