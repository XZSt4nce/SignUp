const backBubbles = document.getElementById('backBubble');
const midBubbles = document.getElementById('midBubble');
const frontBubbles = document.getElementById('frontBubble');
const bubbles = [];
const backBubblesCtx = backBubbles.getContext('2d');
const midBubblesCtx = midBubbles.getContext('2d');
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
let cursorX = width / 2;
let cursorY = 0;

backgroundGradient();
setCanvasSize(backBubbles);
setCanvasSize(midBubbles);
setCanvasSize(frontBubbles);
requestAnimationFrame(draw);

// Изменение ширины окна
window.addEventListener('resize', () => {
    width = self.innerWidth;
    height = self.innerHeight;
    setCanvasSize(backBubbles);
    setCanvasSize(midBubbles);
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

function Bubble(context, k) {
    this.x = Math.floor(Math.random() * (self.innerWidth + 1));
    this.y = height + width * 0.014 + 1;
    this.context = context;
    this.shift = Math.random() * 0.1 + 0.2;
    this.velocity = Math.random() * 4 + 6;
    this.radius = (Math.random() * (width * 0.007 + 1) + width * 0.007) * k;
    this.color = '#89effa88';
}

// Отрисовка круга
function createBubbles() {
    bubbles.push(new Bubble(backBubblesCtx, 0.5));
    bubbles.push(new Bubble(backBubblesCtx, 0.5));
    bubbles.push(new Bubble(backBubblesCtx, 0.5));
    bubbles.push(new Bubble(backBubblesCtx, 0.5));
    bubbles.push(new Bubble(midBubblesCtx, 0.75));
    bubbles.push(new Bubble(midBubblesCtx, 0.75));
    bubbles.push(new Bubble(frontBubblesCtx, 1));
}

function draw() {
    requestAnimationFrame(draw);
    createBubbles();
    frontBubblesCtx.clearRect(0, 0, width, height);
    midBubblesCtx.clearRect(0, 0, width, height);
    backBubblesCtx.clearRect(0, 0, width, height);
    bubbles.forEach(bubble => {
        const forceDirection = (cursorX - width / 2) * 0.2 / width;
        const speed = width * 0.01;
        bubble.x += forceDirection * bubble.shift * 100;
        bubble.y -= bubble.velocity;
        bubble.context.beginPath();
        bubble.context.fillStyle = bubble.color;
        bubble.context.lineWidth = 1;
        bubble.context.arc(
            bubble.x,
            bubble.y,
            bubble.radius,
            0,
            2 * Math.PI
        );
        bubble.context.fill();
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
    document.getElementById('gradient1').style.background = `linear-gradient(${cursorX / width * 180 + cursorY / height * 180}deg, rgba(223,20,232,1) 35%, rgba(128,0,255,1) 100%)`;
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