# Platform Donasi Bencana Alam (D3P)
**Distributed Disaster Donation Platform**

Sistem basis data terdistribusi dengan arsitektur 3-tier yang mengimplementasikan fragmentasi horizontal derivatif dan master-slave replication untuk mengelola donasi bencana alam berskala nasional.

## Arsitektur Sistem

### 3-Tier Architecture
1. **Client Application** (Port 8080) - Interface web untuk donatur dan admin
2. **Application Server/Middleware** (Port 8000) - Query Router Node.js Express.js
3. **Database Nodes** (Port 5433-5437) - PostgreSQL containers dengan Docker

### Fragmentasi Horizontal Derivatif
- **Shard Key:** `region` (berdasarkan wilayah geografis)
- **Node Jakarta:** DKI Jakarta, Banten, Jawa Barat, Jawa Tengah, DI Yogyakarta
- **Node Surabaya:** Jawa Timur, Bali, Nusa Tenggara Timur
- **Node Medan:** Sumatera Utara, Aceh, Sumatera Barat, Riau, Kepulauan Riau
- **Node Makassar:** Sulawesi Selatan, Sulawesi Tengah, Sulawesi Utara, Gorontalo, Maluku
- **Node Jayapura:** Papua, Papua Barat, Maluku Utara, Nusa Tenggara Barat

### Master-Slave Replication
Setiap node memiliki:
- **Master:** Menangani operasi WRITE (INSERT, UPDATE, DELETE)
- **Slave:** Menangani operasi READ untuk load balancing

## Cara Menjalankan

### Prerequisites
- Docker Desktop
- Docker Compose
- Minimal 4GB RAM

### Langkah Instalasi

1. **Clone atau setup project:**
   ```bash
   cd PlatformDonasiBencanaAlam
   ```

2. **Build dan jalankan sistem:**
   ```bash
   docker-compose up --build
   ```

3. **Tunggu hingga semua container running:**
   - Database nodes membutuhkan waktu untuk setup replication
   - Middleware akan start setelah database ready

### Akses Aplikasi

- **Web Client:** http://localhost:8080
- **API Middleware:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

## Testing Sistem

### 1. Health Check
Kunjungi tab "Monitoring" di web client atau akses:
```bash
curl http://localhost:8000/health
```

### 2. Tambah Data Bencana
**Bencana di Jakarta (akan route ke Node Jakarta):**
```bash
curl -X POST http://localhost:8000/bencana \
  -H "Content-Type: application/json" \
  -d '{
    "id_bencana": 1,
    "nama_bencana": "Banjir Jakarta",
    "region": "DKI Jakarta",
    "status": "Active"
  }'
```

**Bencana di Surabaya (akan route ke Node Surabaya):**
```bash
curl -X POST http://localhost:8000/bencana \
  -H "Content-Type: application/json" \
  -d '{
    "id_bencana": 501,
    "nama_bencana": "Gempa Malang",
    "region": "Jawa Timur",
    "status": "Active"
  }'
```

**Bencana di Papua (akan route ke Node Jayapura - geografically correct!):**
```bash
curl -X POST http://localhost:8000/bencana \
  -H "Content-Type: application/json" \
  -d '{
    "id_bencana": 259,
    "nama_bencana": "Gempa Wamena",
    "region": "Papua",
    "status": "Active"
  }'
```

### 3. Tambah Donasi
```bash
curl -X POST http://localhost:8000/donasi \
  -H "Content-Type: application/json" \
  -d '{
    "id_bencana": 1,
    "nama_donatur": "Ahmad Surya",
    "nominal": 500000
  }'
```

### 4. Test Load Balancing
- Operasi READ akan diarahkan ke Slave
- Operasi WRITE akan diarahkan ke Master
- Cek log container untuk melihat routing

### 5. Test Failure Scenario
1. Stop salah satu master node:
   ```bash
   docker-compose stop jakarta_master
   ```
2. Sistem tetap berjalan menggunakan slave untuk reads
3. Restart node untuk recovery:
   ```bash
   docker-compose start jakarta_master
   ```

## API Endpoints

### Bencana Management
- `POST /bencana` - Tambah bencana baru
- `GET /bencana` - List semua bencana (dengan filter opsional)
- `GET /bencana/{id}` - Detail bencana spesifik

### Donasi Management
- `POST /donasi` - Tambah donasi baru
- `GET /donasi` - List semua donasi
- `GET /donasi?id_bencana={id}` - Donasi untuk bencana tertentu

### Monitoring
- `GET /health` - Status semua database nodes
- `GET /dashboard/summary` - Ringkasan statistik

## Troubleshooting

### Container Tidak Start
```bash
# Cek status containers
docker-compose ps

# Lihat logs spesifik container
docker-compose logs jakarta_master
docker-compose logs middleware
```

### Replication Issues
```bash
# Reset volumes dan restart
docker-compose down -v
docker-compose up --build
```

### Port Conflict
Jika port sudah digunakan, ubah di `docker-compose.yml`:
- Web Client: ganti `8080:80` ke port lain
- API: ganti `8000:8000` ke port lain
- Database: ganti port range 5432-5437

## Struktur Project

```
PlatformDonasiBencanaAlam/
├── docker-compose.yml          # Orchestration semua services
├── README.md                   # Dokumentasi project ini
├── prd.md                      # Product Requirements Document
├── docs/                       # Dokumentasi teknis laporan (BAB I-V)
│   ├── README.md              # Halaman utama wiki dokumentasi
│   ├── BAB_I_Pendahuluan.md
│   ├── BAB_II_Tinjauan_Pustaka.md
│   ├── BAB_III_Metodologi_dan_Perancangan_Sistem.md
│   ├── BAB_IV_Implementasi_dan_Pengujian.md
│   ├── BAB_V_Kesimpulan_dan_Saran.md
│   ├── diagrams/              # File diagram PlantUML
│   └── img/                   # Gambar dan screenshot
├── master/                     # Konfigurasi database master
│   ├── 00-render-init.sh      # Script untuk render template init.sql
│   ├── 10-replication-hba.sh  # Script setup replication dan pg_hba.conf
│   ├── init.sql               # Schema database yang sudah di-render
│   ├── init.sql.template      # Template untuk schema database
│   └── pg_hba.conf            # Konfigurasi PostgreSQL untuk replication
├── replica/                    # Konfigurasi database replica
│   └── entrypoint.sh          # Script entrypoint untuk replica
├── middleware/                 # Application Server (Query Router)
│   ├── server.js              # Express.js application
│   ├── package.json           # Node.js dependencies
│   └── Dockerfile             # Container build
├── client/                     # Web Client Interface
│   └── index.html             # Single-page application
├── old.zip                     # Backup file lama
└── project-d3p.zip             # Export project
```

## Target Implementasi

✅ **Simulasi kegagalan node** - Sistem tetap berjalan saat satu node down
✅ **Load balancing baca** - Read operations menggunakan slave
✅ **Transparansi lokasi** - Client tidak perlu tahu data di node mana
✅ **Fragmentasi derivatif** - Donasi mengikuti lokasi bencana
✅ **Master-slave replication** - Redundansi dan performa

## Lisensi

Project ini dibuat untuk tujuan edukasi dan demonstrasi konsep distributed database systems.
