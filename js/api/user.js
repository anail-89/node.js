export const getCurrentUserData = async () => {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/current', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if(response.status === 401){
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
}
export const findUsers = async (name) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users?name=' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
}
export const friendRequest = async (to) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/friend-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({to})
    });
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
}

export const getFriendRequests = async () => {
    const token = window.localStorage.getItem('token'); 
    const response = await fetch('http://localhost:2021/users/friend-request', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        } 
    });console.log(response);
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
} 
export const findSendFriendRequestUsers = async () => { 
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/find-send-friend-request-users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
}
export const acceptFriendRequests = async (to) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/friend-request', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({to})
    });
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json(); 
}
export const declineFriendRequests = async (to) => {
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/friend-request', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({to})
    });
    if (response.status === 401) {
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'
    }
    return response.json();
}
export const getFriends = async () =>{
    const token = window.localStorage.getItem('token');
    const response = await fetch('http://localhost:2021/users/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if( response.status ===401){
        window.localStorage.removeItem('token');
        window.location.href = '/login.html'; 
    }
    return response.json(); 
}