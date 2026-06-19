import {useState, useEffect} from 'react';
import {
    getMapById,
    getNextMapId,
    getPreviousMapId,
    getConnectionsByMapID
} from "../services/mapService.js";

// init hook data
export const useMapData = (initialMapId) => {
    const [currentMapId, setCurrentMapId] = useState(initialMapId);
    const [currentMap, setCurrentMap] = useState(null);
    const [connectedMapIds, setConnectedMapIds] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    // update mapdata when current map id changes
    useEffect( () => {
        async function fetchData()  {
            const mapData = await getMapById(currentMapId);
            const connections = await getConnectionsByMapID(currentMapId);
            const nextId = await getNextMapId(currentMapId);
            const previousId = await getPreviousMapId(currentMapId);
            setCurrentMap(mapData);
            setConnectedMapIds(connections ?? []);
            setHasNext(nextId !== null);
            setHasPrevious(previousId !== null);
        }
        fetchData();
    }, [currentMapId]);

    // nav functions
    const goToNextMap = async () => {
        const nextMapId = await getNextMapId(currentMapId);
        if (nextMapId) {
            setCurrentMapId(nextMapId);
        }
    };

    const goToPreviousMap = async () => {
        const previousMapId = await getPreviousMapId(currentMapId);
        if (previousMapId) {
            setCurrentMapId(previousMapId);
        }
    }

    const goToMapById = (currentMapId) => {
        setCurrentMapId(currentMapId);
    };

    return {
        currentMapId,
        currentMap,
        connectedMapIds,
        goToNextMap,
        goToPreviousMap,
        goToMapById,
        hasNext,
        hasPrevious,
    }


};