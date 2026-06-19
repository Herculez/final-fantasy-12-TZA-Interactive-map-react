import {useState, useEffect} from 'react';
import {getMarkersByMapID} from "../services/mapService.js";

// hook for markers by map
export const useMarkers = (mapId) => {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData()  {
            setLoading(true);
            if (mapId){
                const mapMarkers = await getMarkersByMapID(mapId);
                setMarkers(mapMarkers ?? []);
            } else {
                setMarkers([]);
            }
            setLoading(false);
        }
        fetchData();
    }, [mapId]);

    return markers;
}