# BAB II – ANALISIS DAN PERANCANGAN

## 2.1 Arsitektur Node dan Jaringan

Arsitektur sistem CashTransactionLogP2P terdiri dari **dua node basis data lokal** yang saling terhubung dalam jaringan lokal (LAN). Setiap node menjalankan satu instance PostgreSQL di dalam container Docker dan memiliki peran yang **setara (peer)**, sehingga masing-masing node dapat melakukan operasi penulisan data (insert) secara mandiri.

Tidak terdapat server pusat dalam arsitektur ini. Kedua node berpartisipasi dalam mekanisme replikasi dua arah (bidirectional replication), sehingga setiap log transaksi yang dicatat pada satu node akan direplikasi sepenuhnya ke node lainnya.

Karakteristik arsitektur:

* Dua node peer-to-peer (Node A dan Node B)
* Setiap node bersifat **multi-writer**
* Jaringan lokal tanpa ketergantungan koneksi internet
* Replikasi data bersifat **full replication**

---

## 2.2 Desain Basis Data Terdistribusi

### 2.2.1 Entitas dan Atribut

Desain basis data difokuskan pada pencatatan log transaksi pembayaran tunai dengan pendekatan **append-only**. Sistem tidak menyediakan operasi pembaruan (update) atau penghapusan (delete) terhadap data transaksi.

Entitas utama yang digunakan adalah sebagai berikut:

**Tabel `nodes`**

* `node_id` (VARCHAR) – identitas unik node
* `node_name` (VARCHAR)
* `created_at` (TIMESTAMP)

**Tabel `transaction_logs`**

* `id` (UUID, primary key)
* `node_id` (VARCHAR, foreign key)
* `transaction_code` (VARCHAR)
* `amount` (NUMERIC)
* `transaction_time` (TIMESTAMP, UTC)
* `created_at` (TIMESTAMP)

Penggunaan UUID sebagai primary key bertujuan untuk menghindari konflik identitas data pada lingkungan multi-writer.

---

## 2.3 ERD Terdistribusi

Entity Relationship Diagram (ERD) pada sistem ini bersifat sederhana dan identik pada setiap node. Seluruh tabel direplikasi secara penuh ke setiap node sehingga struktur skema basis data pada Node A dan Node B bersifat konsisten.

Relasi utama yang terbentuk:

* Setiap `transaction_logs.node_id` mereferensikan `nodes.node_id`

Kesederhanaan ERD ini bertujuan untuk meminimalkan kompleksitas replikasi dan potensi konflik data.

---

## 2.4 Skema Fragmentasi dan Alokasi Data

### 2.4.1 Fragmentasi Data

Sistem ini **tidak menerapkan fragmentasi data**. Seluruh data log transaksi disimpan dan direplikasi secara utuh (full replication) pada setiap node.

Alasan pemilihan full replication:

* Skala data relatif kecil
* Fokus pada ketersediaan data, bukan optimasi distribusi
* Mempermudah proses pemulihan data ketika terjadi kegagalan node

### 2.4.2 Alokasi Data

Setiap node memiliki salinan lengkap tabel `nodes` dan `transaction_logs`. Data yang ditulis pada salah satu node akan secara otomatis direplikasi ke node lainnya melalui mekanisme logical replication.

---

## 2.5 Strategi Replikasi dan Query

### 2.5.1 Strategi Replikasi

Mekanisme replikasi menggunakan logical replication PostgreSQL dengan konfigurasi dua arah. Masing-masing node bertindak sebagai **publisher** dan **subscriber** secara bersamaan.

Replikasi dilakukan terhadap tabel `transaction_logs` dengan sifat:

* Append-only
* Tanpa update dan delete
* Konflik data minimal

### 2.5.2 Strategi Query

Strategi query yang digunakan dalam sistem ini meliputi:

* **INSERT lokal**: setiap node dapat mencatat transaksi secara mandiri
* **SELECT lokal**: pengambilan data dilakukan dari database lokal
* **SELECT global**: konsistensi data dijamin melalui hasil replikasi penuh

Sistem tidak mengimplementasikan query lintas node secara langsung, karena setiap node telah memiliki salinan data yang identik setelah proses sinkronisasi.

---

BAB ini menjadi dasar perancangan implementasi sistem, yang selanjutnya akan direalisasikan pada tahap implementasi dan pengujian.
