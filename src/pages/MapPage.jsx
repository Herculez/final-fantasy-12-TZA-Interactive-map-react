import { useState, useEffect } from 'react';
import { useMapData } from '../hooks/useMapData.js';
import { useMarkers } from "../hooks/useMarkers.js";
import MapContainer from '../components/Map/MapContainer.jsx';
import MapNavigation from '../components/Map/MapNavigation.jsx';
import Sidebar from '../components/UI/Sidebar.jsx';
import { createMarker, getAllMaps } from '../services/mapService.js';
import { ICON_OPTIONS } from '../utils/constants.js';

const MARKER_TYPES = ['navigation', 'treasure', 'hunt', 'npc', 'shop', 'save', 'other'];

const EMPTY_MARKER_FORM = {
    type: 'navigation',
    popup: '',
    iconUrl: ICON_OPTIONS[0]?.url ?? '',
    iconSize: 32,
    isHoverOnly: false,
    targetMap: '',
};

function MapPage() {
    const initialMapId = 'rabanastre_southern_plaza';

    const {
        currentMapId,
        currentMap,
        connectedMapIds,
        goToNextMap,
        goToPreviousMap,
        goToMapById,
        hasNext,
        hasPrevious,
    } = useMapData(initialMapId);

    const [markerRefreshKey, setMarkerRefreshKey] = useState(0);
    const markers = useMarkers(currentMapId, markerRefreshKey);
    console.log("markers in app", markers);

    const [adminMode, setAdminMode] = useState(false);
    const [pendingCoords, setPendingCoords] = useState(null);
    const [markerForm, setMarkerForm] = useState({ ...EMPTY_MARKER_FORM });
    const [availableMaps, setAvailableMaps] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        getAllMaps().then(data => setAvailableMaps(data ?? []));
    }, []);

    const handleMarkerClick = (marker) => {
        if (marker.targetMap) {
            goToMapById(marker.targetMap);
        }
    };

    const handleMapClick = (latlng) => {
        setPendingCoords(latlng);
        setMarkerForm({ ...EMPTY_MARKER_FORM });
        setFormError('');
    };

    const handlePlaceMarker = async () => {
        try {
            setFormError('');
            await createMarker({
                type: markerForm.type,
                geocode: [pendingCoords.lat, pendingCoords.lng],
                popup: markerForm.popup || null,
                icon: { url: markerForm.iconUrl, size: [markerForm.iconSize, markerForm.iconSize] },
                isHoverOnly: markerForm.isHoverOnly,
                targetMap: markerForm.targetMap || null,
                map: currentMapId,
            });
            setPendingCoords(null);
            setMarkerRefreshKey(k => k + 1);
        } catch (e) {
            setFormError(e.response?.data?.error || e.message);
        }
    };

    const cancelPlacement = () => {
        setPendingCoords(null);
        setFormError('');
    };

    if (!currentMap) {
        return (
            <div className ="app">
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    Loading Maps..
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <Sidebar />

            <div className="map-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <MapNavigation
                    onNext={goToNextMap}
                    onPrevious={goToPreviousMap}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                    currentMapName={currentMap.displayName}
                />
                <div className="map-container">
                    <MapContainer
                        mapData={currentMap}
                        markers={markers}
                        onMarkerClick={handleMarkerClick}
                        adminMode={adminMode}
                        onMapClick={handleMapClick}
                    />

                    {/* admin placement toggle */}
                    <button
                        className={`map-admin-toggle${adminMode ? ' active' : ''}`}
                        onClick={() => { setAdminMode(m => !m); setPendingCoords(null); }}
                    >
                        {adminMode ? 'Exit Placement' : 'Place Marker'}
                    </button>

                    {/* marker placement form */}
                    {pendingCoords && (
                        <div className="map-admin-form">
                            <h4>New Marker</h4>
                            <p className="map-admin-coords">
                                [{Math.round(pendingCoords.lat)}, {Math.round(pendingCoords.lng)}]
                            </p>

                            <div className="map-admin-field">
                                <label>Type</label>
                                <select value={markerForm.type} onChange={e => setMarkerForm(f => ({ ...f, type: e.target.value }))}>
                                    {MARKER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="map-admin-field">
                                <label>Popup</label>
                                <input value={markerForm.popup} onChange={e => setMarkerForm(f => ({ ...f, popup: e.target.value }))} />
                            </div>

                            <div className="map-admin-field">
                                <label>Target Map</label>
                                <select value={markerForm.targetMap} onChange={e => setMarkerForm(f => ({ ...f, targetMap: e.target.value }))}>
                                    <option value="">-- none --</option>
                                    {availableMaps.map(m => <option key={m.id} value={m.id}>{m.displayName || m.id}</option>)}
                                </select>
                            </div>

                            <div className="map-admin-field">
                                <label>Icon</label>
                                <select value={markerForm.iconUrl} onChange={e => setMarkerForm(f => ({ ...f, iconUrl: e.target.value }))}>
                                    {ICON_OPTIONS.map(opt => (
                                        <option key={opt.url} value={opt.url}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="map-admin-field">
                                <label>Icon Size (px)</label>
                                <input
                                    type="number"
                                    min={8}
                                    max={128}
                                    value={markerForm.iconSize}
                                    onChange={e => setMarkerForm(f => ({ ...f, iconSize: Number(e.target.value) }))}
                                />
                            </div>

                            <label className="map-admin-checkbox">
                                <input
                                    type="checkbox"
                                    checked={markerForm.isHoverOnly}
                                    onChange={e => setMarkerForm(f => ({ ...f, isHoverOnly: e.target.checked }))}
                                />
                                Hover Only
                            </label>

                            {formError && <p className="map-admin-error">{formError}</p>}

                            <div className="map-admin-actions">
                                <button className="map-admin-btn map-admin-btn-green" onClick={handlePlaceMarker}>Place</button>
                                <button className="map-admin-btn map-admin-btn-gray" onClick={cancelPlacement}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ padding: '10px', backgroundColor: 'black' }}>
                    <p><strong>Current Map ID:</strong> {currentMapId}</p>
                    <p><strong>Connected Maps:</strong> {connectedMapIds.join(', ')}</p>
                    <p><strong>Markers:</strong> {markers.length}</p>
                </div>
            </div>
        </div>
    );
}

export default MapPage;
