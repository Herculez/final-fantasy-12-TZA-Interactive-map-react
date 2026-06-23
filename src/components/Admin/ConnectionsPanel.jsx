import { useState, useEffect, Fragment } from 'react';
import { getAllMaps, getAllConnections, createConnection, updateConnection, deleteConnection } from '../../services/mapService.js';
import './admin.css';

const ConnectionForm = ({ form, setForm, maps, editConnections, setEditConnections, isEdit, onSave, onCancel, error }) => {
    const connectionsValue = isEdit ? editConnections : form.connections;
    const setConnectionsValue = isEdit
        ? setEditConnections
        : (val) => setForm(f => ({ ...f, connections: val }));

    const addMapToConnections = (mapId) => {
        const arr = JSON.parse(connectionsValue || '[]');
        if (!arr.includes(mapId)) setConnectionsValue(JSON.stringify([...arr, mapId]));
    };

    return (
        <div className="admin-form">
            {!isEdit && (
                <div className="admin-field">
                    <label>Map</label>
                    <select className="admin-select" value={form.map} onChange={e => setForm(f => ({ ...f, map: e.target.value }))}>
                        <option value="">-- select map --</option>
                        {maps.map(m => <option key={m.id} value={m.id}>{m.displayName || m.id}</option>)}
                    </select>
                </div>
            )}
            <div className="admin-field">
                <label>Connected Map IDs (JSON array)</label>
                <textarea
                    className="admin-textarea"
                    rows={3}
                    value={connectionsValue}
                    onChange={e => setConnectionsValue(e.target.value)}
                />
                <div className="admin-map-pills">
                    {maps.map(m => (
                        <button key={m.id} className="admin-btn admin-btn-dark" onClick={() => addMapToConnections(m.id)}>
                            {m.id}
                        </button>
                    ))}
                </div>
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-form-actions">
                <button className="admin-btn admin-btn-green" onClick={onSave}>Save</button>
                <button className="admin-btn admin-btn-gray" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

const ConnectionsPanel = () => {
    const [connections, setConnections] = useState([]);
    const [maps, setMaps] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({ map: '', connections: '[]' });
    const [editMap, setEditMap] = useState(null);
    const [editConnections, setEditConnections] = useState('[]');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            const [mapsData, connectionsData] = await Promise.all([getAllMaps(), getAllConnections()]);
            setMaps(mapsData ?? []);
            setConnections(connectionsData ?? []);
        }
        fetchData();
    }, []);

    const refetch = async () => {
        const data = await getAllConnections();
        setConnections(data ?? []);
    };

    const handleAdd = async () => {
        try {
            setError('');
            await createConnection(addForm.map, JSON.parse(addForm.connections));
            setShowAdd(false);
            setAddForm({ map: '', connections: '[]' });
            refetch();
        } catch (e) {
            setError(e.response?.data?.error || e.message);
        }
    };

    const handleUpdate = async (mapId) => {
        try {
            setError('');
            await updateConnection(mapId, JSON.parse(editConnections));
            setEditMap(null);
            refetch();
        } catch (e) {
            setError(e.response?.data?.error || e.message);
        }
    };

    const handleDelete = async (mapId) => {
        if (!confirm(`Delete connections for "${mapId}"?`)) return;
        await deleteConnection(mapId);
        refetch();
    };

    const startEdit = (row) => {
        setEditMap(row.map);
        setEditConnections(JSON.stringify(row.connections));
        setError('');
    };

    return (
        <div>
            <div className="admin-panel-header">
                <span className="admin-panel-title">Connections ({connections.length})</span>
                <button className="admin-btn admin-btn-green" onClick={() => { setShowAdd(s => !s); setError(''); }}>
                    + Add Connection
                </button>
            </div>

            {showAdd && (
                <ConnectionForm
                    form={addForm} setForm={setAddForm} maps={maps} error={error}
                    onSave={handleAdd}
                    onCancel={() => { setShowAdd(false); setError(''); }}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Map</th>
                        <th>Connected Maps</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {connections.map(row => (
                        <Fragment key={row.map}>
                            <tr>
                                <td className="mono">{row.map}</td>
                                <td>
                                    <div className="admin-tags">
                                        {row.connections.map(c => (
                                            <span key={c} className="admin-tag">{c}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="nowrap">
                                    <button className="admin-btn admin-btn-blue" onClick={() => startEdit(row)}>Edit</button>{' '}
                                    <button className="admin-btn admin-btn-red" onClick={() => handleDelete(row.map)}>Delete</button>
                                </td>
                            </tr>
                            {editMap === row.map && (
                                <tr>
                                    <td colSpan={3}>
                                        <ConnectionForm
                                            form={{}} setForm={() => {}} maps={maps} isEdit
                                            editConnections={editConnections} setEditConnections={setEditConnections}
                                            error={error}
                                            onSave={() => handleUpdate(row.map)}
                                            onCancel={() => { setEditMap(null); setError(''); }}
                                        />
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConnectionsPanel;
