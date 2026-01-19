import mapsData from '../data/maps.json';
import markersData from '../data/markers.json';
import connectionsData from '../data/connections.json';

console.log("markerdata",markersData);
console.log("markerdata southernplaza",markersData.rabanastre_southern_plaza);

// Get all maps
export const getAllMaps = () => {
    return mapsData;
};

// get map by ID
export const getMapById = (mapId) => {
    return mapsData[mapId] || null;
};

// get all markers from a specific map
export const getMarkersByMapID = (mapId) => {
    return markersData[mapId] || [];
};

// get connected map IDS for a specific map
export const getConnectionsByMapID = (mapId) => {
    return connectionsData[mapId] || [];
};

// get an array of all map ids
export const getMapOrder = () => {
    return Object.keys(mapsData);
};

// get the next map ID in sequence
export const getNextMapId = (currentMapId) => {
    const mapOrder = getMapOrder();
    const currentIndex = mapOrder.indexOf(currentMapId);

    if (currentIndex === -1 || currentIndex === mapOrder.length - 1) {
        return null;
    }
    return mapOrder[currentIndex + 1];
};

// get the previous map ID in sequence
export const getPreviousMapId = (currentMapId) => {
    const mapOrder = getMapOrder();
    const currentIndex = mapOrder.indexOf(currentMapId);
    if (currentIndex === -1 || currentIndex === 0) {
        return null;
    }
    return mapOrder[currentIndex - 1];
};