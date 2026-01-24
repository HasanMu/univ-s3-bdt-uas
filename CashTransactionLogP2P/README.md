# CashTransactionLogP2P

## Deskripsi Singkat Proyek

CashTransactionLogP2P adalah aplikasi simulasi basis data terdistribusi yang berfokus pada **replikasi log transaksi pembayaran tunai antar node lokal** menggunakan pendekatan **peer-to-peer**. Sistem ini dirancang untuk mensimulasikan kondisi operasional di mana beberapa node (misalnya perangkat kasir) dapat mencatat transaksi secara mandiri tanpa ketergantungan pada server pusat, namun tetap menjaga konsistensi data melalui mekanisme replikasi dua arah.

Proyek ini dikembangkan sebagai **demo akademik** untuk memahami konsep dasar database terdistribusi, khususnya replikasi, ketersediaan tinggi (high availability), serta backup dan recovery pada lingkungan lokal.

---

## Tujuan Proyek

Tujuan utama dari proyek ini adalah:

1. Mensimulasikan mekanisme replikasi data log transaksi secara peer-to-peer pada lingkungan node lokal.
2. Menganalisis konsistensi data ketika terjadi gangguan pada salah satu node.
3. Mengimplementasikan strategi backup dan restore sebagai bagian dari keandalan sistem.
4. Memberikan pemahaman praktis mengenai penerapan database terdistribusi dalam skala kecil.

---

## Ruang Lingkup dan Batasan Sistem

Untuk menjaga fokus dan keterkendalian proyek, sistem ini memiliki batasan sebagai berikut:

* Sistem hanya menangani **log transaksi pembayaran tunai**.
* Model data bersifat **append-only** (tidak ada operasi update dan delete pada data transaksi).
* Replikasi dilakukan antar **dua node lokal** dalam jaringan yang sama.
* Sistem tidak mencakup manajemen pengguna, autentikasi tingkat lanjut, maupun integrasi pembayaran non-tunai.
* Lingkungan implementasi menggunakan **PostgreSQL** yang dijalankan dalam **container Docker**.

---

## Teknologi yang Digunakan

* PostgreSQL (Logical Replication)
* Docker & Docker Compose
* Script SQL dan shell untuk simulasi backup dan restore