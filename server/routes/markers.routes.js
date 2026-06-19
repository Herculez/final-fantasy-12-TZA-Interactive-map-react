import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/', (req, res) => {
    const markers = db.prepare('SELECT * FROM markers').all();
    console.log("All Markers Got")
    if (markers.length === 0) return res.status(404).json({ error: 'Not found' });
    res.send(markers);
});

router.get('/:map', (req, res) => {
    const markers = db.prepare('SELECT * FROM markers WHERE map = ?').all(req.params.map);
    console.log("All Markers Got From Map = ", req.params.map);
    if (markers.length === 0) return res.status(404).json({ error: 'Not found' });
    res.send(markers);
});

router.post('/', (req, res) => {
    res.send('Posted Marker Details For Map To DB');
});

router.delete('/:id', (req, res) => {
    res.send('Deleted A Marker From A Map From DB');
});

export default router;

