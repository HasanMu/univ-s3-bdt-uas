# PRD: Distributed Disaster Donation Platform (D3P)
**Versi:** 1.0  
**Status:** Draft Arsitektur Terdistribusi  
**Topik:** Fragmentasi Horizontal Derivatif & Master-Slave Replication

---

## 1. PENDAHULUAN
Platform ini dirancang untuk mengelola donasi dan bantuan logistik saat terjadi bencana alam berskala nasional. Sistem menggunakan Basis Data Terdistribusi untuk memastikan ketersediaan tinggi (High Availability) dan pembagian beban kerja yang merata antar wilayah.

---

## 2. ARSITEKTUR SISTEM (3-TIER)
1. **Tier 1: Client Application**
   - Antarmuka untuk Donatur (Input Donasi) dan Admin (Input Data Bencana).
2. **Tier 2: Application Server (Middleware)**
   - Bertindak sebagai "Query Router".
   - Membaca metadata dari Global Directory untuk menentukan ke node mana query dikirim.
3. **Tier 3: Database Nodes (Docker)**
   - Kumpulan container database yang terfragmentasi secara horizontal.

---

## 3. STRATEGI DATA DISTRIBUSI

### 3.1. Fragmentasi Horizontal Derivatif
- **Atribut Sharding (Shard Key):** `region` (berdasarkan wilayah geografis).
- **Logic:** Tabel 'Donasi' mengikuti lokasi 'Bencana' berdasarkan region geografis. Setiap region di-assign ke node database terdekat untuk optimasi performa dan logika geografis.

### 3.2. Pembagian Node (Global Directory)
Sistem dibagi menjadi 5 Node utama (Container Docker) berdasarkan region geografis Indonesia:
- **Node_Jakarta:** Melayani Region DKI Jakarta, Banten, Jawa Barat.
- **Node_Surabaya:** Melayani Region Jawa Timur, Bali, Nusa Tenggara Barat, Nusa Tenggara Timur, Jawa Tengah.
- **Node_Medan:** Melayani Region Sumatera Utara, Aceh, Sumatera Barat, Riau, Kepulauan Riau.
- **Node_Makassar:** Melayani Region Sulawesi Selatan, Sulawesi Barat, Sulawesi Tengah, Sulawesi Tenggara, Gorontalo.
- **Node_Jayapura:** Melayani Region Papua, Papua Barat.

---

## 4. SKEMA TABEL TERDISTRIBUSI

### A. Tabel Bencana (Induk / Fragmentasi Horizontal)
- id_bencana (Primary Key)
- nama_bencana (Varchar)
- region (Varchar)
- status (Active/Closed)

### B. Tabel Donasi (Derivatif / Mengikuti Induk)
- id_donasi (Primary Key)
- id_bencana (Foreign Key merujuk ke Tabel Bencana)
- nama_donatur (Varchar)
- nominal (Decimal)
- timestamp (Datetime)

---

## 5. KONFIGURASI REPLIKASI (MASTER-SLAVE)
Setiap Node di Tier 3 memiliki struktur redundansi:
1. **Master Container:** - Menangani Write Operations (INSERT, UPDATE, DELETE).
   - Melakukan sinkronisasi data ke Slave.
2. **Slave Container:** - Menangani Read Operations (SELECT untuk Dashboard/Laporan).
   - Menjamin data tetap ada jika Master mengalami kegagalan.

---

## 6. TEKNOLOGI STACK (DOCKER WINDOWS)
- **Engine:** Docker Desktop (WSL 2 Backend).
- **Network:** Docker Bridge Network khusus (db_dist_net).
- **Database:** PostgreSQL 15.
- **Middleware:** Node.js dengan Express.js sebagai router data.
- **Client:** HTML/CSS/JavaScript dengan REST API.

---

## 7. TARGET IMPLEMENTASI
1. Simulasi kegagalan salah satu node tanpa mematikan seluruh sistem.
2. Penyeimbangan beban baca (Read Scaling) menggunakan Slave.
3. Transparansi lokasi (Client tidak perlu tahu data disimpan di node mana).
