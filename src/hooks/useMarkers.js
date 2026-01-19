import {useState, useEffect} from 'react';
import { getMarkersByMapID} from "../services/mapService.js";

// hook for markers by map
export const useMarkers = (mapId) => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (mapId){
            const mapMarkers = getMarkersByMapID(mapId);
            setMarkers(mapMarkers);
        } else {
            setMarkers([]);
        }
    }, [mapId]);

    return markers;
}