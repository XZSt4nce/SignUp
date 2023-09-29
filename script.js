const form = document.getElementById('form');
const dataLogin = document.getElementById('data-login');
const dataPassword = document.getElementById('data-password');
const loginField = document.getElementById('login');
const passwordField = document.getElementById('psw');
const passwordRepeatField = document.getElementById('psw-repeat');
const clearButton = document.getElementById('clear-data');
const errorMsg = document.getElementById('errorMsg');

const width = self.innerWidth;
document.getElementById('gradient1').style.background = 'radial-gradient(at 0 0, rgba(1, 175, 250, 1) 20%, rgba(255, 0, 256, 1))';
document.getElementById('gradient2').style.background = `radial-gradient(at ${width}px ${width}px, rgba(230,185,1,1) 0%, rgba(170, 1, 110, 0.12))`;

function glow (element, color) {
    element.style['boxShadow'] = `0 0 20px ${color}`;
    setTimeout(function(){
        element.style['boxShadow'] = 'none';
    }, 1000);
}

function errorHidden (hidden) {
    if (hidden) {
        errorMsg.style.display = 'none';
    } else {
        errorMsg.style.display = 'inline';
    }
}

function backgroundGradient(event) {
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    document.getElementById('gradient1').style.background = `radial-gradient(at ${cursorY*2}px ${cursorY}px, rgba(1, 175, 250, 1) 20%, rgba(255, 0, 256, 1))`;
    document.getElementById('gradient2').style.background = `radial-gradient(at ${width - cursorX}px ${width - cursorX / 2}px, rgba(230,185,1,1) 0%, rgba(170, 1, 110, 0.12))`;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = event.target.elements;
    const login = data['login'].value;
    const password = data['psw'].value;
    const passwordRepeat = data['psw-repeat'].value;
    if (login === '') {
        glow(loginField, 'darkorange');
        if (password === '') {
            glow(passwordField, 'darkorange');
            if (passwordRepeat === '') {
                glow(passwordRepeatField, 'darkorange');
            }
        }
    } else {
        if (password === '') {
            glow(passwordField, 'darkorange');
            if (passwordRepeat === '') {
                glow(passwordRepeatField, 'darkorange');
            }
        } else {
            if (passwordRepeat === '') {
                glow(passwordRepeatField, 'darkorange');
            } else {
                if (password === passwordRepeat) {
                    dataLogin.value = "Login: " + login;
                    dataPassword.value = "Password: " + password;
                    errorHidden(true);
                    glow(dataLogin, 'magenta');
                    glow(dataPassword, 'magenta');
                } else {
                    glow(passwordField, 'red');
                    glow(passwordRepeatField, 'red');
                    errorHidden(false);
                }
            }
        }
    }
});

form.addEventListener('reset', function() {
    errorHidden(true);
    glow(loginField, 'gray');
    glow(passwordField, 'gray');
    glow(passwordRepeatField, 'gray');
})

clearButton.addEventListener('click', function() {
    errorHidden(true);
    dataLogin.value = "Login: ";
    dataPassword.value = "Password: ";
    glow(dataLogin, 'red');
    glow(dataPassword, 'red');
});