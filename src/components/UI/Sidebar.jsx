import React, { useState } from 'react';

const Sidebar = () => {
    const [activeFilters, setActiveFilters] = useState({
        hunts: true,
        treasures: true,
        shops: true,
        savePoints: true,
    });

    const [activeLayer, setActiveLayer] = useState('rabanastre');

    const toggleFilter = (filter) => {
        setActiveFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
    };

    const layers = ['rabanastre', 'dalmasca', 'giza', 'westersand', 'pharos'];

    return (
        <div className="sidebar">
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <h2>Map Controls</h2>
            </div>

            {/* Map Layers */}
            <div className="sidebar-section">
                <h3>Regions</h3>
                <div className="layer-buttons">
                    {layers.map((layer) => (
                        <button
                            key={layer}
                            onClick={() => setActiveLayer(layer)}
                            className={`layer-btn ${activeLayer === layer ? 'active' : ''}`}
                        >
                            {layer}
                        </button>
                    ))}
                </div>
            </div>

            {/* Location Filters */}
            <div className="sidebar-section">
                <h3>Filters</h3>
                <div className="filter-list">
                    {Object.entries(activeFilters).map(([key, value]) => (
                        <label key={key} className="filter-item">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={() => toggleFilter(key)}
                                className="filter-checkbox"
                            />
                            <span className="filter-label">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="sidebar-section">
                <h3>Legend</h3>
                <div className="legend-list">
                    <div className="legend-item">
                        <div className="legend-marker hunts"></div>
                        <span className="legend-text">Elite Hunts</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-marker treasures"></div>
                        <span className="legend-text">Treasure Chests</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-marker shops"></div>
                        <span className="legend-text">Shops</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-marker saves"></div>
                        <span className="legend-text">Save Points</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
