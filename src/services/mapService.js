import axios from "axios";

const API_URL = "http://localhost:3001"




// Get all maps
export const getAllMaps = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/maps`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// get map by ID
export const getMapById = async (mapId) => {
    try {
        const response = await axios.get(`${API_URL}/api/map/${mapId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }

};

// get all markers from a specific map
export const getMarkersByMapID = async (mapId) => {
    try {
        const response = await axios.get(`${API_URL}/api/markers/${mapId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// get connected map IDS for a specific map
export const getConnectionsByMapID = async (mapId) => {
    try {
        const response = await axios.get(`${API_URL}/api/connections/${mapId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// get an array of all map ids
export const getMapOrder = async () => {
    const maps = await getAllMaps();
    return maps.map(m => m.id);
};

// get the next map ID in sequence
export const getNextMapId = async (currentMapId) => {
    const mapOrder = await getMapOrder();
    const currentIndex = mapOrder.indexOf(currentMapId);

    if (currentIndex === -1 || currentIndex === mapOrder.length - 1) {
        return null;
    }
    return mapOrder[currentIndex + 1];
};

// get the previous map ID in sequence
export const getPreviousMapId = async (currentMapId) => {
    const mapOrder = await getMapOrder();
    const currentIndex = mapOrder.indexOf(currentMapId);
    if (currentIndex === -1 || currentIndex === 0) {
        return null;
    }
    return mapOrder[currentIndex - 1];
};