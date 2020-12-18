const canvas = document.querySelector('canvas');
canvas.width = innerWidth
canvas.height = innerHeight

const c = canvas.getContext("2d");
c.fillRect(0, 0, canvas.width, canvas.height);

const scoreValue = document.querySelector('#scoreValue');
const highestScoreValue = document.querySelector('#highestScoreValue');

class Player {
    constructor(_x, _y, _radius) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.color = 'white'
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }
}

class Bullet {
    constructor(_x, _y, _radius, _color, _velocity) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.color = _color;
        this.velocity = _velocity
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

class Enemy {
    constructor(_x, _y, _radius, _color, _velocity) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.color = _color;
        this.velocity = _velocity
    }

    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 360);
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

const friction_constant = 0.99
class Particle {
    constructor(_x, _y, _radius, _color, _velocity) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.color = _color;
        this.velocity = _velocity
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = this.alpha;

        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 360);
        c.fill();
        c.closePath();

        c.restore();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
        this.velocity.x *= friction_constant;
        this.velocity.y *= friction_constant;
    }
}

const player = new Player(canvas.width / 2, canvas.height / 2, 10);
const bullets = [];
const enemies = [];
const particles = [];
let score = 0;
let highest = localStorage.getItem("highestScore")
if(highest != null){
    highestScoreValue.innerHTML = highest;
}

let animationId
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();

    particles.forEach((particle, particleIndex) => {
        if (particle.alpha < 0) {
            particles.slice(particleIndex, 1);
        }
        else {
            particle.update();
        }
    })

    bullets.forEach((bullet, bulletIndex) => {
        bullet.update();

        // remove bullets that get out of canvas
        if (bullet.x - bullet.radius < 0 || bullet.x + bullet.radius > canvas.width ||
            bullet.y - bullet.radius < 0 || bullet.y + bullet.radius > canvas.height) {
            setTimeout(() => {
                bullets.splice(bulletIndex, 1);
            }, 0)
        }
    });

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();

        // end game when enemy hits the player
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (distance - enemy.radius - player.radius < 0.5) {
            cancelAnimationFrame(animationId);

            let highest_score = localStorage.getItem("highestScore")
            if(highest_score != null && score > highest_score){
                localStorage.setItem("highestScore", score);
            }

            alert(`Game over! Your score is: ${score}`)
        }

        // remove enemies that are hit
        bullets.forEach((bullet, bulletIndex) => {
            const distance = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
            if (distance - enemy.radius - bullet.radius < 0.5) {
                // explosion
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle(bullet.x, bullet.y, Math.random() * 2, enemy.color,
                        { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 }))
                }

                if (enemy.radius - 10 > 10) {
                    // shrink enemy
                    score += 100;
                    scoreValue.innerHTML = score;

                    enemy.radius -= 10;
                    setTimeout(() => {
                        bullets.splice(bulletIndex, 1);
                    }, 0);
                }
                else {
                    // remove enemy
                    score += 200;
                    scoreValue.innerHTML = score;

                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        bullets.splice(bulletIndex, 1);
                    }, 0);
                }
            }
        })
    });
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    bullets.push(new Bullet(canvas.width / 2, canvas.height / 2, 5, 'red', velocity))
});

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 5) + 5;

        let x, y
        if (Math.random() < 0.5) {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        else {
            x = Math.random() * canvas.height;
        }

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}

animate();
spawnEnemies();

window.addEventListener('load', () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('Service worker registered!');
            return registration;
        })
        .catch((err) => {
            console.error('Unable to register the service worker!', err);
        })
    }
})