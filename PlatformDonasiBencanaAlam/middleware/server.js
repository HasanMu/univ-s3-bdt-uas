/**
 * Distributed Disaster Donation Platform (D3P) - Middleware Application Server
 * Query Router untuk sistem database terdistribusi dengan horizontal fragmentation
 */

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Directory - Mapping Region ke Node Database (Geographic Sharding)
const GLOBAL_DIRECTORY = {
    "jakarta": {
        "regions": ["DKI_Jakarta", "Banten", "Jawa_Barat"],
        write: {
            role: "master",
            host: "jakarta_master",
            port: 5432,
            database: "d3p_jakarta"
        },
        read: {
            role: "replica",
            host: "jakarta_replica",
            port: 5432,
            database: "d3p_jakarta"
        }
    },
    "surabaya": {
        "regions": ["Jawa_Timur", "Bali", "Nusa_Tenggara_Barat", "Nusa_Tenggara_Timur", "Jawa_Tengah"],
        write: {
            role: "master",
            host: "surabaya_master",
            port: 5432,
            database: "d3p_surabaya"
        },
        read: {
            role: "replica",
            host: "surabaya_replica",
            port: 5432,
            database: "d3p_surabaya"
        }
    },
    "jayapura": {
        "regions": ["Papua", "Papua_Barat"],
        write: {
            role: "master",
            host: "jayapura_master",
            port: 5432,
            database: "d3p_jayapura"
        },
        read: {
            role: "replica",
            host: "jayapura_replica",
            port: 5432,
            database: "d3p_jayapura"
        }
    },
    "makassar": {
        "regions": ["Sulawesi_Selatan", "Sulawesi_Barat", "Sulawesi_Tenggara", "Gorontalo", "Sulawesi_Tengah"],
        write: {
            role: "master",
            host: "makassar_master",
            port: 5432,
            database: "d3p_makassar"
        },
        read: {
            role: "replica",
            host: "makassar_replica",
            port: 5432,
            database: "d3p_makassar"
        }
    },
    "medan": {
        "regions": ["Sumatera_Utara", "Aceh", "Riau", "Sumatera_Barat", "Jambi", "Sumatera_Selatan", "Lampung", "Bangka_Belitung"],
        write: {
            role: "master",
            host: "medan_master",
            port: 5432,
            database: "d3p_medan"
        },
        read: {
            role: "replica",
            host: "medan_replica",
            port: 5432,
            database: "d3p_medan"
        }
    }
};

const DB_CONFIG = {
    user: 'admin',
    password: 'password123',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

// Pool cache untuk performa
const poolCache = new Map();

function getPool(node, useMaster = true) {
    const cacheKey = `${node}_${useMaster ? 'write' : 'read'}`;

    if (poolCache.has(cacheKey)) {
        return poolCache.get(cacheKey);
    }

    const config = GLOBAL_DIRECTORY[node];
    const dbInfo = useMaster ? config.write : config.read;

    const pool = new Pool({
        ...DB_CONFIG,
        host: dbInfo.host,
        port: dbInfo.port,
        database: dbInfo.database
    });

    poolCache.set(cacheKey, pool);
    return pool;
}

async function getWorkingPool(node, preferRead = true) {
    const options = preferRead ? [false, true] : [true, false]; // prefer read for reads, write for writes

    for (const useMaster of options) {
        try {
            const pool = await getPool(node, useMaster);
            const client = await pool.connect();
            await client.query('SELECT 1');
            client.release();
            return pool;
        } catch (error) {
            console.log(`❌ Pool for ${node} ${useMaster ? 'write' : 'read'} not available: ${error.message}`);
        }
    }
    throw new Error(`No working pool for node ${node}`);
}

function getNodeForRegion(region) {
    for (const [node, config] of Object.entries(GLOBAL_DIRECTORY)) {
        if (config.regions.includes(region)) {
            return node;
        }
    }
    throw new Error(`Region ${region} tidak valid atau tidak dalam mapping yang didukung`);
}

async function getNodeForBencana(idBencana) {
    // First, we need to find which node contains this bencana
    // Since we don't know the region yet, we need to query all nodes
    // This is less efficient but necessary for backward compatibility
    // In production, we'd want to cache this or use a different approach

    console.log(`🔍 Searching for bencana ID ${idBencana} across all nodes...`);

    // For now, we'll search across all nodes to find the bencana
    // This is called when we have an id_bencana but need to determine which node it belongs to
    for (const node of Object.keys(GLOBAL_DIRECTORY)) {
        // Try slave first, if fails, try master
        for (const useMaster of [false, true]) {
            try {
                console.log(`🔍 Checking node: ${node} (${useMaster ? 'write' : 'read'})`);
                const pool = await getPool(node, useMaster);
                const client = await pool.connect();

                // Set a reasonable timeout for the query
                client.query('SET statement_timeout = 5000'); // 5 second timeout

                const result = await client.query('SELECT region FROM bencana WHERE id_bencana = $1', [idBencana]);
                client.release();

                if (result.rows.length > 0) {
                    console.log(`✅ Found bencana ID ${idBencana} in node: ${node} (${useMaster ? 'write' : 'read'}) (region: ${result.rows[0].region})`);
                    return node; // Found the bencana in this node
                }
            } catch (error) {
                console.log(`❌ Error checking node ${node} (${useMaster ? 'write' : 'read'}):`, error.message);
                // Continue to next option
            }
        }
    }
    throw new Error(`Bencana dengan ID ${idBencana} tidak ditemukan di sistem`);
}

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'D3P Middleware - Distributed Disaster Donation Platform',
        version: '1.0.0',
        nodes: Object.keys(GLOBAL_DIRECTORY)
    });
});

