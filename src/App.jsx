import { useMapData } from './hooks/useMapData.js';
import { useMarkers } from "./hooks/useMarkers.js";
import MapContainer from './components/Map/MapContainer.jsx';
import MapNavigation from './components/Map/MapNavigation.jsx';
import './App.css';

function App() {
    // get the first ID from maps.json as starting map
    const initialMapId = 'rabanastre_southern_plaza';

    // init vars
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

    // get markers for current map
    const markers = useMarkers(currentMapId);
    console.log("markers in app",markers);

    // handle marker clicks
    const handleMarkerClick = (marker) => {
        if (marker.targetMap) {
            goToMapById(marker.targetMap);
        }
    }

    // Show loading state while no data
    if (!currentMap) {
        return (
            <div className ="app">
                <div style = {{ textAlign: 'center', padding: '50px'}}>
                    Loading Maps..
                </div>
            </div>
        );
    }

    return (
        <div className ="app">
            <MapNavigation
             onNext={goToNextMap}
             onPrevious={goToPreviousMap}
             hasNext={hasNext}
             hasPrevious={hasPrevious}
             currentMapName={currentMap.displayName}
            />
            <MapContainer
                mapData={currentMap}
                markers={markers}
                onMarkerClick={handleMarkerClick}
            />

            <div style = {{ padding: '10px', backgroundColor: 'black' }}>
                <p><strong>Current Map ID:</strong> {currentMapId}</p>
                <p><strong>Connected Maps:</strong> {connectedMapIds.join(', ')}</p>
                <p><strong>Markers:</strong> {markers.length}</p>
            </div>
        </div>
    )
}
export default App;
