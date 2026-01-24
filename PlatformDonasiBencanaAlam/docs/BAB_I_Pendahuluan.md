# BAB I

## PENDAHULUAN


## 1.1 Latar Belakang

Bencana alam merupakan peristiwa yang dapat mengakibatkan kerusakan lingkungan, kerugian harta benda, serta korban jiwa dalam skala besar. Indonesia sebagai negara yang berada pada kawasan Cincin Api Pasifik (Ring of Fire) memiliki tingkat kerawanan bencana yang tinggi, seperti gempa bumi, banjir, letusan gunung berapi, dan tanah longsor [1]. Kondisi tersebut menuntut adanya sistem pendukung yang mampu menyediakan informasi dan pengelolaan data secara cepat, konsisten, dan berkelanjutan.

Dalam konteks penanganan bencana, data tidak hanya digunakan untuk keperluan pemantauan, tetapi juga menjadi dasar dalam proses penyaluran bantuan dan donasi. Sistem pengelolaan data yang bersifat terpusat memiliki keterbatasan, antara lain meningkatnya latensi akses ketika jumlah pengguna bertambah, keterbatasan skalabilitas horizontal, serta risiko kegagalan tunggal (single point of failure) yang dapat menyebabkan layanan tidak tersedia secara menyeluruh [2]. Permasalahan ini menunjukkan bahwa pendekatan basis data terpusat kurang memadai untuk mendukung platform donasi bencana yang berskala nasional dan bersifat kritikal.

Seiring dengan perkembangan teknologi informasi, penerapan konsep sistem dan basis data terdistribusi menjadi pendekatan yang relevan untuk mengatasi permasalahan tersebut. Basis data terdistribusi memungkinkan data dikelola pada beberapa node yang tersebar secara geografis, sehingga meningkatkan ketersediaan layanan dan toleransi terhadap kegagalan node tertentu [3]. Namun, pendekatan ini juga menimbulkan tantangan tersendiri, khususnya dalam menjaga konsistensi data, pengelolaan akses, dan koordinasi antar node.

Salah satu mekanisme utama dalam basis data terdistribusi adalah replikasi data. Dengan menerapkan arsitektur replikasi master–replica, operasi penulisan data dapat dipusatkan pada satu node utama (master), sementara operasi pembacaan dapat dilayani oleh node replika. Pendekatan ini bertujuan untuk meningkatkan ketersediaan sistem dan performa akses data, dengan konsekuensi adanya potensi keterlambatan sinkronisasi data antar node [4]. Oleh karena itu, pemilihan dan perancangan mekanisme replikasi menjadi aspek penting dalam sistem basis data terdistribusi.

Berdasarkan permasalahan tersebut, penelitian ini berfokus pada perancangan dan implementasi sistem basis data terdistribusi berbasis wilayah (region-based distributed database) untuk mendukung platform donasi bencana alam. Sistem ini dirancang untuk meminimalkan risiko kegagalan tunggal, meningkatkan ketersediaan layanan, serta mendistribusikan beban akses data sesuai dengan wilayah bencana.

---

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, rumusan masalah dalam penelitian ini dirumuskan sebagai berikut:

1. Bagaimana merancang arsitektur basis data terdistribusi berbasis wilayah yang sesuai untuk platform donasi bencana alam?
2. Bagaimana penerapan mekanisme replikasi basis data master–replica dapat meningkatkan ketersediaan dan keandalan sistem?
3. Bagaimana peran middleware dalam melakukan routing akses data secara otomatis berdasarkan wilayah?
4. Bagaimana pengelolaan hak akses dan keamanan data diterapkan pada sistem basis data terdistribusi?

---

## 1.3 Batasan Masalah

Untuk menjaga fokus penelitian, batasan masalah ditetapkan sebagai berikut:

1. Sistem dibatasi pada pengelolaan data bencana dan donasi.
2. Basis data yang digunakan adalah PostgreSQL dengan arsitektur replikasi master–replica.
3. Sistem terdiri atas beberapa node basis data yang mewakili wilayah di Indonesia.
4. Implementasi dilakukan menggunakan Docker sebagai platform containerisasi.
5. Aspek keamanan difokuskan pada pengaturan hak akses basis data, tidak mencakup keamanan jaringan secara menyeluruh.

---

## 1.4 Tujuan Penelitian

Tujuan dari penelitian ini adalah sebagai berikut:

1. Merancang arsitektur basis data terdistribusi berbasis wilayah untuk pengelolaan data bencana dan donasi.
2. Mengimplementasikan mekanisme replikasi basis data untuk meningkatkan ketersediaan dan kontinuitas layanan.
3. Mengembangkan middleware sebagai penghubung antara client dan basis data terdistribusi.
4. Menganalisis keterkaitan antara desain arsitektur basis data dan keandalan sistem yang dihasilkan.

---

## 1.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini meliputi:

1. Memberikan gambaran penerapan basis data terdistribusi pada sistem pengelolaan data bencana.
2. Menjadi referensi implementasi arsitektur replikasi basis data berbasis wilayah.
3. Menambah pemahaman mengenai peran replikasi dan middleware dalam sistem basis data terdistribusi.
4. Mendukung pengembangan platform donasi bencana yang memiliki ketersediaan layanan lebih baik.

---

## 1.6 Sistematika Penulisan

Sistematika penulisan laporan ini disusun sebagai berikut:

* **BAB I Pendahuluan**, berisi latar belakang, rumusan masalah, batasan masalah, tujuan, manfaat, dan sistematika penulisan.
* **BAB II Tinjauan Pustaka**, membahas konsep dan teori yang mendukung penelitian.
* **BAB III Metodologi dan Perancangan Sistem**, menjelaskan arsitektur dan desain sistem basis data.
* **BAB IV Implementasi dan Pengujian**, membahas proses implementasi serta hasil pengujian sistem.
* **BAB V Kesimpulan dan Saran**, berisi kesimpulan dan saran pengembangan.

---

## Referensi BAB I

[1] BNPB, “Definisi dan Jenis Bencana Alam,” Badan Nasional Penanggulangan Bencana, 2023.
[2] A. S. Tanenbaum and M. van Steen, *Distributed Systems: Principles and Paradigms*, Pearson Education, 2017.
[3] G. Coulouris, J. Dollimore, T. Kindberg, and G. Blair, *Distributed Systems: Concepts and Design*, Addison-Wesley, 2012.
[4] PostgreSQL Global Development Group, “PostgreSQL Documentation,” 2024.