app.get('/health', async (req, res) => {
    const healthStatus = {};

    for (const node of Object.keys(GLOBAL_DIRECTORY)) {
        try {
            const pool = await getPool(node, true);
            const client = await pool.connect();
            await client.query('SELECT 1');
            client.release();
            healthStatus[node] = 'OK';
        } catch (error) {
            healthStatus[node] = `ERROR: ${error.message}`;
        }
    }

    res.json({ database_nodes: healthStatus });
});

// Bencana CRUD Operations
app.post('/bencana', async (req, res) => {
    try {
        const { nama_bencana, region, status = 'Active' } = req.body;

        if (!nama_bencana || !region) {
            return res.status(400).json({ error: 'nama_bencana dan region wajib diisi.' });
        }

        // Route based on region
        console.log(`📍 Creating new bencana in region: ${region}`);
        const node = getNodeForRegion(region);
        console.log(`🎯 Routing to node: ${node}`);

        const pool = await getPool(node, true);
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(`
                INSERT INTO bencana (nama_bencana, region, status)
                VALUES ($1, $2, $3)
                RETURNING id_bencana, nama_bencana, region, status, created_at
            `, [nama_bencana, region, status]);

            await client.query('COMMIT');
            console.log(`✅ Successfully created bencana ID ${result.rows[0].id_bencana} in node ${node}`);
            res.status(201).json(result.rows[0]);

        } catch (error) {
            await client.query('ROLLBACK');
            console.error('❌ Database error:', error);

            if (error.code === '23514') { // check_violation
                res.status(400).json({ error: 'Data tidak valid atau region tidak sesuai dengan node' });
            } else {
                res.status(500).json({ error: 'Database error: ' + error.message });
            }
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('❌ Error creating bencana:', error.message);
        res.status(500).json({ error: 'Gagal membuat data bencana: ' + error.message });
    }
});

