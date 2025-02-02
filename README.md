# Proyek Komisi Marketing dengan Next.js dan Express

Proyek ini adalah aplikasi yang digunakan untuk mengelola data komisi marketing, pembayaran, dan informasi lainnya. Aplikasi ini dibangun menggunakan **Next.js** untuk frontend dan **Express.js** untuk backend. Data disimpan di database **PostgreSQL**.

## Fitur

- Menampilkan data komisi marketing.
- Menambahkan pembayaran.
- Melihat daftar pembayaran.
- Mengelola informasi marketing dan komisi.

## Teknologi yang Digunakan

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, PostgreSQL
- **Database**: PostgreSQL

## Cara Instalasi

Ikuti langkah-langkah berikut untuk menginstal proyek ini di komputer Anda.

### 1. Persiapkan Lingkungan

Pastikan Anda memiliki **Node.js** dan **npm** terinstal di komputer Anda. Anda dapat mengunduhnya di [sini](https://nodejs.org/).

Selain itu, pastikan Anda memiliki **PostgreSQL** yang terinstal dan berjalan di komputer Anda. Anda dapat mengunduhnya di [sini](https://www.postgresql.org/download/).

### 2. Clone Repository

Clone repository ini ke komputer Anda dengan menjalankan perintah berikut:

```bash
git clone https://github.com/prinzzy/komisi-frontend.git
```

### 3. Instal Dependencies

Masuk ke direktori proyek dan instal dependensi dengan menjalankan perintah berikut:

```bash
cd komisi-frontend
npm install
```

### 4. Konfigurasi Database

Buat database baru di PostgreSQL dan konfigurasi koneksi di backend. Pastikan Anda sudah menambahkan konfigurasi database di file .env di folder root proyek Anda.

import database ini terlebih dahulu:

Contoh file .env untuk Express.js:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name


### 5. Jalankan Backend (Express.js)
Setelah konfigurasi selesai, jalankan server Express.js dengan perintah berikut:

```bash
git clone https://github.com/prinzzy/komisi-backend.git
cd komisi-backend
npm install
npm run dev
Backend akan berjalan di http://localhost:5500.
```

### Jalankan Frontend (Next.js)
Setelah backend berjalan, buka terminal baru di folder yang sama dan jalankan perintah berikut untuk menjalankan aplikasi Next.js:


npm run dev
Frontend akan berjalan di http://localhost:3000.

### 7. Akses Aplikasi
Buka browser dan akses aplikasi di http://localhost:3000 untuk melihat frontend dan http://localhost:5500 untuk API backend.

### 8. Postman Collection

