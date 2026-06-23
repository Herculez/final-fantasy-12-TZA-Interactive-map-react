import { Router } from "express";
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
    const map = db.prepare('SELECT * FROM maps ORDER BY id DESC LIMIT 1').get();
    if (!map) return res.status(404).json({ error: 'Not found' });
    map.bounds = JSON.parse(map.bounds);
    map.center = JSON.parse(map.center);
    console.log("Default Map Got");
    res.send(map);
});

router.get('/:id', (req, res) => {
    const map = db.prepare('SELECT * FROM maps WHERE id = ?').get(req.params.id);
    console.log("Map Req = ", req.params.id, "received = ", JSON.stringify(map));
    if (!map) return res.status(404).json({ error: 'Not found' });
    map.bounds = JSON.parse(map.bounds);
    map.center = JSON.parse(map.center);
    res.send(map);
});

router.put('/:id', (req, res) => {
    const { region, filename, displayName, bounds, center, zoom, minZoom, maxZoom } = req.body;
    try {
        const result = db.prepare(`
            UPDATE maps SET region=?, filename=?, displayName=?, bounds=?, center=?, zoom=?, minZoom=?, maxZoom=?
            WHERE id=?
        `).run(region, filename, displayName, JSON.stringify(bounds), JSON.stringify(center), zoom, minZoom, maxZoom, req.params.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Map not found' });
        res.json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.delete('/:id', (req, res) => {
    const result = db.prepare('DELETE FROM maps WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Map not found' });
    res.status(204).send();
});

export default router;
