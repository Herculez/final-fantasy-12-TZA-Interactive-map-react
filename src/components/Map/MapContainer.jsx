import { MapContainer as LeafletMap, ImageOverlay } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { getMapImagePath } from "../../utils/constants.js";
import MapMarker from "./MapMarker.jsx";

// main map display

const ClickHandler = ({ onMapClick }) => {
    useMapEvents({ click: (e) => onMapClick(e.latlng) });
    return null;
};

const MapContainer = ({ mapData, markers, onMarkerClick, adminMode = false, onMapClick }) => {

    if (!mapData) {
        return <div>Loading Map...</div>;
    }

    const mapMarkers = markers;

    const imagePath = getMapImagePath(mapData.region, mapData.filename);
    console.log("Markers for map:", mapData.id, mapMarkers);

    return (
        <LeafletMap className={`leaflet-container${adminMode ? ' admin-mode' : ''}`}
            key={mapData.id}
            center={mapData.center}
            zoom={mapData.zoom}
            minZoom={mapData.minZoom}
            maxZoom={mapData.maxZoom}
            crs={L.CRS.Simple}
            style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}
        >
            <ImageOverlay
                url={imagePath}
                bounds={mapData.bounds}
            />

            {adminMode && onMapClick && <ClickHandler onMapClick={onMapClick} />}

            {mapMarkers.map((marker) => (
                <MapMarker
                    key={marker.id}
                    marker={marker}
                    onMarkerClick={onMarkerClick}
                />
            ))}
        </LeafletMap>
    );
};

export default MapContainer;
