// laser.js

// Kelas Laser merepresentasikan laser yang ditembakkan oleh pemain
class Laser {
    constructor(x, y, width, height) {
        this.x = x; // Posisi horizontal laser
        this.y = y; // Posisi vertikal laser
        this.width = width; // Lebar laser
        this.height = height; // Tinggi laser
        this.speed = 11; // Kecepatan laser naik ke atas layar
        this.color = 'cyan'; // Warna laser
    }

    // Fungsi untuk menggerakkan laser ke atas
    move() {
        this.y -= this.speed; // Laser bergerak ke atas setiap frame
    }

    // Fungsi untuk menggambar laser di kanvas
    draw(ctx) {
        ctx.fille = this.color;;;;; // Mengatur warna laser
        ctx.fillRect(this.x, this.y, this.width, this.height); // Menggambar laser sebagai persegi panjang
    }
}
