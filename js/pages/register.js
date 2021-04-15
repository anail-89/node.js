import {register} from '../api/auth.js';
window.addEventListener('load', async ()=>{
	document.getElementById('register').addEventListener('click', (e)=>{
		const name = document.querySelector('input[name="name"]').value;
		const username = document.querySelector('input[name="username"]').value;
		const email = document.querySelector('input[name="email"]').value;
		const file = document.querySelector('input[name="image"]').files[0];
		const password = document.querySelector('input[name="password"]').value;
		const errorLabel = document.getElementById('error-label');
        errorLabel.innerText = '';
        let form = new FormData();
        form.append('name',name);
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        form.append('image', file);
        register(form).then( data=>{
		if(data.success === true){
			window.location.href = 'login.html';
		}else{
			errorLabel.innerText = data.message;
		}
		
	}).catch( e=> errorLabel.innerText = e.massage);

	});

	 
});