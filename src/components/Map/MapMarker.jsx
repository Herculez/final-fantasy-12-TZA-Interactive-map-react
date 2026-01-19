import {Marker, Popup, Tooltip} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map marker init

const MapMarker = ({ marker, onMarkerClick}) => {
    console.log(marker);
    if (!marker || !marker.icon) return null;

    const icon = new Icon({
        iconUrl: marker.icon.url,
        iconSize: marker.icon.size,
    });

    const handleClick = () => {
        if (onMarkerClick || marker.targetMap) {
            onMarkerClick(marker);
        }
    };
    return (
        <Marker
            position={marker.geocode}
            icon={icon}
            eventHandlers={{
                click: handleClick,
            }}
        >
            {marker.isHoverOnly ? (
                <Tooltip permanent = {false}>
                    <div dangerouslySetInnerHTML={{ __html: marker.popup}}></div>
                </Tooltip>
            ) : (
                <Popup>
                    <div dangerouslySetInnerHTML={{ __html: marker.popup}}></div>
                </Popup>
            )}
        </Marker>
    );
};

export default MapMarker;