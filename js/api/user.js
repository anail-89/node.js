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