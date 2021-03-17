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

let center = {
    lat: 5.26,
    lng: 22.7,
};

let markerpositions = [];

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

if (AppContext.currentProject.location !== undefined) {
    markerpositions = AppContext.currentProject.location;
}

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
    useEffect(() => {
        if (AppContextMap.currentProject.location !== undefined) {
            changeMarkerPositions(AppContextMap.currentProject.location);
        }
    }, []);

    useEffect(() => {
        AppContextMap.currentProject.location = markerPositions;
        // console.log(markerPositions);
    });

    return (
        <div className="leaflet-container">
            <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

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
