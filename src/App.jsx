import './App.css'

import {ImageOverlay, MapContainer, Marker, Popup, useMap} from "react-leaflet";
import L from 'leaflet';
import {Icon} from "leaflet/src/layer/index.js";
import {useEffect} from "react";

function App() {

    // Bounds of the map Usage = ([0,0], [maxWidthOfMap, maxHeightOfMap])
    const padding = 100;
    const bounds = new L.latLngBounds(
        [-padding,-padding],
        [3076 + padding,3438 + padding]
    );

    // Array of markers Usage = ([x,y],info)
    // TODO: Pull markers from an internal db to clean the code for larger maps
    const markers = [
        {
            geocode: [478,1279],
            popUp: (
                <>
                <h3>Chest 1:</h3>
                <strong>Item:</strong> Antidote <br />
                <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                <strong>Chance:</strong> 35% <br />
                <strong>Gil Amount:</strong> 35
                </>
            )

        },
        {
            geocode: [475,2281],
            popUp: (
                <>
                    <h3>Chest 2:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [1482,3174],
            popUp: (
                <>
                    <h3>Chest 3:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 30% <br />
                    <strong>Gil Amount:</strong> 120
                </>
            )
        },
        {
            geocode: [2220,3405],
            popUp: (
                <>
                    <h3>Chest 4:</h3>
                    <strong>Item:</strong> Eye Drops <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [2526,2775],
            popUp: (
                <>
                    <h3>Chest 5:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [2211,1834],
            popUp: (
                <>
                    <h3>Chest 6:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [1400,415],
            popUp: (
                <>
                    <h3>Chest 7:</h3>
                    <strong>Item:</strong> Phoenix Down <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 100
                </>
            )
        },
        {
            geocode: [2372,635],
            popUp: (
                <>
                    <h3>Chest 8:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 30
                </>
            )
        },
        {
            geocode: [2814,1033],
            popUp: (
                <>
                    <h3>Chest 9:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite B <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 30
                </>
            )
        },
        {
            geocode: [2443,189],
            popUp: (
                <>
                    <h3>Chest 10:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 50
                </>
            )
        },
    ];

    // create a custom icon for the chests to be used
    // TODO: Create multiple icons for each map interactable (chests, hunts, key items etc)
    const customIcon = new Icon({
        iconUrl: "${import.meta.env.BASE_URL}/Icons/Chestff12.png",
        iconSize: [30, 30],
    })


    // Testing function remove when done
    // Credit to: Grzegorz T. https://stackoverflow.com/users/10424385/grzegorz-t
        const GetCoordinates = () => {

        // hook for leaflet map instance
        // allows us to interact with the map instance thats generated by the <MapContainer>
        const map = useMap();
        let count = 0;

        useEffect(() => {
            // If there is no map just end the function
            if (!map) return;

            // Create a div in the bottom right for testing purposes
            const info = L.DomUtil.create("div", "legend");

            const position = L.Control.extend({
                options: {
                    position: 'bottomright'
                },

                // When the div is created it is e,pty
                onAdd: function () {
                    info.textContent = '';
                    return info;
                }
            })

            // When the mouse moves on the map, put the latlng coord in the div
            map.on('mousemove', (e) => {
                info.textContent = e.latlng;
            })

            map.on('click', (e) => {
                count++
                console.log("Chest Number: " , count, e.latlng);
            })
            map.addControl(new position());
            // the map is the dependancy for this func
            }, [map])
    }

    // Show the app class on the page
    // Map usage
    // MapContainer (ImageOverlay, UseMapFuncs)
    return (
        <div className="App">
            <div className="Title"><h1>Dalmasca Estersand - The Stepping</h1>
                <h3>Interactive Map</h3>
            </div>
            <MapContainer
                center={[1538,1719]}
                zoom={-2}
                minZoom={-2}
                maxZoom={0}
                bounds={bounds}
                maxBounds={bounds}
                scrollWheelZoom={true}
                crs={L.CRS.Simple}
            >
                <ImageOverlay
                    url="${import.meta.env.BASE_URL}/DalmascaEstersand/TheStepping.png"
                    //url="/EastEndRabanastre/EastEnd.png"
                    bounds={bounds}>
                </ImageOverlay>

                <GetCoordinates />
                {markers.map((marker => (
                        <Marker position={marker.geocode} icon={customIcon} key={marker.geocode}>
                            <Popup autoPan={false}>
                                {marker.popUp}
                            </Popup>
                        </Marker>
                )))}
            </MapContainer>
        </div>
    );
}

export default App;