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
    lat: 51.4,
    lng: 0,
};
// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         center = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//         };
//         //console.log("Latitude is :", );
//         //console.log("Longitude is :", );
//     });
//     console.log("Available");
// } else {
//     //console.log("Not Available");
// }

let markerpositions = [];

if (AppContext.location === undefined) {
    markerpositions = [
        {
            lat: center.lat + 0.01,
            lng: center.lng - 0.01,
        },
        {
            lat: center.lat + 0.01,
            lng: center.lng + 0.01,
        },
        {
            lat: center.lat - 0.01,
            lng: center.lng + 0.01,
        },
        {
            lat: center.lat - 0.01,
            lng: center.lng - 0.01,
        },
    ];
}

if (AppContext.location !== undefined) {
    markerpositions = AppContext.location;
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

function MapPolygon() {
    const [markerPositions, changeMarkerPositions] = useState(markerpositions);

    const [mapCenter, changeCenter] = useState(center);

    const AppContextMap = useContext(AppContext);
    // console.log(AppContextMap);
    useEffect(() => {
        AppContextMap.location = markerPositions;
        // console.log(markerPositions);
    });

    return (
        <div className="leaflet-container">
            <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
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
