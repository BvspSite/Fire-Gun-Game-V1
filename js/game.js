const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(canvas.width / 2 - 30, canvas.height - 60, 60, 40);
let enemies = [];
const keys = { left: false, right: false, space: false, l: false };
let autoplayEnabled = false;

document.addEventListener('keydown', (e) => {
    if (!autoplayEnabled) { // Cegah input manual saat autoplay aktif
        if (e.code === 'ArrowLeft') keys.left = true;
        if (e.code === 'ArrowRight') keys.right = true;
        if (e.code === 'Space') keys.space = true;
        if (e.code === 'KeyL') keys.l = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (!autoplayEnabled) { // Cegah input manual saat autoplay aktif
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
    const x = Math.random() * (canvas.width - 50);
    const speed = Math.random() * 2 + 0;
    const enemy = new Enemy(x, -30, 50, 40, speed, 5);
    enemies.push(enemy);
}

function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.move();
        enemy.draw(ctx);

        // Hapus musuh jika keluar dari layar
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        // Periksa apakah musuh terkena laser
        player.lasers.forEach((laser, laserIndex) => {
            if (detectCollision(laser, enemy)) {
                // Hapus musuh dan laser yang bertabrakan
                enemies.splice(index, 1);
                player.lasers.splice(laserIndex, 1);
                player.score += 10; // Tambahkan skor
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

setInterval(createEnemy, 1500);

gameLoop();



