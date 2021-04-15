export const register = async (formData) => {
    const response = await fetch('http://localhost:2021/auth/register', {
        method: 'POST',
        body: formData
    });

    return response.json();
}
export const login = async (username, password)=>{
	const response = await fetch('http://localhost:2021/auth/login',{
		method: "POST",
		headers: {
            'Content-Type': 'application/json'
        },
		body: JSON.stringify({
			username,
			password
		})
	});
	return response.json();
}
export const activate = async (token) => {
    const response = await fetch('http://localhost:2021/auth/activate?code=' + token, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}
export const forgotPassword = async (email) => {
    const response = await fetch('http://localhost:2021/auth/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    });

    return response.json();
}
export const resetPassword = async (token, password) => {
    const response = await fetch('http://localhost:2021/auth/reset-password?code=' + token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password
        })
    });
    
    return response.json();
}