app.get('/bencana/:id', async (req, res) => {
    try {
        const idBencana = parseInt(req.params.id);
        const node = await getNodeForBencana(idBencana);
        const pool = await getWorkingPool(node, true); // Prefer read for reads
        const client = await pool.connect();

        try {
            const result = await client.query('SELECT * FROM bencana WHERE id_bencana = $1', [idBencana]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Bencana tidak ditemukan' });
            }

            res.json(result.rows[0]);

        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error getting bencana:', error);
        res.status(500).json({ error: 'Gagal mengambil data bencana' });
    }
});

app.get('/bencana', async (req, res) => {
    try {
        const { region, status } = req.query;
        const allBencana = [];

        for (const node of Object.keys(GLOBAL_DIRECTORY)) {
            const pool = await getWorkingPool(node, true);
            const client = await pool.connect();

            try {
                let query = 'SELECT * FROM bencana WHERE 1=1';
                const params = [];
                let paramIndex = 1;

                if (region) {
                    query += ` AND region = $${paramIndex}`;
                    params.push(region);
                    paramIndex++;
                }

                if (status) {
                    query += ` AND status = $${paramIndex}`;
                    params.push(status);
                    paramIndex++;
                }

                const result = await client.query(query, params);
                allBencana.push(...result.rows);

            } catch (error) {
                console.error(`Error querying ${node}:`, error);
            } finally {
                client.release();
            }
        }

        res.json(allBencana);

    } catch (error) {
        console.error('Error listing bencana:', error);
        res.status(500).json({ error: 'Gagal mengambil daftar bencana' });
    }
});

// Donasi CRUD Operations
app.post('/donasi', async (req, res) => {
    try {
        const { id_bencana, nama_donatur, nominal } = req.body;

        if (!id_bencana || !nama_donatur || !nominal) {
            return res.status(400).json({ error: 'id_bencana, nama_donatur, dan nominal wajib diisi' });
        }

        if (nominal <= 0) {
            return res.status(400).json({ error: 'Nominal donasi harus lebih dari 0' });
        }

        const node = await getNodeForBencana(id_bencana);
        const pool = await getPool(node, true);
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const result = await client.query(`
                INSERT INTO donasi (id_bencana, nama_donatur, nominal)
                VALUES ($1, $2, $3)
                RETURNING id_donasi, id_bencana, nama_donatur, nominal, timestamp
            `, [id_bencana, nama_donatur, nominal]);

            await client.query('COMMIT');
            res.status(201).json(result.rows[0]);

        } catch (error) {
            await client.query('ROLLBACK');

            if (error.code === '23503') { // foreign_key_violation
                res.status(400).json({ error: 'ID Bencana tidak ditemukan' });
            } else {
                throw error;
            }
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error creating donasi:', error);
        res.status(500).json({ error: 'Gagal membuat donasi' });
    }
});

app.get('/donasi', async (req, res) => {
    try {
        const { id_bencana } = req.query;
        let nodesToQuery;

        if (id_bencana) {
            const node = await getNodeForBencana(parseInt(id_bencana));
            nodesToQuery = [node];
        } else {
            nodesToQuery = Object.keys(GLOBAL_DIRECTORY);
        }

        const allDonasi = [];

        for (const node of nodesToQuery) {
            const pool = await getWorkingPool(node, true);
            const client = await pool.connect();

            try {
                let query, params;

                if (id_bencana) {
                    query = 'SELECT * FROM donasi WHERE id_bencana = $1 ORDER BY timestamp DESC';
                    params = [id_bencana];
                } else {
                    query = 'SELECT * FROM donasi ORDER BY timestamp DESC';
                    params = [];
                }

                const result = await client.query(query, params);
                allDonasi.push(...result.rows);

            } catch (error) {
                console.error(`Error querying ${node}:`, error);
            } finally {
                client.release();
            }
        }

        res.json(allDonasi);

    } catch (error) {
        console.error('Error listing donasi:', error);
        res.status(500).json({ error: 'Gagal mengambil daftar donasi' });
    }
});

// Dashboard Summary
app.get('/dashboard/summary', async (req, res) => {
    try {
        let totalBencana = 0;
        let totalDonasi = 0;
        let totalNominal = 0;
        const bencanaByRegion = {};
        const donasiByRegion = {};

        for (const node of Object.keys(GLOBAL_DIRECTORY)) {
            const pool = await getWorkingPool(node, true);
            const client = await pool.connect();

            try {
                // Count bencana
                const bencanaResult = await client.query('SELECT COUNT(*) as count FROM bencana');
                totalBencana += parseInt(bencanaResult.rows[0].count);

                // Sum donasi
                const donasiResult = await client.query('SELECT COUNT(*) as count, COALESCE(SUM(nominal), 0) as total FROM donasi');
                totalDonasi += parseInt(donasiResult.rows[0].count);
                totalNominal += parseFloat(donasiResult.rows[0].total);

                // Group by region
                const regionResult = await client.query(`
                    SELECT b.region, COUNT(b.id_bencana) as bencana_count, COUNT(d.id_donasi) as donasi_count, COALESCE(SUM(d.nominal), 0) as nominal_total
                    FROM bencana b
                    LEFT JOIN donasi d ON b.id_bencana = d.id_bencana
                    GROUP BY b.region
                `);

                for (const stat of regionResult.rows) {
                    const region = stat.region;
                    if (!bencanaByRegion[region]) {
                        bencanaByRegion[region] = 0;
                        donasiByRegion[region] = { count: 0, nominal: 0 };
                    }

                    bencanaByRegion[region] += parseInt(stat.bencana_count);
                    donasiByRegion[region].count += parseInt(stat.donasi_count);
                    donasiByRegion[region].nominal += parseFloat(stat.nominal_total);
                }

            } catch (error) {
                console.error(`Error querying ${node}:`, error);
            } finally {
                client.release();
            }
        }

        res.json({
            total_bencana: totalBencana,
            total_donasi: totalDonasi,
            total_nominal_donasi: totalNominal,
            bencana_by_region: bencanaByRegion,
            donasi_by_region: donasiByRegion
        });

    } catch (error) {
        console.error('Error getting dashboard summary:', error);
        res.status(500).json({ error: 'Gagal mengambil ringkasan dashboard' });
    }
});

app.get('/site/:node', async (req, res) => {
    const node = req.params.node;

    if (!GLOBAL_DIRECTORY[node]) {
        return res.status(404).json({ error: 'Node not found' });
    }

    try {
        const pool = await getWorkingPool(node, true);
        const [bencanaResult, donasiResult] = await Promise.all([
            pool.query('SELECT * FROM bencana ORDER BY id_bencana'),
            pool.query('SELECT * FROM donasi ORDER BY id_donasi')
        ]);

        res.json({
            node: node,
            regions: GLOBAL_DIRECTORY[node].regions,
            bencana: bencanaResult.rows,
            donasi: donasiResult.rows
        });
    } catch (error) {
        console.error('Error getting site data:', error);
        res.status(500).json({ error: 'Failed to get site data' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');

    for (const pool of poolCache.values()) {
        pool.end();
    }

    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');

    for (const pool of poolCache.values()) {
        pool.end();
    }

    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 D3P Middleware server running on port ${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`📚 API documentation at http://localhost:${PORT}/`);
});

module.exports = app;
