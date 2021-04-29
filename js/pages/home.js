import {getCurrentUserData,findUsers,friendRequest, getFriendRequests, findSendFriendRequestUsers
    ,acceptFriendRequests,declineFriendRequests,getFriends 

} from '../api/user.js';

window.addEventListener('load', async () => {
    let sentFrinedRequestUsersArray = [];
    let friendsArray = [];
    document.getElementById('log-out').addEventListener('click', function (){
        window.localStorage.removeItem('token');
        window.location.replace('/login.html');
    });
    getFriends().then( (response)=>{
        if(response.data.length > 0 ){
            response.data.forEach( elem =>{
                friendsArray.push( elem._id );
            });
        }

    });
    getCurrentUserData().then((response)=>{
        if(response.success === true){
            document.getElementById('user-name').innerText = response.data.name;
        }
    });
    findSendFriendRequestUsers().then( (response)=>{
        if( response && response.data && response.data.length > 0){ 
            sentFrinedRequestUsersArray = response.data;
        }
        
    }).catch( (e)=>{
        console.error(e.message);
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
                        alert('accepted');
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
                    switch(true){
                        case sentFrinedRequestUsersArray.includes(user._id ):
                            innerHTML += `<tr>
                                <td>${user.name}</td>
                                <td>
                                    <span class="sent" user-id="${user._id}" >Waiting for accept</span>
                                </td>
                            </tr>`;
                            break;
                        case friendsArray.includes(user._id ):
                            innerHTML += `<tr>
                            <td>${user.name}</td>
                            <td>
                                <span class="sent" user-id="${user._id}" >Friend</span>
                            </td>
                            </tr>`;
                            break;
                        default:
                            innerHTML += `<tr>
                                <td>${user.name}</td>
                                <td>
                                    <button class="friend-request" user-id="${user._id}" >Friend Request</button>
                                </td>
                            </tr>`;
                            break;

                    }
                    // innerHTML += sentFrinedRequestUsersArray && sentFrinedRequestUsersArray.length > 0 && sentFrinedRequestUsersArray.includes(user._id ) ? `<tr>
                    //         <td>${user.name}</td>
                    //         <td>
                    //             <span class="sent" user-id="${user._id}" >Waiting for accept</span>
                    //         </td>
                    //     </tr>`  : `<tr>
                    //         <td>${user.name}</td>
                    //         <td>
                    //             <button class="friend-request" user-id="${user._id}" >Friend Request</button>
                    //         </td>
                    //     </tr>`;
                }); 
                tbody.innerHTML = innerHTML;
                requestClicks();
            }
        } else {
            tbody.innerHTML = '';
        }
    });

});
