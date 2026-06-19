import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/', (req, res) => {
    const map = db.prepare('SELECT * FROM maps ORDER BY id DESC LIMIT 1').get();
    if (!map) return res.status(404).json({ error: 'Not found' });
    map.bounds = JSON.parse(map.bounds);
    map.center = JSON.parse(map.center);
    console.log("Default Map Got")
    res.send(map);
});

router.get('/:id', (req, res) => {
    const map = db.prepare('SELECT * FROM maps WHERE id = ?').get(req.params.id);
    console.log("Map Req = ", req.params.id, "recieved = ", JSON.stringify(map));
    if (map.length === 0) return res.status(404).json({ error: 'Not found' });
    map.bounds = JSON.parse(map.bounds);
    map.center = JSON.parse(map.center);
    res.send(map);
});

router.post('/', (req, res) => {
    res.send('Posted Map Details To DB');
});

router.delete('/:id', (req, res) => {
    res.send('Deleted A Map From DB');
});

export default router;