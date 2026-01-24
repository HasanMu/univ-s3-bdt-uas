# Platform Donasi Bencana Alam Berbasis Database Terdistribusi

## Deskripsi Proyek

Platform ini merupakan sistem informasi untuk pengelolaan data bencana alam dengan arsitektur basis data terdistribusi berbasis wilayah (region-based distributed system). Sistem dirancang untuk meningkatkan skalabilitas, ketersediaan, dan efisiensi akses data bencana berdasarkan kedekatan geografis.

Pendekatan utama yang digunakan:
- **Fragmentasi horizontal** berbasis region
- **Fragmentasi derivatif** pada data terkait
- **Replikasi PostgreSQL** dengan model master-replica
- **Middleware** sebagai global directory dan routing controller

Sistem ini membagi wilayah Indonesia ke dalam 5 node regional: Jakarta, Jayapura, Makassar, Medan, dan Surabaya, masing-masing menangani data bencana di wilayah administratif tertentu.

## Latar Belakang

Dalam era digital saat ini, pengelolaan data bencana memerlukan sistem yang mampu menangani volume data besar secara terdistribusi dengan tetap menjaga konsistensi, keamanan, dan efisiensi akses berdasarkan wilayah operasional. Penelitian ini mengembangkan arsitektur sistem basis data terdistribusi untuk mengatasi tantangan tersebut.

## Tujuan Penelitian

1. Merancang arsitektur sistem basis data terdistribusi berbasis region
2. Mengimplementasikan mekanisme kontrol akses data berdasarkan wilayah
3. Menguji konsistensi dan keandalan sistem dalam pengelolaan data kebencanaan

## Daftar Isi (Table of Contents)

### [BAB I: Pendahuluan](BAB_I_Pendahuluan.md)
- Latar Belakang
- Rumusan Masalah
- Batasan Masalah
- Tujuan Penelitian
- Manfaat Penelitian
- Sistematika Penulisan

### [BAB II: Analisis dan Perancangan](BAB_II_Analisis_dan_Perancangan.md)
- Analisis Kebutuhan
- Perancangan Arsitektur
- Perancangan Database
- Perancangan Middleware
- Perancangan Antarmuka

### [BAB III: Implementasi](BAB_III_Implementasi.md)
- Implementasi Arsitektur Sistem
- Implementasi Database Terdistribusi
- Implementasi Middleware
- Implementasi Antarmuka Client
- Integrasi Sistem

### [BAB IV: Pengujian dan Evaluasi](BAB_IV_Pengujian_dan_Evaluasi.md)
- Metodologi Pengujian
- Hasil Pengujian Fungsional
- Hasil Pengujian Kinerja
- Hasil Pengujian Konsistensi Data
- Analisis dan Pembahasan

### [BAB V: Kesimpulan dan Saran](BAB_V_Kesimpulan_dan_Saran.md)
- Kesimpulan
- Saran

## Diagram dan Gambar

Diagram arsitektur dan ilustrasi sistem tersedia di folder [`diagrams/`](diagrams/) dan [`img/`](img/).

## Teknologi yang Digunakan

- **Database**: PostgreSQL dengan replikasi master-replica
- **Middleware**: Node.js
- **Containerisasi**: Docker dan Docker Compose
- **Client**: HTML/JavaScript

## Cara Menjalankan Sistem

1. Pastikan Docker dan Docker Compose terinstall
2. Jalankan `docker-compose up` dari root direktori proyek
3. Akses client melalui browser pada `http://localhost:8080`

## Kesimpulan

Platform donasi bencana alam berbasis basis data terdistribusi berhasil dibangun dan dijalankan sesuai tujuan penelitian. Sistem mampu mengelola data bencana dan donasi secara terdistribusi dengan fragmentasi horizontal berdasarkan wilayah geografis dan replikasi database untuk konsistensi data. Middleware efektif dalam routing data, dan hasil pengujian menunjukkan skalabilitas, konsistensi, dan keandalan sistem yang baik.

## Kontribusi

Dokumentasi ini disusun sebagai laporan teknis yang dapat dikembangkan lebih lanjut. Untuk kontribusi atau pertanyaan, silakan buat issue atau pull request di repository GitHub ini.

## Referensi

Daftar referensi lengkap dapat ditemukan di [BAB I: Pendahuluan](BAB_I_Pendahuluan.md) dan [BAB II: Analisis dan Perancangan](BAB_II_Analisis_dan_Perancangan.md).