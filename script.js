let BUBBLES = [];
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
});

requestAnimationFrame(function draw() {
    document.getElementById('backBubble').getContext('2d').clearRect(0, 0, self.innerWidth, self.innerHeight);
    document.getElementById('midBubble').getContext('2d').clearRect(0, 0, self.innerWidth, self.innerHeight);
    document.getElementById('frontBubble').getContext('2d').clearRect(0, 0, self.innerWidth, self.innerHeight);

    BUBBLES.forEach((bubble, index) => {
        if (bubble.y < -bubble.radius * 2) {
            delete BUBBLES[index];
            return;
        }
        if (bubble.x < -bubble.radius) {
            bubble.x = self.innerWidth + bubble.radius - 1;
        }
        if (bubble.x > self.innerWidth + bubble.radius) {
            bubble.x = -bubble.radius + 1;
        }

        bubble.context.beginPath();
        bubble.context.fillStyle = '#89effa88';
        bubble.context.arc(
            bubble.x,
            bubble.y,
            bubble.radius,
            0,
            2 * Math.PI
        );
        bubble.context.fill();

        bubble.x += Math.floor(forceDirection * bubble.shift);
        bubble.y -= bubble.velocity;
    })
    BUBBLES = BUBBLES.filter((item) => {
        if (item) return item;
    })
    requestAnimationFrame(draw);
});

function createBubble(canvas, k) {
    const radiusK = Math.random();
    BUBBLES.push({
        "context": canvas.getContext('2d'),
        "x": Math.floor(Math.random() * (canvas.width + 1)),
        "y": self.innerHeight + 30,
        "radius": Math.floor(self.innerWidth * (radiusK + 1) * 0.007 * k + k * radiusK),
        "velocity": Math.random() * 4 / k + 2,
        "shift": Math.floor(Math.random() * 10 + 5)
    });
}

setInterval(() => {
    createBubble(document.getElementById('backBubble'), 0.5);
    createBubble(document.getElementById('backBubble'), 0.5);
    createBubble(document.getElementById('backBubble'), 0.5);

    createBubble(document.getElementById('midBubble'), 0.75);
    createBubble(document.getElementById('midBubble'), 0.75);

    createBubble(document.getElementById('frontBubble'), 1);
}, 400);

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