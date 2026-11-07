# Analisis Konsep Teknologi Web

## 1. Evolusi web

- **Web 1.0** umumnya berisi halaman statis yang terutama dibaca pengunjung. Untuk pemesanan vila, tahap ini cocok untuk menampilkan informasi dan harga, tetapi perubahan data perlu dilakukan oleh pengelola.
- **Web 2.0** menekankan interaksi, konten dinamis, dan kontribusi pengguna. Formulir pemesanan dan kalkulasi harga pada Vila Permai merupakan contoh interaksi di sisi browser; sistem pemesanan sungguhan juga memerlukan server untuk menyimpan dan memproses pesanan.
- **Web3** umumnya merujuk pada layanan yang memakai teknologi terdesentralisasi, seperti blockchain, untuk mengelola transaksi atau kepemilikan data. Sistem vila dapat menggunakannya untuk pembayaran atau rekam transaksi terverifikasi, tetapi kompleksitas dan biayanya tidak diperlukan untuk demo ini.

## 2. Arsitektur client-server

Pada aplikasi web, **client** adalah browser yang menampilkan halaman dan menerima tindakan pengguna. **Server** menerima permintaan melalui HTTP, menjalankan logika aplikasi, lalu mengirim respons—misalnya HTML atau data JSON. **Database** menyimpan informasi yang perlu bertahan dan dibagikan, seperti akun, ketersediaan kamar, serta pesanan.

Pada sistem pemesanan lengkap, browser mengirim detail tanggal dan kamar ke API; server memvalidasi ketersediaan dan harga, menyimpan pesanan ke database, lalu mengirim konfirmasi. Versi proyek ini hanya berupa halaman statis: JavaScript menghitung estimasi di browser, dan tidak ada API maupun database. Karena itu ringkasan belum menjadi pemesanan yang tercatat.

## 3. Peran HTML, CSS, dan JavaScript

- **HTML** menyusun konten dan struktur semantik, seperti navigasi, daftar vila, label formulir, pilihan tanggal, dan area ringkasan.
- **CSS** mengatur tampilan—warna, tipografi, jarak, kartu, fokus input, serta tata letak responsif untuk ponsel, tablet, dan desktop.
- **JavaScript** mengisi daftar vila dan fasilitas dari data, memvalidasi isian, menghitung estimasi total, memperbarui ringkasan pada DOM, dan mengingat nama terakhir melalui `localStorage`.

Ketiganya memiliki tanggung jawab berbeda tetapi bekerja bersama: HTML menyediakan elemen yang dapat digunakan, CSS menyajikannya, dan JavaScript menambahkan perilaku.

## 4. Arsitektur backend: monolitik dan microservices

Dalam **monolit**, API, logika pemesanan, dan pengelolaan data menjadi satu aplikasi backend yang dibangun serta dirilis bersama. Bentuk ini lebih sederhana untuk dikembangkan dan dioperasikan pada tahap awal, tetapi bagian-bagian sistem tidak dapat dirilis atau diskalakan secara independen.

Dalam **microservices**, fungsi dipisah menjadi layanan yang dapat dibangun, dirilis, dan diskalakan secara mandiri. Ini memberi fleksibilitas untuk sistem besar, namun menambah kebutuhan komunikasi jaringan, pemantauan, pengamanan, dan konsistensi data antar-layanan.

Proyek ini belum mempunyai backend. Jika dikembangkan menjadi sistem pemesanan nyata, monolit dengan API dan database adalah titik awal yang lebih proporsional; pemisahan layanan dapat dipertimbangkan ketika kebutuhan dan skala sudah membenarkannya.

## 5. Manfaat Git dan version control

Git merekam perubahan secara bertahap melalui commit, sehingga pengembang dapat meninjau siapa mengubah apa dan mengapa, membandingkan versi, serta kembali ke kondisi sebelumnya. Branch memungkinkan pekerjaan fitur dilakukan terpisah sebelum digabungkan, sedangkan tag dapat menandai rilis. Riwayat yang jelas juga memudahkan kolaborasi dan peninjauan perubahan.

GitHub dapat menyimpan repository jarak jauh dan menyediakan fasilitas berbagi, pull request, serta backup. Commit sebaiknya kecil, berfokus pada satu perubahan, dan memiliki pesan deskriptif—contohnya `feat: add villa booking form` atau `docs: add project setup guide`.
