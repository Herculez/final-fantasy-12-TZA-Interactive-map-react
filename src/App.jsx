import { Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar.jsx';
import MapPage from './pages/MapPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Navbar />

            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
}

export default App;
