const backBubbles = document.getElementById('backBubble');
const frontBubbles = document.getElementById('frontBubble');
const bubbles = [];
const backBubblesCtx = backBubbles.getContext('2d');
const frontBubblesCtx = frontBubbles.getContext('2d');
const form = document.getElementById('form');
const dataLogin = document.getElementById('data-login');
const dataPassword = document.getElementById('data-password');
const loginField = document.getElementById('login');
const passwordField = document.getElementById('psw');
const passwordRepeatField = document.getElementById('psw-repeat');
const clearButton = document.getElementById('clear-data');
const errorMsg = document.getElementById('errorMsg');
let width = self.innerWidth;
let height = self.innerHeight;
let cursorX = 0;
let cursorY = 0;

document.getElementById('gradient1').style.background = 'radial-gradient(at 0 0, rgba(1, 175, 250, 1) 20%, rgba(255, 0, 256, 1))';
document.getElementById('gradient2').style.background = `radial-gradient(at ${width}px ${width}px, rgba(230,185,1,1) 0%, rgba(170, 1, 110, 0.12))`;

setCanvasSize(backBubbles);
setCanvasSize(frontBubbles);
create();
requestAnimationFrame(draw);

// Изменение ширины окна
window.addEventListener('resize', () => {
    width = self.innerWidth;
    height = self.innerHeight;
    setCanvasSize(backBubbles);
    setCanvasSize(frontBubbles);
});

function setCanvasSize(canvas) {
    canvas.width = width;
    canvas.height = height;
}

// Изменение координат курсора
document.body.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    backgroundGradient();
})

function setMouseCords(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
}

function Bubble(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.floor(Math.random() * (width * 0.016667 - width * 0.0083333 + 1) + width * 0.0083333);
    this.color = '#a560e088';
}

// Отрисовка круга
function create() {
    const x = Math.floor(Math.random() * (self.innerWidth + 1))
    const bubble = new Bubble(x, height);
    bubbles.push(bubble);
}

function draw() {
    requestAnimationFrame(draw);
    frontBubblesCtx.clearRect(0, 0, width, height);
    bubbles.forEach(bubble => {
        const swing = Math.sin(bubble.y / 100);
        const angle = (cursorX - width / 2 ) / width;
        bubble.x += swing + angle;
        bubble.y -= Math.random() * 2;
        frontBubblesCtx.beginPath();
        frontBubblesCtx.fillStyle = bubble.color;
        frontBubblesCtx.lineWidth = 1;
        frontBubblesCtx.arc(
            bubble.x,
            bubble.y,
            bubble.radius,
            0,
            2 * Math.PI
        );
        frontBubblesCtx.fill();
    })
}

function glow (element, color) {
    element.style['boxShadow'] = `0 0 20px ${color}`;
    setTimeout(() => {
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

function backgroundGradient() {
    document.getElementById('gradient1').style.background = `radial-gradient(at ${cursorY*2}px ${cursorY}px, rgba(1, 175, 250, 1) 20%, rgba(255, 0, 256, 1))`;
    document.getElementById('gradient2').style.background = `radial-gradient(at ${width - cursorX}px ${width - cursorX / 2}px, rgba(230,185,1,1) 0%, rgba(170, 1, 110, 0.12))`;
}

form.addEventListener('submit', event => {
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

form.addEventListener('reset', () => {
    errorHidden(true);
    glow(loginField, 'gray');
    glow(passwordField, 'gray');
    glow(passwordRepeatField, 'gray');
})

clearButton.addEventListener('click', () => {
    errorHidden(true);
    dataLogin.value = "Login: ";
    dataPassword.value = "Password: ";
    glow(dataLogin, 'gray');
    glow(dataPassword, 'gray');
});