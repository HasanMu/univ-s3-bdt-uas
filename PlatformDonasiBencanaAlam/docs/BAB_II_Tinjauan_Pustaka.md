# BAB II  
## TINJAUAN PUSTAKA

Bab ini membahas landasan teori dan konsep yang menjadi dasar dalam perancangan sistem pengelolaan data bencana berbasis basis data terdistribusi. Pembahasan difokuskan pada konsep sistem terdistribusi, basis data terdistribusi, fragmentasi data, replikasi basis data, middleware, serta teknologi containerisasi yang digunakan dalam implementasi sistem. Landasan teori ini berfungsi sebagai dasar konseptual dan justifikasi ilmiah terhadap desain sistem yang dijelaskan pada BAB III [1][2].

---

## 2.1 Sistem Terdistribusi

Sistem terdistribusi adalah sekumpulan komputer independen yang saling terhubung melalui jaringan dan bekerja sama untuk mencapai tujuan tertentu, sehingga bagi pengguna sistem tersebut terlihat sebagai satu sistem terpadu. Karakteristik utama sistem terdistribusi meliputi transparansi, skalabilitas, dan toleransi terhadap kegagalan [1].

Penerapan sistem terdistribusi bertujuan untuk meningkatkan ketersediaan layanan dan kinerja sistem, terutama pada aplikasi berskala besar dan memiliki pengguna yang tersebar secara geografis. Dalam konteks pengelolaan data bencana, sistem terdistribusi memungkinkan data diproses dan diakses lebih dekat dengan lokasi kejadian bencana [2].

---

## 2.2 Basis Data Terdistribusi

Basis data terdistribusi merupakan kumpulan basis data yang secara logis saling terhubung namun secara fisik tersebar di beberapa lokasi jaringan. Setiap lokasi memiliki kendali lokal terhadap data, tetapi sistem secara keseluruhan dikelola sebagai satu kesatuan logis [3].

Penggunaan basis data terdistribusi memberikan keuntungan berupa peningkatan ketersediaan data, pengurangan latensi akses, serta peningkatan keandalan sistem. Namun demikian, basis data terdistribusi juga menghadirkan tantangan seperti pengelolaan konsistensi data dan kompleksitas koordinasi antar node [1].

---

## 2.3 Fragmentasi Data

Fragmentasi data adalah teknik pembagian data ke dalam beberapa bagian (fragmen) berdasarkan kriteria tertentu untuk disimpan pada lokasi yang berbeda. Fragmentasi bertujuan meningkatkan performa sistem dan efisiensi akses data dengan mendekatkan data ke pengguna atau aplikasi yang paling sering mengaksesnya [3].

Fragmentasi dapat dibedakan menjadi fragmentasi horizontal, fragmentasi vertikal, dan fragmentasi campuran. Pada penelitian ini digunakan fragmentasi horizontal, di mana data bencana dibagi berdasarkan atribut wilayah (region). Selain itu, diterapkan pula fragmentasi derivatif pada tabel donasi yang bergantung pada tabel bencana [4].

---

## 2.4 Replikasi Basis Data

Replikasi basis data adalah mekanisme penyalinan dan pemeliharaan data yang sama pada lebih dari satu basis data. Replikasi bertujuan meningkatkan ketersediaan data, keandalan sistem, serta performa akses, khususnya untuk operasi baca [5].

Arsitektur replikasi yang umum digunakan adalah model master–replica, di mana database master menangani seluruh operasi penulisan, sedangkan database replica digunakan untuk melayani permintaan baca. Pendekatan ini banyak diterapkan pada sistem berskala besar karena mampu mengurangi beban pada database utama [6].

---

## 2.5 Middleware

Middleware merupakan lapisan perangkat lunak yang berada di antara aplikasi client dan sistem backend, seperti basis data atau layanan lainnya. Middleware berfungsi sebagai penghubung yang menangani komunikasi, routing, serta logika bisnis tertentu [7].

Dalam sistem ini, middleware berperan sebagai pusat pengendali yang menentukan node basis data tujuan berdasarkan wilayah bencana. Dengan pendekatan ini, client tidak berinteraksi langsung dengan basis data, sehingga kompleksitas sistem terdistribusi dapat disembunyikan dari sisi pengguna [1].

---

## 2.6 Docker dan Containerisasi

Docker adalah platform containerisasi yang memungkinkan aplikasi dijalankan dalam lingkungan terisolasi yang disebut container. Container berisi aplikasi beserta seluruh dependensinya sehingga dapat dijalankan secara konsisten pada berbagai lingkungan [8].

Penggunaan Docker dalam sistem terdistribusi mempermudah proses deployment, pengelolaan layanan, serta replikasi lingkungan pengujian dan produksi. Dalam penelitian ini, Docker digunakan untuk menjalankan komponen client, middleware, database master, dan database replica secara terpisah namun terintegrasi [8][9].

---

## Referensi

[1] A. S. Tanenbaum and M. van Steen, *Distributed Systems: Principles and Paradigms*, Pearson Education, 2017.  
[2] G. Coulouris, J. Dollimore, T. Kindberg, and G. Blair, *Distributed Systems: Concepts and Design*, Addison-Wesley, 2012.  
[3] M. T. Özsu and P. Valduriez, *Principles of Distributed Database Systems*, Springer, 2011.  
[4] R. Elmasri and S. B. Navathe, *Fundamentals of Database Systems*, Pearson, 2016.  
[5] Gray, J., Helland, P., O’Neil, P., and Shasha, D., “The Dangers of Replication and a Solution,” ACM SIGMOD, 1996.  
[6] PostgreSQL Global Development Group, “PostgreSQL Documentation,” 2024.  
[7] S. Newman, *Building Microservices*, O’Reilly Media, 2021.  
[8] Docker Inc., “Docker Documentation,” 2024.  
[9] Merkel, D., “Docker: Lightweight Linux Containers for Consistent Development and Deployment,” Linux Journal, 2014.
