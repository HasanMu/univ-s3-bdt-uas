# BAB V

## KESIMPULAN DAN SARAN

## 5.1 Kesimpulan

Berdasarkan hasil analisis, perancangan, implementasi, serta pengujian yang telah dilakukan pada bab-bab sebelumnya, dapat disimpulkan bahwa:

1. Sistem basis data terdistribusi berbasis wilayah yang diterapkan pada Platform Donasi Bencana Alam berhasil direalisasikan sesuai dengan tujuan penelitian. Arsitektur yang dirancang mampu mengatasi permasalahan keterbatasan sistem basis data terpusat, khususnya terkait ketersediaan layanan dan risiko kegagalan tunggal.

2. Mekanisme replikasi basis data dengan arsitektur master–replica terbukti dapat meningkatkan ketersediaan layanan serta memungkinkan pemisahan beban operasi baca dan tulis. Dengan pendekatan ini, konsistensi data donasi tetap terjaga pada kondisi operasional normal.

3. Penerapan fragmentasi horizontal secara logis berbasis wilayah, yang dikendalikan oleh middleware, mampu mendistribusikan data sesuai dengan lokasi bencana tanpa memerlukan pemisahan tabel secara fisik di tingkat DBMS. Strategi ini selaras dengan kebutuhan sistem dan keterbatasan teknologi yang digunakan.

4. Middleware berperan penting sebagai penghubung antara client dan basis data terdistribusi, khususnya dalam melakukan routing akses data berdasarkan wilayah serta menyederhanakan interaksi client terhadap kompleksitas sistem terdistribusi.

5. Hasil pengujian menunjukkan bahwa sistem mampu berfungsi dengan baik dalam skenario yang diuji, termasuk proses distribusi data, replikasi basis data, dan ketersediaan layanan ketika salah satu node mengalami gangguan.

## 5.2 Saran

Berdasarkan hasil penelitian dan keterbatasan sistem yang telah diidentifikasi, beberapa saran untuk pengembangan lebih lanjut adalah sebagai berikut:

1. Pengembangan mekanisme failover otomatis pada node basis data untuk meningkatkan ketahanan sistem terhadap kegagalan node master.

2. Penerapan mekanisme monitoring dan logging terpusat guna memudahkan proses pemantauan kinerja dan kesehatan sistem basis data terdistribusi.

3. Pengujian sistem pada skala yang lebih besar dengan beban akses yang lebih tinggi untuk mengevaluasi performa dan skalabilitas sistem secara lebih menyeluruh.

4. Pengembangan strategi replikasi dan konsistensi data yang lebih lanjut, seperti penerapan replikasi sinkron atau mekanisme conflict handling, sesuai dengan kebutuhan sistem di masa mendatang.

5. Integrasi aspek keamanan yang lebih komprehensif, khususnya pada lapisan jaringan dan aplikasi, untuk mendukung penggunaan sistem dalam lingkungan produksi.
