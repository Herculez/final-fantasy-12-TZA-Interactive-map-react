import { Router } from "express";
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
    const connections = db.prepare('SELECT * FROM connections').all();
    const parsed = connections.map(row => ({
        ...row,
        connections: JSON.parse(row.connections)
    }));
    res.json(parsed);
});

router.get('/:map', (req, res) => {
    const connections = db.prepare('SELECT * FROM connections WHERE map = ?').all(req.params.map);
    if (!connections) return res.status(404).json({ error: 'Not found' });
    console.log("All Connections Got");
    const parsed = connections.map(row => ({
        ...row,
        connections: JSON.parse(row.connections)
    }));
    res.json(parsed.length > 0 ? parsed[0].connections : []);
});

router.post('/', (req, res) => {
    const { map, connections } = req.body;
    try {
        const existing = db.prepare('SELECT * FROM connections WHERE map = ?').get(map);
        if (existing) {
            db.prepare('UPDATE connections SET connections=? WHERE map=?').run(JSON.stringify(connections), map);
        } else {
            db.prepare('INSERT INTO connections (map, connections) VALUES (?, ?)').run(map, JSON.stringify(connections));
        }
        res.status(201).json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.put('/:map', (req, res) => {
    const { connections } = req.body;
    try {
        const result = db.prepare('UPDATE connections SET connections=? WHERE map=?').run(JSON.stringify(connections), req.params.map);
        if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.delete('/:map', (req, res) => {
    const result = db.prepare('DELETE FROM connections WHERE map = ?').run(req.params.map);
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
});

export default router;
