class Enemy {
    constructor(x, y, width, height, speed, points) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = randomColor();
        this.points = points;
        this.shape = Math.floor(Math.random() * 3);
    }

    move() {
        this.y += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        if (this.shape === 0) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else if (this.shape === 1) {
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shape === 2) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.closePath();
            ctx.fill();
        }
    }
}
