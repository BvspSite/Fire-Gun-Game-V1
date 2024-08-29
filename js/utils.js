// utils.js

/**
 * Mendeteksi tabrakan antara dua objek berbentuk persegi panjang.
 * @param {Object} rect1 - Objek pertama dengan properti x, y, width, dan height.
 * @param {Object} rect2 - Objek kedua dengan properti x, y, width, dan height.
 * @returns {boolean} - Mengembalikan true jika ada tabrakan, sebaliknya false.
 */
function detectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y 
    );
}

/**
 * Menghasilkan warna acak dalam format hexadecimal.
 * @returns {string} - Mengembalikan warna acak sebagai string hexadecimal, misalnya '#FF5733'.
 */
function randomColor() {
    const letters = '0123456789ABCDEF'; // Karakter untuk membentuk warna hexadecimal
    let color = '#'; // Awali dengan tanda pagar untuk format hexadecimal
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Tambahkan karakter acak dari 'letters'
    }
    return color; // Kembalikan warna acak
}
