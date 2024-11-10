const express = require('express');
const db = require('./modules/db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/roadrace', (req, res) => {
    const { id, nama, nomor_start, nama_bengkel, alamat, kelas_balap } = req.body;
    const query = 'INSERT INTO roadrace ( id, nama, nomor_start, nama_bengkel, alamat, kelas_balap) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [ id, nama, nomor_start, nama_bengkel, alamat, kelas_balap], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId, id, nama, nomor_start, nama_bengkel, alamat, kelas_balap });
        }
    });
});


app.get('/roadrace', (req, res) => {
    const query = 'SELECT * FROM roadrace';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});


app.get('/roadrace/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM roadrace WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'roadrace not found' });
        } else {
            res.json(results[0]);
        }
    });
});


app.put("/roadrace/:id", (req, res) => {
    const { id } = req.params;
    const {nama , nomor_start, nama_bengkel, alamat, kelas_balap } = req.body;
    const query = "UPDATE roadrace SET nama = ?, nomor_start = ?, nama_bengkel = ?,  alamat = ?, kelas_balap = ? WHERE id = ?";
    db.query(query, [nama , nomor_start, nama_bengkel, alamat, kelas_balap, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: "roadrace not found" });
        } else {
            res.json({ nama, nomor_start, nama_bengkel, alamat, kelas_balap});
        }
    });
});


app.delete('/roadrace/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM roadrace WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'roadrace not found' });
        } else {
            res.json({ message: 'roadrace deleted' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
