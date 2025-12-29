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

### [BAB II: Tinjauan Pustaka](BAB_II_Tinjauan_Pustaka.md)
- Sistem Terdistribusi
- Basis Data Terdistribusi
- Fragmentasi Data
- Replikasi Basis Data
- Middleware
- Docker dan Containerisasi

### [BAB III: Metodologi dan Perancangan Sistem](BAB_III_Metodologi_dan_Perancangan_Sistem.md)
- Gambaran Umum Arsitektur Sistem
- Pembagian Node dan Wilayah Layanan
- Perancangan Middleware
- Perancangan Basis Data Terdistribusi
- Pengaturan Hak Akses dan Keamanan Data
- Deployment Sistem Menggunakan Docker
- Alur Operasional Sistem

### [BAB IV: Implementasi dan Pengujian](BAB_IV_Implementasi_dan_Pengujian.md)
- Implementasi Lingkungan Sistem
- Implementasi Container dan Orkestrasi Docker
- Implementasi Fragmentasi Data Horizontal
- Implementasi Middleware dan Routing Data
- Implementasi Replikasi Database
- Hasil Pengujian Sistem
- Pembahasan

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

Daftar referensi lengkap dapat ditemukan di [BAB I: Pendahuluan](BAB_I_Pendahuluan.md) dan [BAB II: Tinjauan Pustaka](BAB_II_Tinjauan_Pustaka.md).
