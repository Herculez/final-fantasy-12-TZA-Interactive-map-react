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

export const createMap = async (mapData) => {
    try {
        const response = await axios.post(`${API_URL}/api/maps`, mapData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateMap = async (id, mapData) => {
    try {
        const response = await axios.put(`${API_URL}/api/map/${id}`, mapData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteMap = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/map/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// get all markers
export const getAllMarkers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/markers`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
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

export const createMarker = async (markerData) => {
    try {
        const response = await axios.post(`${API_URL}/api/markers`, markerData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateMarker = async (id, markerData) => {
    try {
        const response = await axios.put(`${API_URL}/api/markers/${id}`, markerData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteMarker = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/markers/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// get all connections
export const getAllConnections = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/connections`);
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

export const createConnection = async (map, connections) => {
    try {
        const response = await axios.post(`${API_URL}/api/connections`, { map, connections });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateConnection = async (mapId, connections) => {
    try {
        const response = await axios.put(`${API_URL}/api/connections/${mapId}`, { connections });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteConnection = async (mapId) => {
    try {
        await axios.delete(`${API_URL}/api/connections/${mapId}`);
    } catch (error) {
        console.log(error);
        throw error;
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
    if (currentIndex === -1 || currentIndex === mapOrder.length - 1) return null;
    return mapOrder[currentIndex + 1];
};

// get the previous map ID in sequence
export const getPreviousMapId = async (currentMapId) => {
    const mapOrder = await getMapOrder();
    const currentIndex = mapOrder.indexOf(currentMapId);
    if (currentIndex === -1 || currentIndex === 0) return null;
    return mapOrder[currentIndex - 1];
};
