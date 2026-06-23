import { useMapData } from '../hooks/useMapData.js';
import { useMarkers } from '../hooks/useMarkers.js';
import MapContainer from '../components/Map/MapContainer.jsx';
import MapNavigation from '../components/Map/MapNavigation.jsx';
import Sidebar from '../components/UI/Sidebar.jsx';

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

    const markers = useMarkers(currentMapId);
    console.log("markers in app", markers);

    const handleMarkerClick = (marker) => {
        if (marker.targetMap) {
            goToMapById(marker.targetMap);
        }
    };

    if (!currentMap) {
        return (
            <div className="app">
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
                    />
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
