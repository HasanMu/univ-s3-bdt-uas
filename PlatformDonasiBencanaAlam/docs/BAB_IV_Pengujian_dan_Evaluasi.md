# BAB IV

## PENGUJIAN DAN EVALUASI SISTEM

## 4.1 Tujuan Pengujian

Pengujian sistem dilakukan untuk mengevaluasi apakah sistem basis data terdistribusi yang telah diimplementasikan mampu berfungsi sesuai dengan tujuan dan klaim yang telah dijelaskan pada BAB II dan BAB III. Fokus utama pengujian meliputi ketersediaan layanan, konsistensi data, mekanisme replikasi, serta efektivitas middleware dalam melakukan routing data berdasarkan wilayah.


## 4.2 Skenario Pengujian Sistem

Pengujian dilakukan menggunakan beberapa skenario yang merepresentasikan kondisi operasional sistem, baik pada kondisi normal maupun kondisi yang berpotensi menimbulkan gangguan.

### 4.2.1 Pengujian Insert dan Distribusi Data Berdasarkan Wilayah

Skenario ini bertujuan untuk menguji apakah data bencana dan donasi disimpan pada node basis data yang sesuai dengan wilayah asal permintaan.

Langkah pengujian:

1. Melakukan operasi insert data bencana melalui client dengan parameter wilayah tertentu.
2. Middleware menerima permintaan dan menentukan node basis data tujuan.
3. Data disimpan pada node basis data wilayah yang sesuai.
4. Dilakukan pengecekan pada node wilayah lain untuk memastikan data tidak tersimpan secara lokal.

Hasil pengujian menunjukkan bahwa data hanya tersimpan pada node wilayah yang sesuai, sehingga strategi fragmentasi horizontal logis berjalan dengan benar.


### 4.2.2 Pengujian Mekanisme Routing Middleware

Pengujian ini bertujuan untuk memastikan bahwa middleware mampu mengarahkan permintaan client ke node basis data yang tepat berdasarkan wilayah.

Langkah pengujian:

1. Mengirimkan permintaan akses data dari client dengan wilayah Jakarta.
2. Middleware mengarahkan permintaan ke node basis data Jakarta.
3. Mengulangi pengujian untuk wilayah Jayapura.

Hasil pengujian menunjukkan bahwa middleware berhasil melakukan routing permintaan secara konsisten sesuai dengan wilayah yang ditentukan.


### 4.2.3 Pengujian Replikasi Master–Replica

Skenario ini bertujuan untuk menguji keberhasilan mekanisme replikasi basis data dalam menjaga ketersediaan data.

Langkah pengujian:

1. Melakukan insert data melalui node basis data master.
2. Menunggu proses sinkronisasi replikasi.
3. Melakukan operasi select data melalui node replika.

Hasil pengujian menunjukkan bahwa data yang disimpan pada node master berhasil direplikasi ke node replika dan dapat diakses dengan benar.


### 4.2.4 Pengujian Ketersediaan Layanan (Availability)

Pengujian ini dilakukan untuk mengevaluasi kemampuan sistem dalam mempertahankan layanan ketika salah satu node basis data tidak dapat diakses.

Langkah pengujian:

1. Menonaktifkan salah satu node replika basis data.
2. Mengakses data melalui middleware.
3. Mengamati respons sistem terhadap kondisi tersebut.

Hasil pengujian menunjukkan bahwa sistem tetap dapat melayani permintaan baca melalui node replika lain atau node master, sehingga ketersediaan layanan tetap terjaga.


## 4.3 Evaluasi Hasil Pengujian

Berdasarkan hasil pengujian yang telah dilakukan, dapat dievaluasi bahwa:

1. Strategi fragmentasi horizontal logis berbasis wilayah mampu mendistribusikan data secara tepat.
2. Middleware berfungsi secara efektif sebagai pengatur routing akses data.
3. Mekanisme replikasi master–replica meningkatkan ketersediaan layanan dan memungkinkan pemisahan beban baca dan tulis.
4. Sistem mampu mempertahankan konsistensi data pada kondisi operasional normal.


## 4.4 Keterbatasan Sistem

Meskipun sistem telah berhasil diimplementasikan dan diuji, terdapat beberapa keterbatasan yang perlu diperhatikan:

1. Replikasi data bersifat asynchronous, sehingga terdapat potensi keterlambatan sinkronisasi data.
2. Mekanisme failover otomatis belum diimplementasikan.
3. Pengujian dilakukan dalam skala terbatas dan belum merepresentasikan beban produksi sesungguhnya.

## 4.5 Kesimpulan Pengujian

Berdasarkan hasil pengujian dan evaluasi, sistem basis data terdistribusi berbasis wilayah dengan mekanisme replikasi master–replica dinyatakan mampu berfungsi sesuai dengan tujuan perancangan. Sistem menunjukkan peningkatan ketersediaan layanan, distribusi beban akses yang lebih baik, serta pengelolaan data yang sesuai dengan konsep basis data terdistribusi.
