import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                {/* Logo/Title */}
                <div className="navbar-brand">
                    <div className="navbar-title">FINAL FANTASY XII</div>
                    <div className="navbar-subtitle">Ivalice Atlas</div>
                </div>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <a href="#map" className="navbar-link">Map</a>
                    <a href="#database" className="navbar-link">Database</a>
                    <a href="#hunts" className="navbar-link">Hunts</a>
                    <a href="#treasures" className="navbar-link">Treasures</a>
                </div>

                {/* User Settings */}
                <div className="navbar-settings">
                    <button className="settings-btn">
                        <svg className="settings-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
