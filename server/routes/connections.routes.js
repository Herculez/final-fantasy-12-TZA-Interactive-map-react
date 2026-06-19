import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/', (req, res) => {
    const connections = db.prepare('SELECT * FROM connections').all();
    if (!connections) return res.status(404).json({ error: 'Not found' });
    console.log("All Connections Got")
    res.send(connections);
});

router.post('/', (req, res) => {
    res.send('Posted Connection Details For Map To DB');
});

router.delete('/:id', (req, res) => {
    res.send('Deleted A Connection From A Map From DB');
});

export default router;

