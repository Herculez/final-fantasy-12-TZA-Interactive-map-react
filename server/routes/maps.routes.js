import { Router } from "express";
import db from '../db.js';


const router = Router();

router.get('/', (req, res) => {
    const maps = db.prepare('SELECT * FROM maps').all();
    console.log("All Maps Got")
    res.send(maps);
});

export default router;

