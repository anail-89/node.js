import {getCurrentUserData} from '../api/user.js';

window.addEventListener('load', async () => {
    document.getElementById('log-out').addEventListener('click', function (){
        window.localStorage.removeItem('token');
        window.location.href = '/nodejs-frontend/login.html'
    });
    getCurrentUserData().then((response)=>{
        if(response.success === true){
            document.getElementById('user-name').innerText = response.data.name;
        }
    });

});
