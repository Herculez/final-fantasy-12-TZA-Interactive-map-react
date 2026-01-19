// Constants used for easy declaration

export const ASSET_BASE_PATH = '/final-fantasy-12-TZA-Interactive-map-react';

// map image paths
export const getMapImagePath = (region, filename) => {
    return `${ASSET_BASE_PATH}/${region}/${filename}`;
};

// icon image paths
export const getIconPath = (iconName) => {
    return `${ASSET_BASE_PATH}/${iconName}`;
}

// leaflet defaults that can be overridden
export const DEFAULT_MAP_SETTINGS = {
    zoom: -2,
    minZoom: -3,
    maxZoom: 1,
    center: [1538, 1710],
    crs: 'Simple'
};

export const MARKER_TYPES = {
    CONNECTION: 'CONNECTION',
    POI: 'POI',
    CHEST: 'CHEST',
    QUEST: 'QUEST',
    HUNT: 'HUNT',
    NPC: 'NPC',
};