# BAB I  
## PENDAHULUAN

---

## 1.1 Latar Belakang

Bencana alam merupakan peristiwa yang dapat mengakibatkan kerusakan lingkungan, kerugian harta benda, serta korban jiwa dalam skala besar. Indonesia sebagai negara yang berada pada kawasan Cincin Api Pasifik (Ring of Fire) memiliki tingkat kerawanan bencana yang tinggi, seperti gempa bumi, banjir, letusan gunung berapi, dan tanah longsor [1].

Dalam penanganan bencana, ketersediaan informasi yang cepat, akurat, dan terdistribusi menjadi faktor penting untuk mendukung proses mitigasi, tanggap darurat, serta penyaluran bantuan. Sistem pengelolaan data bencana yang terpusat sering kali mengalami kendala berupa latensi tinggi, keterbatasan skalabilitas, dan risiko kegagalan tunggal (single point of failure) [2].

Seiring dengan perkembangan teknologi informasi, konsep sistem terdistribusi mulai banyak diterapkan untuk mengatasi permasalahan tersebut. Sistem terdistribusi memungkinkan data dikelola pada beberapa lokasi fisik yang berbeda, sehingga dapat meningkatkan ketersediaan layanan dan toleransi terhadap kegagalan [3].

Selain itu, basis data terdistribusi dengan mekanisme replikasi menjadi solusi yang umum digunakan untuk meningkatkan performa akses data serta menjamin kontinuitas layanan. Dengan memanfaatkan arsitektur master–replica, beban operasi baca dan tulis dapat dipisahkan sehingga sistem menjadi lebih efisien dan andal [4].

Berdasarkan permasalahan tersebut, diperlukan suatu sistem pengelolaan data bencana yang menerapkan konsep basis data terdistribusi berbasis wilayah (region-based distributed database) untuk mendukung platform donasi bencana alam yang berskala nasional.

---

## 1.2 Rumusan Masalah

Berdasarkan latar belakang yang telah diuraikan, maka rumusan masalah dalam penelitian ini adalah sebagai berikut:
1. Bagaimana merancang arsitektur sistem basis data terdistribusi berbasis wilayah untuk platform donasi bencana alam?
2. Bagaimana menerapkan mekanisme replikasi basis data untuk meningkatkan ketersediaan dan keandalan sistem?
3. Bagaimana middleware dapat melakukan routing data secara otomatis berdasarkan wilayah bencana?
4. Bagaimana pengelolaan hak akses dan keamanan data diterapkan pada sistem basis data terdistribusi?

---

## 1.3 Batasan Masalah

Agar pembahasan lebih terfokus, maka batasan masalah dalam penelitian ini adalah:
1. Sistem hanya membahas pengelolaan data bencana dan donasi.
2. Basis data yang digunakan adalah PostgreSQL dengan mekanisme replikasi master–replica.
3. Sistem dibagi ke dalam beberapa node wilayah di Indonesia.
4. Implementasi sistem dilakukan menggunakan Docker sebagai platform containerisasi.
5. Aspek keamanan dibatasi pada pengaturan hak akses basis data dan bukan pada keamanan jaringan secara menyeluruh.

---

## 1.4 Tujuan Penelitian

Tujuan dari penelitian ini adalah:
1. Merancang sistem basis data terdistribusi berbasis wilayah untuk pengelolaan data bencana.
2. Mengimplementasikan mekanisme replikasi database untuk meningkatkan ketersediaan layanan.
3. Mengembangkan middleware sebagai penghubung antara client dan database terdistribusi.
4. Menganalisis efektivitas arsitektur sistem dalam mendukung platform donasi bencana alam.

---

## 1.5 Manfaat Penelitian

Manfaat yang diharapkan dari penelitian ini antara lain:
1. Memberikan solusi arsitektur sistem yang skalabel dan andal untuk pengelolaan data bencana.
2. Menjadi referensi implementasi sistem basis data terdistribusi berbasis wilayah.
3. Menambah wawasan mengenai penerapan replikasi database dan middleware dalam sistem terdistribusi.
4. Mendukung pengembangan platform donasi bencana alam yang lebih responsif dan efisien.

---

## 1.6 Sistematika Penulisan

Sistematika penulisan laporan ini disusun sebagai berikut:
- **BAB I Pendahuluan**, berisi latar belakang, rumusan masalah, batasan masalah, tujuan, manfaat, dan sistematika penulisan.
- **BAB II Tinjauan Pustaka**, membahas konsep dan teori yang mendukung penelitian.
- **BAB III Metodologi dan Perancangan Sistem**, menjelaskan arsitektur dan desain sistem.
- **BAB IV Implementasi dan Pengujian**, membahas proses implementasi serta hasil pengujian sistem.
- **BAB V Kesimpulan dan Saran**, berisi kesimpulan dan saran pengembangan.

---

## Referensi BAB I

[1] BNPB, “Definisi dan Jenis Bencana Alam,” Badan Nasional Penanggulangan Bencana, 2023.  
[2] A. S. Tanenbaum and M. van Steen, *Distributed Systems: Principles and Paradigms*, Pearson Education, 2017.  
[3] G. Coulouris, J. Dollimore, T. Kindberg, and G. Blair, *Distributed Systems: Concepts and Design*, Addison-Wesley, 2012.  
[4] PostgreSQL Global Development Group, “PostgreSQL Documentation,” 2024.
