import './App.css'

import {ImageOverlay, MapContainer, Marker, Popup, Tooltip, useMapEvents} from "react-leaflet";
import L from 'leaflet';
import {Icon} from "leaflet/src/layer/index.js";
import {useState} from "react";

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
        "Rabanastre - Southern Plaza",
        "Rabanastre - East Gate",
        "Dalmasca Eastersand - The Stepping",
        "Dalmasca Eastersand - Yardang Labyrinth",
    ]

    const maps = [
        "/final-fantasy-12-TZA-Interactive-map-react/Rabanastre/EastEnd.png",
        "/final-fantasy-12-TZA-Interactive-map-react/Rabanastre/SouthernPlaza.png",
        "/final-fantasy-12-TZA-Interactive-map-react/Rabanastre/EastGate.png",
        "/final-fantasy-12-TZA-Interactive-map-react/DalmascaEstersand/TheStepping.png",
        "/final-fantasy-12-TZA-Interactive-map-react/DalmascaEstersand/YardangLabyrinth.png",
    ]

    // Array of marker objects Usage = (mapIndex([x,y],info))
    // TODO: Pull markers from an internal db to clean the code for larger maps
    // TODO: Rotate tooltip travel markers/ potentially separate the tooltips from the markers

    const eastEndMarkers = [
        {
            geocode: [338,2491],
            popUp: (
                <>
                    <h3>To Rabanastre - Southern Plaza</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
        {
            geocode: [2067,50],
            popUp: (
                <>
                    <h3>To Rabanastre - Muthru Bazaar</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
        {
            geocode: [3083,2795],
            popUp: (
                <>
                    <h3>To Rabanastre - North End</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
    ];

    const southernPlazaMarkers = [
        {
            geocode: [1600,3481],
            popUp: (
                <>
                    <h3>To Rabanastre - East Gate</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
        {
            geocode: [-29,1700],
            popUp: (
                <>
                    <h3>To Rabanastre - South Gate</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [1611,-56],
            popUp: (
                <>
                    <h3>To Rabanastre - West Gate</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [2276,2569],
            popUp: (
                <>
                    <h3>To Rabanastre - East End</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
    ];

    const eastGateMarkers = [
        {
            geocode: [1274,74],
            popUp: (
                <>
                    <h3>To Rabanastre - Southern Plaza</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [1342,3410],
            popUp: (
                <>
                    <h3>To Dalmasca Estersand - The Stepping</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
    ];

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
        {
            geocode: [3120,1960],
            popUp: (
                <>
                    <h3>Dalmasca Estersand - Yardang Labyrinth</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickNext(),
        },
        {
            geocode: [125,240],
            popUp: (
                <>
                    <h3>To Rabanastre - East Gate</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
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
            ),
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
        {
            geocode: [1108,-23],
            popUp: (
                <>
                    <h3>To Dalmasca Estersand - Outpost</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [-76,1184],
            popUp: (
                <>
                    <h3>To Giza Plains</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [2330,3409],
            popUp: (
                <>
                    <h3>To Nalbina Fortress</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
        {
            geocode: [3162,1740],
            popUp: (
                <>
                    <h3>To Dalmasca Estersand - Sand-swept Maze</h3>
                </>
            ),
            icon: new Icon({
                iconUrl: "/final-fantasy-12-TZA-Interactive-map-react/Icons/ff12arrow.png",
                iconSize: [30, 30],
            }),
            isHoverOnly: true,
            onClick: () => handleClickPrev(),
        },
    ];

    const markers = [
        eastEndMarkers, southernPlazaMarkers, eastGateMarkers, theSteppingMarkers, yardangLabyrinthMarkers
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
    // https://stackoverflow.com/questions/70392715/how-to-get-coordinates-of-current-mouse-click-in-leaflet-react-js/70399299#70399299
    // Credit to: Muhammad Habibpour https://stackoverflow.com/users/10984472/muhammad-habibpour
    const MapEvents = () => {
        let count = 1;
        useMapEvents({
            click(e) {
                // setState your coords here
                // coords exist in "e.latlng.lat" and "e.latlng.lng"
                console.log("Marker: " , count, e.latlng);
                count++
                //console.log(e.latlng.lng);
            },
        });
        return false;
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
                <MapEvents></MapEvents>
                {markers[currentMapIndex].map((marker => (
                        <Marker position={marker.geocode} icon={marker.icon || customIcon} key={marker.geocode} eventHandlers={{
                            click: marker.onClick,
                        }}>
                            {marker.isHoverOnly ? (
                                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                                    {marker.popUp}
                                </Tooltip>
                            ) : (
                                <Popup autoPan={false}>
                                    {marker.popUp}
                                </Popup>
                            )}
                        </Marker>
                )))}
            </MapContainer>
        </div>
    );
}

export default App;