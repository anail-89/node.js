import {getCurrentUserData,findUsers

} from '../api/user.js';

window.addEventListener('load', async () => {
    document.getElementById('log-out').addEventListener('click', function (){
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    });
    getCurrentUserData().then((response)=>{
        if(response.success === true){
            document.getElementById('user-name').innerText = response.data.name;
        }
    });


    const search = document.querySelector('input[name="find-friend"]');
    const tbody = document.querySelector('#users tbody');
    const requestClicks = () => {
        const buttons = tbody.querySelectorAll('button.friend-request');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', async (e) => {
                const userId = e.target.getAttribute('user-id');
                const response = await friendRequest(userId);
                console.log(response);
            });
        }
    }
    search.addEventListener('input', async () => {
        if (search.value.length > 0) {
            const response = await findUsers(search.value); console.log(response);
            if (response.data) {
                let innerHTML = '';
                response.data.map(user => {
                    innerHTML += `<tr>
                            <td>${user.name}</td>
                            <td>
                                ${
                        currentUser.friends.includes(user._id) ? 'Friends' :
                            currentUser.sentFriendRequests.includes(user._id) ? 'request sent':`
                <button class="friend-request" user-id="${user._id}">Friend Request</button>`
                                    }
                                            </td>
                                        </tr>`;
                });
                tbody.innerHTML = innerHTML;
                requestClicks();
            }
        } else {
            tbody.innerHTML = '';
        }
    });

});
