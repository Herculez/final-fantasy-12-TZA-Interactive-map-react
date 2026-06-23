import { useState, useEffect, Fragment } from 'react';
import { getAllMaps, getAllMarkers, getMarkersByMapID, createMarker, updateMarker, deleteMarker } from '../../services/mapService.js';
import './admin.css';

const EMPTY_FORM = {
    type: 'navigation', map: '', geocode: '[0, 0]',
    popup: '', icon: '{"url": "", "size": [32, 32]}',
    isHoverOnly: false, targetMap: '',
};

const MARKER_TYPES = ['navigation', 'treasure', 'hunt', 'npc', 'shop', 'save', 'other'];

const parseBody = (f) => ({
    type: f.type,
    map: f.map,
    geocode: JSON.parse(f.geocode),
    popup: f.popup || null,
    icon: JSON.parse(f.icon),
    isHoverOnly: !!f.isHoverOnly,
    targetMap: f.targetMap || null,
});

const MarkerForm = ({ form, setForm, maps, onSave, onCancel, error }) => (
    <div className="admin-form">
        <div className="admin-form-grid">
            <div className="admin-field">
                <label>Map</label>
                <select className="admin-select" value={form.map} onChange={e => setForm(f => ({ ...f, map: e.target.value }))}>
                    <option value="">-- select map --</option>
                    {maps.map(m => <option key={m.id} value={m.id}>{m.displayName || m.id}</option>)}
                </select>
            </div>
            <div className="admin-field">
                <label>Type</label>
                <select className="admin-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    {MARKER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>
            <div className="admin-field">
                <label>Geocode JSON [lat, lng]</label>
                <input className="admin-input" value={form.geocode} onChange={e => setForm(f => ({ ...f, geocode: e.target.value }))} />
            </div>
            <div className="admin-field">
                <label>Target Map</label>
                <select className="admin-select" value={form.targetMap} onChange={e => setForm(f => ({ ...f, targetMap: e.target.value }))}>
                    <option value="">-- none --</option>
                    {maps.map(m => <option key={m.id} value={m.id}>{m.displayName || m.id}</option>)}
                </select>
            </div>
            <div className="admin-field">
                <label>Popup</label>
                <input className="admin-input" value={form.popup} onChange={e => setForm(f => ({ ...f, popup: e.target.value }))} />
            </div>
            <div className="admin-field">
                <label>Icon JSON</label>
                <input className="admin-input" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
            </div>
        </div>
        <label className="admin-checkbox-label">
            <input type="checkbox" checked={!!form.isHoverOnly} onChange={e => setForm(f => ({ ...f, isHoverOnly: e.target.checked }))} />
            Hover Only
        </label>
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-form-actions">
            <button className="admin-btn admin-btn-green" onClick={onSave}>Save</button>
            <button className="admin-btn admin-btn-gray" onClick={onCancel}>Cancel</button>
        </div>
    </div>
);

const MarkersPanel = () => {
    const [markers, setMarkers] = useState([]);
    const [maps, setMaps] = useState([]);
    const [filterMap, setFilterMap] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchMaps() {
            const data = await getAllMaps();
            setMaps(data ?? []);
        }
        fetchMaps();
    }, []);

    useEffect(() => {
        async function fetchMarkers() {
            const data = filterMap
                ? await getMarkersByMapID(filterMap)
                : await getAllMarkers();
            setMarkers(data ?? []);
        }
        fetchMarkers();
    }, [filterMap]);

    const refetch = async () => {
        const data = filterMap ? await getMarkersByMapID(filterMap) : await getAllMarkers();
        setMarkers(data ?? []);
    };

    const handleAdd = async () => {
        try {
            setError('');
            await createMarker(parseBody(addForm));
            setShowAdd(false);
            setAddForm({ ...EMPTY_FORM });
            refetch();
        } catch (e) {
            setError(e.response?.data?.error || e.message);
        }
    };

    const handleUpdate = async () => {
        try {
            setError('');
            await updateMarker(editId, parseBody(editForm));
            setEditId(null);
            refetch();
        } catch (e) {
            setError(e.response?.data?.error || e.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(`Delete marker #${id}?`)) return;
        await deleteMarker(id);
        refetch();
    };

    const startEdit = (m) => {
        setEditId(m.id);
        setEditForm({ ...m, geocode: JSON.stringify(m.geocode), icon: JSON.stringify(m.icon) });
    };

    return (
        <div>
            <div className="admin-panel-header">
                <span className="admin-panel-title">Markers ({markers.length})</span>
                <div className="admin-filter-bar">
                    <select className="admin-select" style={{ width: 'auto' }} value={filterMap} onChange={e => setFilterMap(e.target.value)}>
                        <option value="">All maps</option>
                        {maps.map(m => <option key={m.id} value={m.id}>{m.displayName || m.id}</option>)}
                    </select>
                    <button className="admin-btn admin-btn-green" onClick={() => { setShowAdd(s => !s); setError(''); }}>
                        + Add Marker
                    </button>
                </div>
            </div>

            {showAdd && (
                <MarkerForm
                    form={addForm} setForm={setAddForm} maps={maps} error={error}
                    onSave={handleAdd}
                    onCancel={() => { setShowAdd(false); setError(''); }}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Map</th>
                        <th>Popup</th>
                        <th>Target Map</th>
                        <th>Hover</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {markers.map(m => (
                        <Fragment key={m.id}>
                            <tr>
                                <td className="muted">{m.id}</td>
                                <td>{m.type}</td>
                                <td className="mono">{m.map}</td>
                                <td>{m.popup}</td>
                                <td className="mono">{m.targetMap}</td>
                                <td>{m.isHoverOnly ? 'Yes' : ''}</td>
                                <td className="nowrap">
                                    <button className="admin-btn admin-btn-blue" onClick={() => startEdit(m)}>Edit</button>{' '}
                                    <button className="admin-btn admin-btn-red" onClick={() => handleDelete(m.id)}>Delete</button>
                                </td>
                            </tr>
                            {editId === m.id && (
                                <tr>
                                    <td colSpan={7}>
                                        <MarkerForm
                                            form={editForm} setForm={setEditForm} maps={maps} error={error}
                                            onSave={handleUpdate}
                                            onCancel={() => { setEditId(null); setError(''); }}
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

export default MarkersPanel;
