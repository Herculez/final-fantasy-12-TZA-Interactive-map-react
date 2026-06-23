import express from 'express';
import cors from 'cors';
import mapRoutes from "./routes/map.routes.js";
import mapsRoutes from "./routes/maps.routes.js";
import markerRoutes from "./routes/markers.routes.js";
import connectionsRoutes from "./routes/connections.routes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/maps', mapsRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/markers', markerRoutes);
app.use('/api/connections', connectionsRoutes);

// LISTEN
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
