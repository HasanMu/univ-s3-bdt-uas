# BAB V
## KESIMPULAN DAN SARAN

### 5.1 Kesimpulan

Berdasarkan hasil perancangan, implementasi, dan pengujian sistem yang telah dilakukan, dapat disimpulkan bahwa platform donasi bencana alam berbasis basis data terdistribusi berhasil dibangun dan dijalankan sesuai dengan tujuan penelitian. Sistem ini mampu mengelola data bencana dan donasi secara terdistribusi dengan menerapkan fragmentasi data horizontal berdasarkan wilayah geografis serta replikasi database untuk menjaga ketersediaan dan konsistensi data.

Penerapan middleware sebagai pengatur routing data terbukti efektif dalam menentukan node database yang sesuai tanpa membebani client dengan kompleksitas distribusi data. Selain itu, mekanisme replikasi PostgreSQL master–replica memungkinkan data tetap tersedia untuk operasi baca meskipun terjadi gangguan pada node utama. Hasil pengujian menunjukkan bahwa data hanya tersimpan pada node yang sesuai dengan wilayahnya dan berhasil direplikasi ke database cadangan, sehingga sistem memenuhi aspek skalabilitas, konsistensi, dan keandalan.

Dengan demikian, sistem yang dibangun telah memenuhi kebutuhan platform donasi bencana alam yang membutuhkan pengelolaan data lintas wilayah secara terstruktur dan terdistribusi.

### 5.2 Saran

Meskipun sistem telah berjalan dengan baik, terdapat beberapa pengembangan yang dapat dilakukan pada penelitian atau implementasi selanjutnya, antara lain:

1. Menambahkan mekanisme load balancing pada middleware untuk mendistribusikan beban baca secara lebih optimal ke database replica.

2. Mengimplementasikan monitoring dan logging terpusat untuk memantau performa node database dan middleware secara real-time.

3. Mengembangkan fitur failover otomatis agar sistem dapat berpindah ke node cadangan secara transparan ketika node master mengalami kegagalan.

4. Memperluas fragmentasi data dengan pendekatan hybrid fragmentation (horizontal dan vertikal) untuk kebutuhan data yang lebih kompleks.

5. Meningkatkan aspek keamanan dengan penerapan enkripsi koneksi, manajemen kredensial yang lebih ketat, serta audit akses data.

Pengembangan tersebut diharapkan dapat meningkatkan keandalan, keamanan, dan skalabilitas sistem di masa mendatang.