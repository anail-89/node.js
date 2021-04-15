window.addEventListener('load', () => {
    document.getElementById('userData').addEventListener('click', async () => {
        const response = await fetch('http://localhost:2021/users');
        const data = await response.json();

        if (data.success) {
            const table = document.createElement('table');
            const users = data.data;
            for (let i = 0; i < users.length; i++) {
                const tr = document.createElement('tr');
                const tdUsername = document.createElement('td');
                tdUsername.textContent = users[i]['username'];
                const tdName = document.createElement('td');
                tdName.textContent = users[i]['name'];
                const tdImage = document.createElement('td');
                tdImage.textContent = users[i]['image'];
                tr.append(tdUsername);
                tr.append(tdName);
                tr.append(tdImage);

                tr.setAttribute('username', users[i]['username']);
                tr.addEventListener('click', async (e) => {
                    const username = e.target.parentElement.getAttribute('username');
                    const response = await fetch('http://localhost:2021/users/' + username, {
                        method: 'DELETE'
                    });
                    const data = await response.json();
                    console.log(data);
                });
                table.append(tr);
            }
            document.body.append(table);
        }
    });

    document.getElementById('addUser').addEventListener('click', async () => {
        const username = document.querySelector('input[name="username"]').value;
        const name = document.querySelector('input[name="name"]').value;
        const file = document.querySelector('input[name="image"]').files[0];
        const form = new FormData();
        form.append('username', username);
        form.append('name', name);
        form.append('image', file);

        const response = await fetch('http://localhost:2021/users', {
            method: 'POST',
            body: form
        });
        const data = await response.json();
        console.log(data);
    });
});
