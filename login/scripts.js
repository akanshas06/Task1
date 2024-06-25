function showRegister() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
}

function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('Username already exists.');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful.');
            showLogin();
        }
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showSecuredPage(user.username);
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please fill in all fields.');
    }
}

function showSecuredPage(username) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('secured-page').classList.remove('hidden');
    document.getElementById('user').innerText = username;
}

function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('secured-page').classList.add('hidden');
    showLogin();
}

// On page load, check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        showSecuredPage(currentUser.username);
    } else {
        showLogin();
    }
});
