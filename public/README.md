# Wedding Invitation Guide

Terima kasih telah menggunakan Wedding Invitation Builder! Berikut adalah panduan untuk menggunakan file ZIP hasil download agar dapat dijalankan di browser lokal (handphone, iPad, komputer) maupun di VPS.


## 📁 Struktur File ZIP
Setelah Anda mengekstrak file ZIP, Anda akan menemukan struktur file berikut:
wedding-invitation/ 
├── index.html 
├── style.css 
├── script.js 
├── music.mp3 
└── favicon.png


### Penjelasan File:
- **`index.html`**: File utama untuk membuka undangan di browser.
- **`style.css`**: File CSS untuk mengatur tampilan undangan.
- **`script.js`**: File JavaScript untuk menambahkan interaktivitas.
- **`music.mp3`**: File musik latar yang akan diputar otomatis.
- **`favicon.png`**: Ikon kecil yang muncul di tab browser.

---

## 🚀 Cara Menjalankan di Browser Lokal

### 1. **Di Komputer (Windows/Mac/Linux):**
1. Ekstrak file ZIP ke dalam folder.
2. Buka folder hasil ekstraksi.
3. Klik dua kali pada file `index.html`.
4. Undangan akan terbuka di browser default Anda.

### 2. **Di Handphone atau iPad:**
1. Ekstrak file ZIP menggunakan aplikasi pengelola file (seperti **Files** di iOS atau **ZArchiver** di Android).
2. Buka folder hasil ekstraksi.
3. Klik file `index.html`.
4. Pilih browser untuk membuka file (seperti Chrome, Safari, atau lainnya).



## 🌐 Cara Menjalankan di VPS

### 1. **Upload File ke VPS:**
1. Gunakan aplikasi FTP seperti **FileZilla** atau perintah SCP untuk mengunggah folder hasil ekstraksi ke VPS Anda.
   ```bash
   scp -r wedding-invitation/ user@your-vps-ip:/var/www/html/

Pastikan folder diunggah ke direktori web server Anda (contoh: /var/www/html/).

2. Konfigurasi Web Server:
Jika Anda menggunakan Nginx, tambahkan konfigurasi berikut di file konfigurasi Nginx:
    server {
        listen 80;
        server_name your-domain.com;

        root /var/www/html/wedding-invitation;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }

Jika Anda menggunakan Apache, pastikan modul mod_rewrite aktif, dan letakkan file di direktori root web server.

3. Akses Undangan:
Buka browser dan akses URL VPS Anda:
http://your-vps-ip/
atau
http://your-domain.com/



📱 Catatan untuk Handphone dan iPad
Jika musik tidak otomatis diputar, klik di mana saja pada layar untuk memulai musik (karena beberapa browser memblokir autoplay audio).


❓ FAQ
1. Kenapa musik tidak diputar otomatis?
Beberapa browser memblokir autoplay audio. Pastikan Anda telah berinteraksi dengan halaman (seperti klik di layar) untuk memulai musik.

2. Bagaimana cara mengganti musik?
Ganti file music.mp3 dengan file musik lain. Pastikan nama file tetap music.mp3.

3. Bagaimana cara mengganti favicon?
Ganti file favicon.png dengan ikon lain. Pastikan nama file tetap favicon.png.


🛠️ Dukungan
Jika Anda mengalami masalah, silakan hubungi tim pengembang atau lihat dokumentasi tambahan.


Selamat menggunakan undangan pernikahan Anda! 🎉

### Penjelasan:
1. **Struktur File**:
   - Menjelaskan isi file ZIP dan fungsinya.

2. **Panduan Lokal**:
   - Memberikan langkah-langkah untuk menjalankan undangan di komputer, handphone, atau iPad.

3. **Panduan VPS**:
   - Menjelaskan cara mengunggah file ke VPS dan mengonfigurasi web server (Nginx/Apache).

4. **FAQ**:
   - Menjawab pertanyaan umum seperti autoplay musik dan penggantian file.

5. **Dukungan**:
   - Menyediakan informasi untuk bantuan lebih lanjut.
