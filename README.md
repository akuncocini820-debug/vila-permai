# Vila Permai

**Nama mahasiswa:** [AHMAD ALIF HAIQAL]  
**NIM:** [24011130472]  
**Nama repository:** `vila-permai`

Website statis untuk melihat pilihan vila dan menghitung estimasi pemesanan vila di Puncak, Bogor. Proyek ini dibuat menggunakan HTML, CSS, dan JavaScript tanpa backend atau database.

## Menjalankan website

Buka `index.html` langsung di browser. Jika menggunakan XAMPP, letakkan folder proyek di `htdocs` lalu buka `http://localhost/vila-permai/`.

## Fitur

- Daftar tipe vila dan harga ditampilkan dari data JavaScript.
- Form pemesanan memvalidasi nama, email, tanggal check-in/check-out, dan jumlah kamar (1–10).
- Estimasi dihitung dari harga vila dan fasilitas per kamar per malam, dikalikan jumlah malam dan kamar.
- Nama pemesan terakhir disimpan di `localStorage` browser.
- Tata letak responsif untuk desktop, tablet, dan ponsel.

Website hanya menampilkan ringkasan estimasi. Data pemesanan tidak dikirim ke server dan tidak ada pembayaran.

## Struktur berkas

- `index.html` — struktur dan konten halaman.
- `style.css` — seluruh gaya dan aturan responsif.
- `script.js` — data vila, validasi, kalkulasi, dan penyimpanan lokal.

Foto vila dan font dimuat dari layanan eksternal sehingga memerlukan koneksi internet untuk tampil optimal.
