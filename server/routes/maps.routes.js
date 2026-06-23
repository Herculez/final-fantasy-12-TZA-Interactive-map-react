import { Router } from "express";
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
    const maps = db.prepare('SELECT * FROM maps').all();
    console.log("All Maps Got");
    const parsed = maps.map(row => ({
        ...row,
        bounds: JSON.parse(row.bounds),
        center: JSON.parse(row.center),
    }));
    res.send(parsed);
});

router.post('/', (req, res) => {
    const { id, region, filename, displayName, bounds, center, zoom, minZoom, maxZoom } = req.body;
    try {
        db.prepare(`
            INSERT INTO maps (id, region, filename, displayName, bounds, center, zoom, minZoom, maxZoom)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(id, region, filename, displayName, JSON.stringify(bounds), JSON.stringify(center), zoom, minZoom, maxZoom);
        res.status(201).json({ id });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
