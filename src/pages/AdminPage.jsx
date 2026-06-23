import { useState } from 'react';
import MapsPanel from '../components/Admin/MapsPanel.jsx';
import MarkersPanel from '../components/Admin/MarkersPanel.jsx';
import ConnectionsPanel from '../components/Admin/ConnectionsPanel.jsx';
import '../components/Admin/admin.css';

const TABS = ['maps', 'markers', 'connections'];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('maps');

    return (
        <div className="admin-scroll">
            <div className="admin-page">
                <div className="admin-header">
                    <h2>Admin Panel</h2>
                </div>

                <div className="admin-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div style={{ display: activeTab === 'maps' ? 'block' : 'none' }}>
                    <MapsPanel />
                </div>
                <div style={{ display: activeTab === 'markers' ? 'block' : 'none' }}>
                    <MarkersPanel />
                </div>
                <div style={{ display: activeTab === 'connections' ? 'block' : 'none' }}>
                    <ConnectionsPanel />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
