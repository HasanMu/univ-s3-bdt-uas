# BAB II

## ANALISIS DAN PERANCANGAN SISTEM

## 2.1 Analisis Permasalahan

Platform donasi bencana alam memiliki karakteristik sistem yang bersifat kritikal, yaitu harus tetap dapat diakses pada kondisi beban tinggi dan situasi darurat. Pada pendekatan basis data terpusat, seluruh proses penyimpanan dan pengambilan data dilakukan melalui satu node basis data, sehingga berpotensi menimbulkan permasalahan utama berupa peningkatan latensi, keterbatasan skalabilitas, serta risiko kegagalan tunggal (single point of failure).

Berdasarkan hasil analisis, permasalahan utama yang dihadapi dalam pengelolaan data donasi bencana alam adalah sebagai berikut:

1. Tingginya ketergantungan pada satu server basis data menyebabkan layanan tidak tersedia apabila terjadi kegagalan.
2. Beban akses data yang tidak terdistribusi secara merata, khususnya pada saat terjadi bencana berskala besar di wilayah tertentu.
3. Kebutuhan akan konsistensi data donasi, terutama pada proses pencatatan transaksi.
4. Perlunya mekanisme pengelolaan data yang tetap dapat beroperasi meskipun salah satu node mengalami gangguan.

Permasalahan tersebut menunjukkan bahwa pendekatan basis data terpusat kurang sesuai untuk mendukung sistem donasi bencana berskala nasional, sehingga diperlukan perancangan sistem basis data terdistribusi.


## 2.2 Analisis Kebutuhan Sistem

### 2.2.1 Kebutuhan Fungsional

Berdasarkan studi kasus dan batasan masalah yang telah ditetapkan, kebutuhan fungsional sistem meliputi:

1. Sistem mampu menyimpan dan mengelola data bencana dan donasi secara terdistribusi berdasarkan wilayah.
2. Sistem mendukung operasi penulisan data donasi pada node basis data utama.
3. Sistem menyediakan akses pembacaan data melalui node replika untuk meningkatkan ketersediaan layanan.
4. Middleware mampu melakukan routing permintaan client ke basis data yang sesuai dengan wilayah bencana.
5. Sistem menerapkan pengaturan hak akses basis data untuk membatasi operasi baca dan tulis.

### 2.2.2 Kebutuhan Non-Fungsional

Kebutuhan non-fungsional sistem meliputi:

1. Ketersediaan (availability): sistem tetap dapat melayani permintaan meskipun salah satu node mengalami gangguan.
2. Keandalan (reliability): data donasi tidak hilang dan tetap terjaga integritasnya.
3. Skalabilitas: sistem dapat menambahkan node basis data wilayah tanpa perubahan arsitektur secara signifikan.
4. Konsistensi data: mekanisme replikasi menjaga kesesuaian data antara node master dan replika.


## 2.3 Analisis Arsitektur Sistem

Arsitektur sistem dirancang menggunakan pendekatan basis data terdistribusi berbasis wilayah dengan mekanisme replikasi master–replica. Setiap wilayah diwakili oleh satu node basis data replika yang terhubung dengan satu node basis data utama (master).

Pada arsitektur ini, seluruh operasi penulisan data dilakukan melalui basis data master untuk menjaga konsistensi data. Sementara itu, operasi pembacaan data dapat dilayani oleh basis data replika untuk mengurangi beban pada node utama.

Middleware berperan sebagai lapisan perantara antara client dan basis data, dengan fungsi utama melakukan routing permintaan berdasarkan wilayah bencana. Dengan pendekatan ini, sistem mampu mendistribusikan beban akses data secara lebih merata dan meningkatkan ketersediaan layanan.


## 2.4 Strategi Fragmentasi Data

Dalam sistem ini, fragmentasi data diterapkan dalam bentuk fragmentasi horizontal secara logis (logical horizontal fragmentation) berdasarkan wilayah bencana. Fragmentasi ini tidak dilakukan melalui pemisahan tabel secara fisik di tingkat DBMS, melainkan dikendalikan pada lapisan aplikasi melalui mekanisme middleware.

Atribut wilayah berperan sebagai kriteria fragmentasi utama. Data yang berkaitan dengan suatu bencana dan transaksi donasi akan diarahkan ke node basis data wilayah yang sesuai. Dengan pendekatan ini, setiap node basis data menyimpan subset data yang relevan dengan wilayah tertentu, meskipun secara skema tabel tetap identik di seluruh node.

Fragmentasi yang diterapkan bersifat derivatif, di mana distribusi data pada tabel-tabel turunan (seperti transaksi donasi) mengikuti distribusi data pada tabel induk (data bencana). Hal ini memastikan bahwa keterkaitan data antar tabel tetap terjaga tanpa memerlukan mekanisme fragmentasi fisik pada DBMS.

Pendekatan fragmentasi horizontal secara logis ini dipilih untuk menjaga kesederhanaan implementasi serta kompatibilitas dengan PostgreSQL, dengan konsekuensi bahwa pengelolaan konsistensi distribusi data sepenuhnya dikendalikan oleh middleware.


## 2.5 Perancangan Basis Data Terdistribusi

Perancangan basis data terdistribusi dilakukan dengan mempertimbangkan pemisahan peran antara node master dan node replika. Node master berfungsi sebagai pusat penulisan data, sedangkan node replika berfungsi sebagai salinan data yang siap melayani permintaan baca.

Mekanisme replikasi diterapkan untuk memastikan bahwa perubahan data pada node master disinkronkan ke seluruh node replika. Pendekatan ini dipilih untuk meminimalkan risiko kehilangan data dan mendukung toleransi terhadap kegagalan pada salah satu node.

Selain itu, pengaturan hak akses basis data diterapkan untuk membatasi operasi penulisan hanya pada node master, sementara node replika difokuskan pada operasi pembacaan data.


## 2.5 Perancangan Middleware

Middleware dirancang sebagai komponen penghubung antara client dan sistem basis data terdistribusi. Middleware bertanggung jawab untuk:

1. Menerima permintaan dari client.
2. Menentukan wilayah bencana berdasarkan parameter permintaan.
3. Mengarahkan permintaan ke node basis data yang sesuai.

Dengan adanya middleware, client tidak berinteraksi langsung dengan basis data, sehingga kompleksitas arsitektur terdistribusi dapat disembunyikan dari sisi pengguna.


## 2.6 Perancangan Deployment Sistem

Sistem diimplementasikan dalam lingkungan container menggunakan Docker untuk memudahkan proses deployment dan pengelolaan node. Setiap komponen sistem, termasuk basis data master, basis data replika, middleware, dan client, dijalankan dalam container terpisah.

Pendekatan ini memungkinkan proses penambahan atau pengurangan node dilakukan secara fleksibel tanpa mempengaruhi komponen lain secara langsung.


## 2.7 Kesimpulan Analisis dan Perancangan

Berdasarkan hasil analisis dan perancangan, sistem basis data terdistribusi berbasis wilayah dengan mekanisme replikasi master–replica dinilai sesuai untuk mendukung platform donasi bencana alam. Arsitektur yang dirancang mampu mengurangi risiko kegagalan tunggal, meningkatkan ketersediaan layanan, serta mendistribusikan beban akses data secara lebih efisien.
