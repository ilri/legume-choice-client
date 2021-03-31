import React, {
    useState,
    useCallback,
    useRef,
    useMemo,
    useEffect,
    useContext,
    createContext,
} from "react";

import _ from "lodash";
import "./map-polygon-component.css";

import AppContext from "../../AppContext";

import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";

// Defining an initial center to focus the map
let center = {
    lat: 5.26,
    lng: 22.7,
};

let markerpositions = [];

// Setting an initial location for all of the marker points.
if (AppContext.currentProject === undefined) {
    AppContext.currentProject = {};
}
if (AppContext.currentProject.location === undefined) {
    markerpositions = [
        {
            lat: center.lat + 10,
            lng: center.lng - 10,
        },
        {
            lat: center.lat + 10,
            lng: center.lng + 10,
        },
        {
            lat: center.lat - 10,
            lng: center.lng + 10,
        },
        {
            lat: center.lat - 10,
            lng: center.lng - 10,
        },
    ];
}

// Checking if previous location can be found in context. If so, setting the initial arker positions to the location defined in state
if (AppContext.currentProject.location !== undefined) {
    markerpositions = AppContext.currentProject.location;
}

// This is based on the example "draggable marker" found on the react-leaflet documentation: https://react-leaflet.js.org/docs/example-draggable-marker/
// This produces a single draggable marker, with a state that can be updated on dragging.
function DraggableMarker(props) {
    const markerRef = useRef(null);

    const updateMarker = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;

                if (marker != null) {
                    let newArray = _.clone(props.center);
                    let newLat = marker.getLatLng().lat;
                    let newLng = marker.getLatLng().lng;
                    newArray[props.index].lat = newLat;
                    newArray[props.index].lng = newLng;
                    props.changeMarkerPositions(newArray);

                    //console.log(marker.getLatLng().lat);
                }
            },
        }),
        []
    );

    return (
        <>
            <Marker
                draggable={true}
                eventHandlers={updateMarker}
                position={props.center[props.index]}
                ref={markerRef}
            ></Marker>
        </>
    );
}

//Props includes the positions of all of the markers. The polygon shape is determined by the positions
// of each of these markers
function DraggablePolygon(props) {
    return (
        <Polygon
            pathOptions={{ color: "purple" }}
            positions={props.positions}
        />
    );
}

function MapPolygon(location) {
    const [markerPositions, changeMarkerPositions] = useState(markerpositions);

    const [mapCenter, changeCenter] = useState(center);

    const AppContextMap = useContext(AppContext);

    console.log(AppContextMap.currentProject);

    // This effect runs only once, when the component loads
    useEffect(() => {
        if (AppContextMap.currentProject.location !== undefined) {
            changeMarkerPositions(AppContextMap.currentProject.location);
        }
    }, []);

    // This effect runs any time state changes in the application
    useEffect(() => {
        AppContextMap.currentProject.location = markerPositions;
        // console.log(markerPositions);
    });

    return (
        <div className="leaflet-container">
            {/*The example map container given by react-leaflet */}
            <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Redering the polygon, followed by each of the four markers */}
                <DraggablePolygon positions={markerPositions} />

                <DraggableMarker
                    center={markerPositions}
                    index={0}
                    changeMarkerPositions={changeMarkerPositions}
                />
                <DraggableMarker
                    center={markerPositions}
                    index={1}
                    changeMarkerPositions={changeMarkerPositions}
                />
                <DraggableMarker
                    center={markerPositions}
                    index={2}
                    changeMarkerPositions={changeMarkerPositions}
                />
                <DraggableMarker
                    center={markerPositions}
                    index={3}
                    changeMarkerPositions={changeMarkerPositions}
                />
            </MapContainer>
        </div>
    );
}

export default MapPolygon;
