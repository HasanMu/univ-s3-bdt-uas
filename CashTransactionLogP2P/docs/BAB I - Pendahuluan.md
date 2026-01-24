# BAB I – PENDAHULUAN

## 1.1 Latar Belakang

Dalam sistem operasional berskala kecil hingga menengah, pencatatan transaksi pembayaran tunai sering kali dilakukan pada lebih dari satu perangkat atau node lokal. Ketergantungan pada satu server pusat dapat menimbulkan risiko kegagalan tunggal (single point of failure), terutama pada kondisi jaringan yang tidak stabil atau terbatas.

Database terdistribusi dengan pendekatan **peer-to-peer** menawarkan solusi dengan memungkinkan setiap node melakukan pencatatan data secara mandiri sekaligus berpartisipasi dalam proses sinkronisasi data. Namun, penerapan konsep ini memerlukan pemahaman yang baik mengenai mekanisme replikasi, konsistensi data, serta strategi pemulihan ketika terjadi kegagalan sistem.

Oleh karena itu, proyek ini dibuat untuk mensimulasikan replikasi log transaksi pembayaran tunai antar node lokal sebagai studi kasus penerapan database terdistribusi dalam skala kecil namun realistis.

---

## 1.2 Tujuan Penelitian

Adapun tujuan dari pengembangan aplikasi ini adalah:

* Menerapkan konsep replikasi peer-to-peer pada basis data PostgreSQL.
* Menguji konsistensi data log transaksi pada kondisi node aktif dan gagal.
* Mengevaluasi efektivitas mekanisme backup dan restore dalam menjaga keberlangsungan data.

---

## 1.3 Ruang Lingkup Penelitian

Ruang lingkup penelitian pada proyek ini meliputi:

* Perancangan arsitektur dua node basis data lokal.
* Perancangan skema basis data untuk log transaksi pembayaran tunai.
* Implementasi replikasi dua arah menggunakan logical replication.
* Pengujian skenario insert data, kegagalan node, serta pemulihan data melalui backup dan restore.

Penelitian ini tidak membahas aspek antarmuka pengguna, optimasi performa skala besar, maupun implementasi sistem terdistribusi berbasis cloud.
