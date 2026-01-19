import {useState, useEffect, useMemo} from 'react';
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

    // update mapdata when current map id changes
    useEffect( () => {
        const mapData = getMapById(currentMapId);
        const connections = getConnectionsByMapID(currentMapId);

        setCurrentMap(mapData);
        setConnectedMapIds(connections);
    }, [currentMapId]);

    const hasNext = useMemo(() => {

        return getNextMapId(currentMapId) !== null;
    }, [currentMapId]);

    const hasPrevious = useMemo(() => {
        return getPreviousMapId(currentMapId) !== null;
    }, [currentMapId]);

    // nav functions
    const goToNextMap = () => {
        const nextMapId = getNextMapId(currentMapId);
        if (nextMapId) {
            setCurrentMapId(nextMapId);
        }
    };

    const goToPreviousMap = () => {
        const previousMapId = getPreviousMapId(currentMapId);
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