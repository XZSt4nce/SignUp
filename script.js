class Bubble {
    constructor(canvas, context, k) {
        const mmRadius = k * self.innerWidth * 0.007
        this.context = context;
        this.shift = Math.floor(Math.random() * 10 + 20);
        this.velocity = Math.random() * 4 + 6;
        this.radius = Math.floor((Math.random() * (mmRadius + k) + mmRadius));
        this.x = Math.floor(Math.random() * (canvas.width + 1));
        this.y = self.innerHeight + this.radius;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = '#89effa88';
        this.context.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );
        this.context.fill();
    }
}

const bubbles = [];
const backBubbles = document.getElementById('backBubble');
const backBubblesCtx = backBubbles.getContext('2d');
const midBubbles = document.getElementById('midBubble');
const midBubblesCtx = midBubbles.getContext('2d');
const frontBubbles = document.getElementById('frontBubble');
const frontBubblesCtx = frontBubbles.getContext('2d');

const form = document.getElementById('form');
const dataLogin = document.getElementById('data-login');
const dataPassword = document.getElementById('data-password');
const loginField = document.getElementById('login');
const passwordField = document.getElementById('psw');
const passwordRepeatField = document.getElementById('psw-repeat');
const clearButton = document.getElementById('clear-data');
const errorMsg = document.getElementById('errorMsg');

let delayCounter = 0;
let cursorX = self.innerWidth / 2;
let cursorY = 0;
let forceDirection = 0;

document.getElementById('gradient').style.background = `linear-gradient(${cursorX / self.innerWidth * 180 + cursorY / self.innerHeight * 180}deg, rgba(223,20,232,1) 35%, rgba(128,0,255,1) 100%)`;
setCanvasSize();
requestAnimationFrame(draw);

// Изменение ширины окна
window.addEventListener('resize', () => {
    setCanvasSize();
});

function setCanvasSize() {
    backBubbles.width = self.innerWidth;
    midBubbles.width = self.innerWidth;
    frontBubbles.width = self.innerWidth;

    backBubbles.height = self.innerHeight;
    midBubbles.height = self.innerHeight;
    frontBubbles.height = self.innerHeight;
}

// Изменение координат курсора
document.body.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    forceDirection = cursorX / self.innerWidth - 0.5;
    document.getElementById('gradient').style.background = `linear-gradient(${cursorX / self.innerWidth * 180 + cursorY / self.innerHeight * 180}deg, rgba(223,20,232,1) 35%, rgba(128,0,255,1) 100%)`;
})

// Отрисовка круга
function createBubbles() {
    if (delayCounter == 0) {
        bubbles.push(new Bubble(backBubbles, backBubblesCtx, 0.5));
        bubbles.push(new Bubble(backBubbles, backBubblesCtx, 0.5));
        bubbles.push(new Bubble(backBubbles, backBubblesCtx, 0.5));

        bubbles.push(new Bubble(midBubbles, midBubblesCtx, 0.75));
        bubbles.push(new Bubble(midBubbles, midBubblesCtx, 0.75));

        bubbles.push(new Bubble(frontBubbles, frontBubblesCtx, 1));
    }
    delayCounter = (delayCounter + 1) % 3;
}

function draw() {
    createBubbles();
    frontBubblesCtx.clearRect(0, 0, self.innerWidth, self.innerHeight);
    midBubblesCtx.clearRect(0, 0, self.innerWidth, self.innerHeight);
    backBubblesCtx.clearRect(0, 0, self.innerWidth, self.innerHeight);

    bubbles.forEach(bubble => {
        if (bubble.y < -self.innerHeight * 2) {
            bubbles.splice(bubbles.indexOf(bubble), 1);
            return;
        }
        if (bubble.x < -bubble.radius) {
            bubble.x = self.innerWidth + bubble.radius - 1;
        }
        if (bubble.x > self.innerWidth + bubble.radius) {
            bubble.x = -bubble.radius + 1;
        }

        bubble.x += Math.floor(forceDirection * bubble.shift);
        bubble.y -= bubble.velocity;
        bubble.draw();
    })
    requestAnimationFrame(draw);
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