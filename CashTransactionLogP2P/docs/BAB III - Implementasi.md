# BAB III – IMPLEMENTASI

## 3.1 Spesifikasi Lingkungan

Implementasi sistem dilakukan menggunakan PostgreSQL versi 15 yang dijalankan pada lingkungan container Docker. Sistem terdiri dari dua node basis data lokal, yaitu Node A dan Node B, yang berjalan dalam satu jaringan Docker bridge.

Lingkungan implementasi mencakup:

* Sistem Operasi: Windows
* DBMS: PostgreSQL 15
* Container Engine: Docker + Docker Compose
* Mode replikasi: Logical Replication (native PostgreSQL)

![Gambar 3.1](../screenshots/docker_ps.png)

---

## 3.2 Konfigurasi Database

### 3.2.1 Struktur Tabel

Struktur tabel dibangun identik pada kedua node, terdiri dari tabel `nodes` sebagai metadata node dan tabel `transaction_logs` sebagai log transaksi pembayaran tunai dengan model append-only.

![Gambar 3.2](../screenshots/schema_tables.png)
![Gambar 3.3](../screenshots/transaction_logs_desc.png)

---

### 3.2.2 Konfigurasi WAL dan Role Replikasi

Logical replication membutuhkan pengaturan Write Ahead Log (WAL) pada level `logical`. Perubahan dilakukan langsung pada konfigurasi PostgreSQL dan diikuti dengan restart container.

![Gambar 3.4](../screenshots/set_wal_level_logical.png)
![Gambar 3.5](../screenshots/restart_container_after_change_wal_level.png)

Role khusus replikasi dibuat dengan hak minimum, hanya memiliki kemampuan login, replication, dan koneksi ke database tanpa hak akses data bisnis.

![Gambar 3.6](../screenshots/create_replication_user.png)

---

## 3.3 Implementasi Replikasi Normal (Node A → Node B)

Pada kondisi normal, Node A berperan sebagai publisher dan Node B sebagai subscriber. Publication dibuat di Node A khusus untuk tabel `transaction_logs`, sedangkan subscription dibuat di Node B.

![Gambar 3.7](../screenshots/create_publication_node_a.png)
![Gambar 3.8](../screenshots/create_subscription_node_b.png)

Status replication slot diverifikasi untuk memastikan worker replikasi aktif.

![Gambar 3.9](../screenshots/replication_slot_active.png)

Pengujian dilakukan dengan melakukan insert transaksi pada Node A dan memverifikasi bahwa data tersebut muncul secara otomatis pada Node B.

![Gambar 3.10](../screenshots/insert_transaction_logs_node_a.png)
![Gambar 3.11](../screenshots/check_trans_logs_from_node_a_in_node_b.png)

---

## 3.4 Implementasi Failover dan Role Switch

Untuk mensimulasikan kegagalan node utama, Node A dihentikan sementara. Pada kondisi ini, Node B tetap dapat mencatat transaksi secara mandiri.

![Gambar 3.12](../screenshots/node_a_down.png)
![Gambar 3.13](../screenshots/insert_on_node_b.png)

Setelah Node A diaktifkan kembali, dilakukan role switch dengan menjadikan Node B sebagai publisher dan Node A sebagai subscriber. Replikasi dijalankan dalam mode streaming tanpa initial data copy (`copy_data = false`).

![Gambar 3.14](../screenshots/node_a_up.png)
![Gambar 3.15](../screenshots/check_subscription_node_a_after_role_switch.png)

Metadata node disinkronkan secara manual untuk memastikan integritas referensial terhadap foreign key.

![Gambar 3.16](../screenshots/nodes_table_node_a.png)
![Gambar 3.17](../screenshots/nodes_table_node_b.png)

---
