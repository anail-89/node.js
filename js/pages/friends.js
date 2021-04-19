import {getFriends} from '../api/friends.js';

document.body.addEventListener('userLoaded', async () => {
    const response = await getFriends();
    if (response.success){
        console.log(response.success);
        response.data.forEach(friend =>{

        });
    }
});
