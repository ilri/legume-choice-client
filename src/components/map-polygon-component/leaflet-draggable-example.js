import React, {
    useState,
    useCallback,
    useRef,
    useMemo,
    useEffect,
} from "react";

import "./map-polygon-component.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import {Button} from "react-bootstrap"

const center = {
    lat: 51.505,
    lng: -0.09,
};



const markerpositions = [
    {
        lat: center.lat + 0.01,
        lng: center.lon - 0.01,
    },
    {
        lat: center.lat + 0.01,
        lng: center.lon + 0.01,
    },
    {
        lat: center.lat - 0.01,
        lng: center.lon + 0.01,
    },
    {
        lat: center.lat - 0.01,
        lng: center.lon - 0.01,
    },
];

function DraggableMarker(props) {
  console.log(props)
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(props.center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
    }, []);

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup minWidth={90}>
                <Button  onClick={toggleDraggable}>
                    {draggable
                        ? "Marker is draggable. Click here to make undraggable"
                        : "Marker is  not draggable. Click here to make marker draggable"}
                </Button>
            </Popup>
        </Marker>
    );
}

render(
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <DraggableMarker props={center:markerpositions[0]} />
        {/* <DraggableMarker props={center:markerpositions[1]} />
        <DraggableMarker props={center:markerpositions[2]} />
        <DraggableMarker props={center:markerpositions[3]} /> */}
    </MapContainer>
);
