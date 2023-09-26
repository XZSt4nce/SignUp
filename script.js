const form = document.getElementById('form');
const dataLogin = document.getElementById('data-login');
const dataPassword = document.getElementById('data-password');
const loginField = document.getElementById('login');
const passwordField = document.getElementById('psw');
const passwordRepeatField = document.getElementById('psw-repeat');
const clearButton = document.getElementById('clear-data');
const errorMsg = document.getElementById('errorMsg');

function glow (element, color) {
    element.style['boxShadow'] = `0 0 20px ${color}`;
    setTimeout(function(){
        element.style['boxShadow'] = 'none';
    }, 1000);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = event.target.elements;
    const login = data['login'].value;
    const password = data['psw'].value;
    const passwordRepeat = data['psw-repeat'].value;
    if (password === passwordRepeat) {
        console.log(login);
        dataLogin.value = "Login: " + login;
        dataPassword.value = "Password: " + password;
        errorMsg.style.display = 'none';
        glow(dataLogin, 'magenta');
        glow(dataPassword, 'magenta');
    } else {
        glow(passwordField, 'red');
        glow(passwordRepeatField, 'red');
        errorMsg.style.display = 'inline';
    }
});

form.addEventListener('reset', function() {
    glow(loginField, 'gray');
    glow(passwordField, 'gray');
    glow(passwordRepeatField, 'gray');
})

clearButton.addEventListener('click', function() {
    errorMsg.style.display = 'none';
    dataLogin.value = "Login: ";
    dataPassword.value = "Password: ";
    glow(dataLogin, 'red');
    glow(dataPassword, 'red');
});