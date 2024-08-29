// bullet.js

// Kelas Bullet merepresentasikan peluru yang ditembakkan oleh pemain
class Bullet {
    constructor(x, y, width, height, speed) {
        this.x = x; // Posisi horizontal peluru
        this.y = y; // Posisi vertikal peluru
        this.width = width; // Lebar peluru
        this.height = height; // Tinggi peluru
        this.speed = speed; // Kecepatan peluru naik ke atas layar
        this.color = 'yellow'; // Warna peluru
    }

    // Fungsi untuk menggerakkan peluru ke atas
    move() {
        this.y -= this.speed; // Peluru bergerak ke atas setiap frame
    }

    // Fungsi untuk menggambar peluru di kanvas
    draw(ctx) {
        ctx.fillStyle = this.color; // Mengatur warna peluru
        ctx.fillRect(this.x, this.y, this.width, this.height); // Menggambar peluru sebagai persegi panjang kecil
    }
}
