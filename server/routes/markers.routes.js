import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/', (req, res) => {
    const markers = db.prepare('SELECT * FROM markers').all();
    console.log("All Markers Got")
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
    res.send('Posted Marker Details For Map To DB');
});

router.delete('/:id', (req, res) => {
    res.send('Deleted A Marker From A Map From DB');
});

export default router;

