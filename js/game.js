const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2 - 30, canvas.height - 60, 60, 40);
let enemies = [];
const keys = { left: false, right: false, space: false, l: false };
let autoplayEnabled = false;
let gamePaused = false;

document.addEventListener('keydown', (e) => {
    if (!autoplayEnabled && !gamePaused) { 
        if (e.code === 'ArrowLeft') keys.left = true;
        if (e.code === 'ArrowRight') keys.right = true;
        if (e.code === 'Space') keys.space = true;
        if (e.code === 'KeyL') keys.l = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (!autoplayEnabled && !gamePaused) { 
        if (e.code === 'ArrowLeft') keys.left = false;
        if (e.code === 'ArrowRight') keys.right = false;
        if (e.code === 'Space') {
            keys.space = false;
            player.shootLaser();
        }
        if (e.code === 'KeyL') {
            keys.l = false;
            player.shootLaser();
        }
    }
});

function createEnemy() {
    if (gamePaused) return; // Jangan buat musuh jika game dipause
    const x = Math.random() * (canvas.width - 50);
    const speed = Math.random() * 2 + 0;
    const shapeType = Math.floor(Math.random() * 3) + 1;
    const enemy = new Enemy(x, -30, 50, 40, speed, shapeType);
    enemies.push(enemy);
}

function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.move();
        enemy.draw(ctx);

        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        player.lasers.forEach((laser, laserIndex) => {
            if (detectCollision(laser, enemy)) {
                enemies.splice(index, 1);
                player.lasers.splice(laserIndex, 1);
                player.score += enemy.pointValue; // Tambah skor berdasarkan bentuk musuh
            }
        });
    });
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${player.score}`, 10, 20);
}

function gameLoop() {
    if (gamePaused) return; // Hentikan game loop jika dipause
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    if (!autoplayEnabled) {
        player.move(keys, canvas);
    }
    player.updateLasers(ctx, enemies);
    updateEnemies();
    drawScore();
    requestAnimationFrame(gameLoop);
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function resumeGame() {
    gamePaused = false;
    document.getElementById('menu').classList.remove('show');
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    location.reload(); // Reload halaman untuk mereset game
}

function restartGame() {
    location.reload(); // Reload halaman untuk memulai ulang game
}

document.getElementById('pauseButton').addEventListener('click', () => {
    if (!gamePaused) {
        gamePaused = true;
        toggleMenu();
    } else {
        resumeGame();
    }
});

document.getElementById('resume').addEventListener('click', resumeGame);
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('restart').addEventListener('click', restartGame);

setInterval(createEnemy, 1500);

gameLoop();
