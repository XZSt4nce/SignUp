const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"enum cryptoMonster.phase","name":"tokenGroup","type":"uint8"}],"name":"approveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"cost_Wei","type":"uint256"}],"name":"changeTokenCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"IncSysLifeTime1Min","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"requestId","type":"uint256"},{"internalType":"bool","name":"confirm","type":"bool"}],"name":"processRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"login","type":"string"},{"internalType":"string","name":"password","type":"string"}],"name":"signUp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"enum cryptoMonster.phase","name":"tokenGroup","type":"uint8"}],"name":"transferToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"enum cryptoMonster.phase","name":"tokenGroup","type":"uint8"}],"name":"transferTokenFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"whitelistRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"_balanceETH","type":"uint256"},{"internalType":"uint256","name":"_balanceSeed","type":"uint256"},{"internalType":"uint256","name":"_balancePrivate","type":"uint256"},{"internalType":"uint256","name":"_balancePublic","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWhitelistRequests","outputs":[{"components":[{"internalType":"string","name":"login","type":"string"},{"internalType":"address","name":"wallet","type":"address"},{"internalType":"bool","name":"isConfirmed","type":"bool"}],"internalType":"struct cryptoMonster.Request[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_login","type":"string"},{"internalType":"string","name":"_password","type":"string"}],"name":"signIn","outputs":[{"components":[{"internalType":"address","name":"wallet","type":"address"},{"internalType":"string","name":"login","type":"string"},{"internalType":"enum cryptoMonster.roles","name":"role","type":"uint8"},{"internalType":"uint256","name":"balanceSeed","type":"uint256"},{"internalType":"uint256","name":"balancePrivate","type":"uint256"},{"internalType":"uint256","name":"balancePublic","type":"uint256"},{"internalType":"bool","name":"isInWhitelist","type":"bool"}],"internalType":"struct cryptoMonster.User","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Time_start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const contractAddress = '0xae832Fc16889ECC951eF292f196364677Bcce4C0';
const contract = new web3.eth.Contract(abi, contractAddress);

//Test call
contract.methods.getTime().call({from: '0xBE682A39f17D93753EAd1bAD15DB0A597ba35cE2'})
    .then(console.log);

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