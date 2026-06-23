import { useState, useEffect, Fragment } from 'react';
import { getAllMaps, createMap, updateMap, deleteMap } from '../../services/mapService.js';
import { getMapImagePath } from '../../utils/constants.js';
import './admin.css';

const EMPTY_FORM = {
    id: '', displayName: '', region: '', filename: '',
    bounds: '[[0,0],[100,100]]', center: '[50,50]',
    zoom: -2, minZoom: -3, maxZoom: 1,
};

const parseBody = (f) => ({
    ...f,
    bounds: JSON.parse(f.bounds),
    center: JSON.parse(f.center),
    zoom: Number(f.zoom),
    minZoom: Number(f.minZoom),
    maxZoom: Number(f.maxZoom),
});

const MapForm = ({ form, setForm, onSave, onCancel, hideId, error }) => {
    const field = (key, label, type = 'text') => (
        <div className="admin-field">
            <label>{label}</label>
            <input
                type={type}
                className="admin-input"
                value={form[key] ?? ''}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            />
        </div>
    );

    return (
        <div className="admin-form">
            <div className="admin-form-grid">
                {!hideId && field('id', 'ID (slug)')}
                {field('displayName', 'Display Name')}
                {field('region', 'Region')}
                {field('filename', 'Filename')}
                {field('bounds', 'Bounds JSON e.g. [[0,0],[2000,2000]]')}
                <div className="admin-field">
                    <label>Center JSON e.g. [1000,1000]</label>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                            className="admin-input"
                            value={form.center ?? ''}
                            onChange={e => setForm(f => ({ ...f, center: e.target.value }))}
                        />
                        <button
                            type="button"
                            className="admin-btn admin-btn-dark"
                            onClick={() => {
                                try {
                                    const bounds = JSON.parse(form.bounds);
                                    const center = [Math.round(bounds[1][0] / 2), Math.round(bounds[1][1] / 2)];
                                    setForm(f => ({ ...f, center: JSON.stringify(center) }));
                                } catch { }
                            }}
                        >
                            Center on Bounds
                        </button>
                    </div>
                </div>
                {field('zoom', 'Zoom', 'number')}
                {field('minZoom', 'Min Zoom', 'number')}
                {field('maxZoom', 'Max Zoom', 'number')}
            </div>
            {error && <p className="admin-error">{error}</p>}
            <div className="admin-form-actions">
                <button className="admin-btn admin-btn-green" onClick={onSave}>Save</button>
                <button className="admin-btn admin-btn-gray" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

const getImageDimensions = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
});

const MapsPanel = () => {
    const [maps, setMaps] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [syncResult, setSyncResult] = useState('');
    const [addForm, setAddForm] = useState({ ...EMPTY_FORM });
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            const data = await getAllMaps();
            setMaps(data ?? []);
        }
        fetchData();
    }, []);

    const refetch = async () => {
        const data = await getAllMaps();
        setMaps(data ?? []);
    };

    const handleAdd = async () => {
        try {
            setError('');
            await createMap(parseBody(addForm));
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
            await updateMap(editId, parseBody(editForm));
            setEditId(null);
            refetch();
        } catch (e) {
            setError(e.response?.data?.error || e.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(`Delete map "${id}"?`)) return;
        await deleteMap(id);
        refetch();
    };

    const handleSyncBoundsFromImages = async () => {
        setSyncing(true);
        setSyncResult('');
        let updated = 0;

        for (const map of maps) {
            try {
                const url = getMapImagePath(map.region, map.filename);
                const { width, height } = await getImageDimensions(url);
                const bounds = [[0, 0], [height, width]];
                const center = [Math.round(height / 2), Math.round(width / 2)];
                await updateMap(map.id, { ...map, bounds, center });
                updated++;
            } catch (e) {
                console.log(`Skipped ${map.id}:`, e.message);
            }
        }

        await refetch();
        setSyncing(false);
        setSyncResult(`Updated ${updated} / ${maps.length} maps`);
    };

    const startEdit = (map) => {
        setEditId(map.id);
        setEditForm({
            ...map,
            bounds: typeof map.bounds === 'string' ? map.bounds : JSON.stringify(map.bounds),
            center: typeof map.center === 'string' ? map.center : JSON.stringify(map.center),
        });
    };

    return (
        <div>
            <div className="admin-panel-header">
                <span className="admin-panel-title">Maps ({maps.length})</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {syncResult && <span style={{ fontSize: '12px', color: '#8c8' }}>{syncResult}</span>}
                    <button
                        className="admin-btn admin-btn-dark"
                        onClick={handleSyncBoundsFromImages}
                        disabled={syncing}
                    >
                        {syncing ? 'Syncing...' : 'Sync Bounds from Images'}
                    </button>
                    <button className="admin-btn admin-btn-green" onClick={() => { setShowAdd(s => !s); setError(''); }}>
                        + Add Map
                    </button>
                </div>
            </div>

            {showAdd && (
                <MapForm
                    form={addForm} setForm={setAddForm} error={error}
                    onSave={handleAdd}
                    onCancel={() => { setShowAdd(false); setError(''); }}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Display Name</th>
                        <th>Region</th>
                        <th>Filename</th>
                        <th>Zoom</th>
                        <th>Min/Max</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {maps.map(map => (
                        <Fragment key={map.id}>
                            <tr>
                                <td className="mono">{map.id}</td>
                                <td>{map.displayName}</td>
                                <td>{map.region}</td>
                                <td>{map.filename}</td>
                                <td>{map.zoom}</td>
                                <td>{map.minZoom} / {map.maxZoom}</td>
                                <td className="nowrap">
                                    <button className="admin-btn admin-btn-blue" onClick={() => startEdit(map)}>Edit</button>{' '}
                                    <button className="admin-btn admin-btn-red" onClick={() => handleDelete(map.id)}>Delete</button>
                                </td>
                            </tr>
                            {editId === map.id && (
                                <tr>
                                    <td colSpan={7}>
                                        <MapForm
                                            form={editForm} setForm={setEditForm} hideId error={error}
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

export default MapsPanel;
