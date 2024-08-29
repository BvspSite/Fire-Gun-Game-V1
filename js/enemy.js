// enemy.js

// Kelas Enemy merepresentasikan musuh yang harus dihindari atau ditembak oleh pemain
class Enemy {
    constructor(x, y, width, height, speed) {
        this.x = x; // Posisi horizontal musuh
        this.y = y; // Posisi vertikal musuh
        this.width = width; // Lebar musuh
        this.height = height; // Tinggi musuh
        this.speed = speed; // Kecepatan musuh turun ke bawah layar
        this.color = 'red'; // Warna musuh
        
    }

    // Fungsi untuk menggerakkan musuh ke bawah
    move() {
        this.y += this.speed; // Musuh bergerak ke bawah setiap frame
    }

    // Fungsi untuk menggambar musuh di kanvas
    draw(ctx) {
        ctx.fillStyle = this.color; // Mengatur warna musuh
        ctx.fillRect(this.x, this.y, this.width, this.height, this.radius); // Menggambar musuh sebagai persegi panjang
    }
}
