import { Router } from "express";
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
    const markers = db.prepare('SELECT * FROM markers').all();
    console.log("All Markers Got");
    const parsed = markers.map(row => ({
        ...row,
        geocode: JSON.parse(row.geocode),
        icon: JSON.parse(row.icon)
    }));
    res.send(parsed);
});

router.get('/:map', (req, res) => {
    const markers = db.prepare('SELECT * FROM markers WHERE map = ?').all(req.params.map);
    console.log("All Markers Got From Map = ", req.params.map);
    const parsed = markers.map(row => ({
        ...row,
        geocode: JSON.parse(row.geocode),
        icon: JSON.parse(row.icon)
    }));
    res.send(parsed);
});

router.post('/', (req, res) => {
    const { type, geocode, popup, icon, isHoverOnly, targetMap, map } = req.body;
    const result = db.prepare(`
        INSERT INTO markers (type, geocode, popup, icon, isHoverOnly, targetMap, map)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
        type ?? 'navigation',
        JSON.stringify(geocode),
        popup ?? null,
        JSON.stringify(icon),
        isHoverOnly ? 1 : 0,
        targetMap ?? null,
        map
    );
    res.status(201).json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
    const { type, geocode, popup, icon, isHoverOnly, targetMap, map } = req.body;
    try {
        const result = db.prepare(`
            UPDATE markers SET type=?, geocode=?, popup=?, icon=?, isHoverOnly=?, targetMap=?, map=?
            WHERE id=?
        `).run(
            type ?? 'navigation',
            JSON.stringify(geocode),
            popup ?? null,
            JSON.stringify(icon),
            isHoverOnly ? 1 : 0,
            targetMap ?? null,
            map,
            req.params.id
        );
        if (result.changes === 0) return res.status(404).json({ error: 'Marker not found' });
        res.json({ success: true });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.delete('/:id', (req, res) => {
    const result = db.prepare('DELETE FROM markers WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Marker not found' });
    res.status(204).send();
});

export default router;
