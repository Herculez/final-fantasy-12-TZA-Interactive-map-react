// Constants used for easy declaration

// add new icons here — url is relative to ASSET_BASE_PATH

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

export const ICON_OPTIONS = [
    { label: 'Arrow',  url: `${ASSET_BASE_PATH}/Icons/ff12arrow.png` },
    { label: 'Chest',  url: `${ASSET_BASE_PATH}/Icons/Chestff12.png` },
    { label: 'Saurian',  url: `${ASSET_BASE_PATH}/Icons/SaurianIcon.png` },
];

export const MARKER_TYPES = {
    CONNECTION: 'CONNECTION',
    POI: 'POI',
    CHEST: 'CHEST',
    QUEST: 'QUEST',
    HUNT: 'HUNT',
    NPC: 'NPC',
};