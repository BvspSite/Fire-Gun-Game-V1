class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
        this.lasers = [];
        this.color = 'white';
        this.score = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    move(keys, canvas) {
        if (keys.left && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys.right && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
    }

    shootLaser() {
        const laser = new Laser(this.x + this.width / 2 - 2, this.y, 4, 10);
        this.lasers.push(laser);
    }

    updateLasers(ctx, enemies) {
        this.lasers.forEach((laser, laserIndex) => {
            laser.move();
            laser.draw(ctx);

            enemies.forEach((enemy, enemyIndex) => {
                if (detectCollision(laser, enemy)) {
                    enemies.splice(enemyIndex, 1);
                    this.lasers.splice(laserIndex, 1);
                    this.score += enemy.points;
                }
            });

            if (laser.y + laser.height < 0) {
                this.lasers.splice(laserIndex, 1);
            }
        });
    }

    drawScore(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + this.score, 10, 30);
    }
}
