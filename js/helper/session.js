import {getCurrentUserData} from '../api/user.js';

getCurrentUserData().then((response) => {
    if (response.success === true) {
        window.currentUser = response.data;
        document.dispatchEvent(new Event('userLoaded'));
    }
});
