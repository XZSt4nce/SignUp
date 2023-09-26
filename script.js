const form = document.getElementById('form');
const dataLogin = document.getElementById('data-login');
const dataPassword = document.getElementById('data-password');
const passwordField = document.getElementById('psw');
const passwordRepeatField = document.getElementById('psw-repeat');
const clearButton = document.getElementById('clear-data');
const errorMsg = document.getElementById('errorMsg');

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

        dataLogin.style['boxShadow'] = '0 0 20px magenta';
        dataPassword.style['boxShadow'] = '0 0 20px magenta';
        setTimeout(function(){
            dataLogin.style['boxShadow'] = 'none';
            dataPassword.style['boxShadow'] = 'none';
        }, 1000);
    } else {
        passwordField.style['boxShadow'] = '0 0 20px red';
        passwordRepeatField.style['boxShadow'] = '0 0 20px red';
        setTimeout(function(){
            passwordField.style['boxShadow'] = 'none';
            passwordRepeatField.style['boxShadow'] = 'none';
        }, 1000);
        errorMsg.style.display = 'inline';
    }
});

clearButton.addEventListener('click', function() {
    errorMsg.style.display = 'none';
    dataLogin.value = "Login: ";
    dataPassword.value = "Password: ";

    dataLogin.style['boxShadow'] = '0 0 20px red';
    dataPassword.style['boxShadow'] = '0 0 20px red';
    setTimeout(function(){
        dataLogin.style['boxShadow'] = 'none';
        dataPassword.style['boxShadow'] = 'none';
    }, 1000);
});