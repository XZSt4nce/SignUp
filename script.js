let delayCounter = 0;
let forceDirection = 0;

document.getElementById('gradient').style.background = `linear-gradient(${90 / self.innerHeight * 180}deg, rgba(223,20,232,1) 35%, rgba(128,0,255,1) 100%)`;

function setCanvasSize() {
    document.getElementById('backBubble').width = self.innerWidth;
    document.getElementById('midBubble').width = self.innerWidth;
    document.getElementById('frontBubble').width = self.innerWidth;

    document.getElementById('backBubble').height = self.innerHeight;
    document.getElementById('midBubble').height = self.innerHeight;
    document.getElementById('frontBubble').height = self.innerHeight;
}

setCanvasSize();

window.addEventListener('resize', () => {
    setCanvasSize();
});

document.body.addEventListener('mousemove', (event) => {
    forceDirection = event.clientX / self.innerWidth - 0.5;
    document.getElementById('gradient').style.background = `linear-gradient(${event.clientX / self.innerWidth * 180 + event.clientY / self.innerHeight * 180}deg, rgba(223,20,232,1) 35%, rgba(128,0,255,1) 100%)`;
})

function displayBubble(canvas, k) {
    const radiusK = Math.random();
    bubble = {
        'context': canvas.getContext('2d'),
        'shift': Math.floor(Math.random() * 10 + 20),
        'velocity': Math.random() * 4 + 6,
        'radius': Math.floor(self.innerWidth * (radiusK + 1) * 0.007 * k + k * radiusK),
        'x': Math.floor(Math.random() * (canvas.width + 1)),
        'y': self.innerHeight + 30
    };
    const bubbleObj = Object.assign({}, bubble);

    function drawBubble() {

        console.log(bubbleObj);
        // bubbleObj.context.clearRect(0, 0, self.innerWidth, self.innerHeight);

        bubbleObj.context.beginPath();
        bubbleObj.context.fillStyle = '#89effa88';
        bubbleObj.context.arc(
            bubbleObj.x,
            bubbleObj.y,
            bubbleObj.radius,
            0,
            2 * Math.PI
        );
        bubbleObj.context.closePath();
        bubbleObj.context.fill();

        bubble.x += Math.floor(forceDirection * bubbleObj.shift);
        bubbleObj.y -= bubbleObj.velocity;

        if (bubbleObj.x < -bubbleObj.radius) {
            bubbleObj.x = self.innerWidth + bubbleObj.radius - 1;
        }
        if (bubbleObj.x > self.innerWidth + bubbleObj.radius) {
            bubbleObj.x = -bubbleObj.radius + 1;
        }
        if (bubbleObj.y > -bubbleObj.radius) {
            requestAnimationFrame(drawBubble);
        }
    }

    requestAnimationFrame(drawBubble)
}

function createBubbles() {
    displayBubble(document.getElementById('backBubble'), 0.5);
    displayBubble(document.getElementById('midBubble'), 0.75);
    displayBubble(document.getElementById('frontBubble'), 1);
    requestAnimationFrame(createBubbles);
}

requestAnimationFrame(createBubbles);

function glow (element, color) {
    element.style['boxShadow'] = `0 0 20px ${color}`;
    setTimeout(() => {
        element.style['boxShadow'] = 'none';
    }, 1000);
}

function errorHidden (hidden) {
    if (hidden) {
        document.getElementById('errorMsg').style.display = 'none';
    } else {
        document.getElementById('errorMsg').style.display = 'inline';
    }
}

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    const data = event.target.elements;
    const login = data['login'].value;
    const password = data['psw'].value;
    const passwordRepeat = data['psw-repeat'].value;
    if (login === '') {
        glow(document.getElementById('login'), 'darkorange');
        if (password === '') {
            glow(document.getElementById('psw'), 'darkorange');
            if (passwordRepeat === '') {
                glow(document.getElementById('psw-repeat'), 'darkorange');
            }
        }
    } else {
        if (password === '') {
            glow(document.getElementById('psw'), 'darkorange');
            if (passwordRepeat === '') {
                glow(document.getElementById('psw-repeat'), 'darkorange');
            }
        } else {
            if (passwordRepeat === '') {
                glow(document.getElementById('psw-repeat'), 'darkorange');
            } else {
                if (password === passwordRepeat) {
                    document.getElementById('data-login').value = "Login: " + login;
                    document.getElementById('data-password').value = "Password: " + password;
                    errorHidden(true);
                    glow(document.getElementById('data-login'), 'magenta');
                    glow(document.getElementById('data-password'), 'magenta');
                } else {
                    glow(document.getElementById('psw'), 'red');
                    glow(document.getElementById('psw-repeat'), 'red');
                    errorHidden(false);
                }
            }
        }
    }
});

document.getElementById('form').addEventListener('reset', () => {
    errorHidden(true);
    glow(document.getElementById('login'), 'gray');
    glow(document.getElementById('psw'), 'gray');
    glow(document.getElementById('psw-repeat'), 'gray');
})

document.getElementById('clear-data').addEventListener('click', () => {
    errorHidden(true);
    document.getElementById('data-login').value = "Login: ";
    document.getElementById('data-password').value = "Password: ";
    glow(document.getElementById('data-login'), 'gray');
    glow(document.getElementById('data-password'), 'gray');
});