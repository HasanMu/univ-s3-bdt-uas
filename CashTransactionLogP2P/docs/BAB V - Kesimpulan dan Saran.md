# BAB V – KESIMPULAN DAN SARAN

## 5.1 Kesimpulan

Dari hasil perancangan, implementasi, dan pengujian sistem, dapat disimpulkan bahwa:

1. Logical replication PostgreSQL versi 15 dapat digunakan untuk merealisasikan replikasi log transaksi pembayaran tunai antar node lokal.
2. Sistem mampu beroperasi secara stabil pada kondisi normal maupun saat terjadi kegagalan node utama.
3. Mekanisme role switch memungkinkan node cadangan mengambil alih fungsi pencatatan transaksi.
4. Pendekatan replikasi satu arah dengan role switching memberikan solusi yang sederhana dan andal untuk kebutuhan ketersediaan layanan.

---

## 5.2 Saran Pengembangan

Beberapa pengembangan yang dapat dilakukan pada penelitian atau implementasi selanjutnya antara lain:

* Penambahan mekanisme sinkronisasi manual atau otomatis untuk data transaksi selama failover.
* Implementasi backup berbasis WAL atau incremental backup.
* Penggunaan ekstensi pihak ketiga (misalnya pglogical) untuk mendukung skenario multi-writer yang lebih kompleks.
* Pengujian performa dan skalabilitas pada jumlah transaksi yang lebih besar.
