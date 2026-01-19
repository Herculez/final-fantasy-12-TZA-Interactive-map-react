import {MapContainer as LeafletMap, ImageOverlay, Marker} from 'react-leaflet';
import L from 'leaflet';
import { getMapImagePath } from "../../utils/constants.js";
import MapMarker from "./MapMarker.jsx";

// main map display

const MapContainer = ({ mapData, markers, onMarkerClick}) => {

    if (!mapData) {
        return <div>Loading Map...</div>;
    }

    const mapMarkers = markers;

    const imagePath = getMapImagePath(mapData.region, mapData.filename);
    console.log("Markers for map:", mapData.id, mapMarkers);

    return (
        <LeafletMap className= "leaflet-container"
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
            ></ImageOverlay>

            {mapMarkers
                .map((marker) => (
                <MapMarker
                    key={marker.id}
                    marker={marker}
                    onMarkerClick={onMarkerClick}
                >
                </MapMarker>
            ))}
        </LeafletMap>
    );
};

export default MapContainer;