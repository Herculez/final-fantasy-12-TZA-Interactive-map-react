import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/:map', (req, res) => {
    const connections = db.prepare('SELECT * FROM connections WHERE map = ?').all(req.params.map);
    if (!connections) return res.status(404).json({ error: 'Not found' });
    console.log("All Connections Got")
    const parsed = connections.map(row => ({
        ...row,
        connections: JSON.parse(row.connections)
    }));

    res.json(parsed.length > 0 ? parsed[0].connections : []);
});

router.post('/', (req, res) => {
    res.send('Posted Connection Details For Map To DB');
});

router.delete('/:id', (req, res) => {
    res.send('Deleted A Connection From A Map From DB');
});

export default router;

