import './App.css'

import {ImageOverlay, MapContainer, Marker, Popup, useMap} from "react-leaflet";
import L from 'leaflet';
import {Icon} from "leaflet/src/layer/index.js";
import {useEffect, useState} from "react";

function App() {

    // Bounds of the map Usage = ([0,0], [maxWidthOfMap, maxHeightOfMap])
    const padding = 100;

    // TODO: change bounds from a statically intialized var to a state based var that changes on map change
    const bounds = new L.latLngBounds(
        [-padding,-padding],
        [3076 + padding,3438 + padding]
    );

    const [currentMap, setCurrentMap] = useState("/final-fantasy-12-TZA-Interactive-map-react/Rabanastre/EastEnd.png");
    const [currentMapIndex, setCurrentMapIndex] = useState(0);

    const mapTitles = [
        "Rabanastre - East End",
        "Dalmasca Eastersand - The Stepping",
        "Dalmasca Eastersand - Yardang Labyrinth",
    ]

    const maps = [
        "/final-fantasy-12-TZA-Interactive-map-react/Rabanastre/EastEnd.png",
        "/final-fantasy-12-TZA-Interactive-map-react/DalmascaEstersand/TheStepping.png",
        "/final-fantasy-12-TZA-Interactive-map-react/DalmascaEstersand/YardangLabyrinth.png",
    ]

    // Array of marker objects Usage = (mapIndex([x,y],info))
    // TODO: Pull markers from an internal db to clean the code for larger maps

    const eastEndMarkers = [];

    const theSteppingMarkers = [
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

    const yardangLabyrinthMarkers = [
        {
            geocode: [254.71,2338],
            popUp: (
                <>
                    <h3>Chest 17:</h3>
                    <strong>Item:</strong> Antidote <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )

        },
        {
            geocode: [803,1089],
            popUp: (
                <>
                    <h3>Chest 16:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [863,898],
            popUp: (
                <>
                    <h3>Chest 15:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 30% <br />
                    <strong>Gil Amount:</strong> 120
                </>
            )
        },
        {
            geocode: [2094,1037],
            popUp: (
                <>
                    <h3>Chest 22:</h3>
                    <strong>Item:</strong> Eye Drops <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [1883,2424],
            popUp: (
                <>
                    <h3>Chest 21:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [2552,2359],
            popUp: (
                <>
                    <h3>Chest 23:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 35
                </>
            )
        },
        {
            geocode: [2150,2619],
            popUp: (
                <>
                    <h3>Chest 19:</h3>
                    <strong>Item:</strong> Phoenix Down <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 100
                </>
            )
        },
        {
            geocode: [2476,2619],
            popUp: (
                <>
                    <h3>Chest 20:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite A <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 30
                </>
            )
        },
        {
            geocode: [841,3396],
            popUp: (
                <>
                    <h3>Chest 18:</h3>
                    <strong>Item:</strong> Potion <br />
                    <strong>Common Diamond Armlet Item:</strong> Knot of Rust <br />
                    <strong>Rare Diamond Armlet Item:</strong> Meteorite B <br />
                    <strong>Chance:</strong> 35% <br />
                    <strong>Gil Amount:</strong> 30
                </>
            )
        },
    ];

    const markers = [
        eastEndMarkers, theSteppingMarkers, yardangLabyrinthMarkers
    ]

    // create a custom icon for the chests to be used
    // TODO: Create multiple icons for each map interactable (chests, hunts, key items etc)
    const customIcon = new Icon({
        iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/Chestff12.png",
        iconSize: [30, 30],
    })

    const handleClickNext = () => {
        console.log(currentMap)
        console.log("Click")
        console.log(currentMapIndex)
        if (currentMapIndex < markers.length - 1) {
            console.log("Changing Map Next")
            setCurrentMap(maps[currentMapIndex + 1])
            setCurrentMapIndex(currentMapIndex + 1)
        }


    }

    const handleClickPrev = () => {
        console.log(currentMap)
        console.log("Click")
        console.log(currentMapIndex)
        if (currentMapIndex > 0) {
            console.log("Changing Map Prev")
            setCurrentMap(maps[currentMapIndex - 1])
            setCurrentMapIndex(currentMapIndex - 1)
        }


    }

    // Testing function remove when done
    // Credit to: Grzegorz T. https://stackoverflow.com/users/10424385/grzegorz-t
        const GetCoordinates = () => {
        console.log("Get Coordinates start")
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
            <div className="Title"><h1>{mapTitles[currentMapIndex]}</h1>
                <h3>Interactive Map - WIP</h3>
            </div>
            <div className="Button">
                <button onClick={handleClickPrev}>Prev Map</button>
                <button onClick={handleClickNext}>Next Map</button>
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
                    url={currentMap}
                    bounds={bounds}>
                </ImageOverlay>
                <GetCoordinates />
                {markers[currentMapIndex].map((marker => (
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