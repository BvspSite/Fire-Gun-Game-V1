// player.js

// Kelas Player merepresentasikan pemain yang mengontrol pesawat tempur
class Player {
    constructor(x, y, width, height) {
        this.x = x; // Posisi horizontal pemain
        this.y = y; // Posisi vertikal pemain
        this.width = width; // Lebar pemain
        this.height = height; // Tinggi pemain
        this.speed = 7; // Kecepatan pergerakan pemain ke kiri atau kanan
        this.lasers = []; // Array untuk menyimpan semua laser yang ditembakkan
        this.color = 'white'; // Warna pesawat pemain
        this.score = 0; // Skor pemain
    }

    // Fungsi untuk menggambar pemain di kanvas
    draw(ctx) {
        ctx.fillStyle = this.color; // Mengatur warna pesawat pemain
        ctx.fillRect(this.x, this.y, this.width, this.height); // Menggambar pesawat pemain sebagai persegi panjang
    }

    // Fungsi untuk menggerakkan pemain berdasarkan input dari keyboard
    move(keys, canvas) {
        if (keys.left && this.x > 0) {
            this.x -= this.speed; // Gerakkan pemain ke kiri
        }
        if (keys.right && this.x < canvas.width - this.width) {
            this.x += this.speed; // Gerakkan pemain ke kanan
        }
    }

    // Fungsi untuk menembakkan laser
    shootLaser() {
        const laser = new Laser(this.x + this.width / 2 - 2, this.y, 4, 10); // Buat laser baru
        this.lasers.push(laser); // Tambahkan laser ke array lasers
    }

    // Fungsi untuk memperbarui posisi dan status laser
    updateLasers(ctx, enemies) {
        this.lasers.forEach((laser, laserIndex) => {
            laser.move(); // Gerakkan laser ke atas
            laser.draw(ctx); // Gambar laser

            // Cek tabrakan antara laser dan musuh
            enemies.forEach((enemy, enemyIndex) => {
                if (detectCollision(laser, enemy)) {
                    enemies.splice(enemyIndex, 1); // Hapus musuh yang terkena laser
                    this.lasers.splice(laserIndex, 1); // Hapus laser setelah mengenai musuh
                    this.score += 10; // Tambah skor pemain
                }
            });

            // Hapus laser jika sudah keluar dari layar
            if (laser.y + laser.height < 0) {
                this.lasers.splice(laserIndex, 1);
            }
        });
    }

    // Fungsi untuk menggambar skor pemain di layar
    drawScore(ctx) {
        ctx.fillStyle = 'white'; // Warna teks skor
        ctx.font = '20px Arial'; // Gaya dan ukuran font untuk skor
        ctx.fillText('Score: ' + this.score, 10, 30); // Tampilkan skor di sudut kiri atas layar
    }
}
