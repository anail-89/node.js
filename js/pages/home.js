import {getCurrentUserData,findUsers,friendRequest, getFriendRequests

} from '../api/user.js';

window.addEventListener('load', async () => {
    document.getElementById('log-out').addEventListener('click', function (){
        window.localStorage.removeItem('token');
        window.location.replace('localhost/frontend/login.html');
    });
    getCurrentUserData().then((response)=>{
        if(response.success === true){
            document.getElementById('user-name').innerText = response.data.name;
        }
    });
    getFriendRequests().then((response) => { console.log(response);
        const tbody = document.querySelector('#requests tbody');
        const acceptClicks = () => {
            const buttons = tbody.querySelectorAll('button.accept-request');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', async (e) => {
                    const to = e.target.getAttribute('user-id');
                    const response = await acceptFriendRequests(to);
                    if (response.success) {
                        alert('declined');
                    }
                });
            }
        }
        const declineClicks = () => {
            const buttons = tbody.querySelectorAll('button.decline-request');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', async (e) => {
                    const to = e.target.getAttribute('user-id');
                    const response = await declineFriendRequests(to);
                    if (response.success) {
                        alert('declined');
                    }
                });
            }
        }
        if (response.data) {
            let innerHTML = '';
            response.data.map(user => {
                innerHTML += `<tr>
                            <td>${user.name}</td>
                            <td>
                                <button class="accept-request" user-id="${user._id}" >Accept Request</button>
                                <button class="decline-request" user-id="${user._id}" >Decline Request</button>
                            </td>
                        </tr>`;
            });
            tbody.innerHTML = innerHTML;
            acceptClicks();
            declineClicks();
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
            const response = await findUsers(search.value);
            if (response.data) {
                let innerHTML = ''; 
                response.data.map(user => {
                    innerHTML += `<tr>
                            <td>${user.name}</td>
                            <td>
                                <button class="friend-request" user-id="${user._id}" >Friend Request</button>
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
