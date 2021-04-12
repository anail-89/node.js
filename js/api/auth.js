export const register = async (formData) => {
    const response = await fetch('http://localhost:2021/auth/register', {
        method: 'POST',
        body: formData
    });

    return response.json();
}
// export const login = async (username, password)=>{
// 	const response = await fetch('http://localhost:2021/auth/login',
// 		method: "POST",
// 		body: {
// 			username,
// 			password
// 		});
// 	return response.json();
// }
