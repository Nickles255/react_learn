import {useNavigate, useSearchParams} from "react-router-dom";
import styles from './Map.module.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import FlagImg from "./FlagImg.jsx";
import Button from "./Button.jsx";
import {useGeolocation} from "../hooks/useGeoLocation.js";
import {useURLPosition} from "../hooks/useURLPosition.js";

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            // console.log(e);
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });

}

function UpdateCenter({center}) {
    const map = useMap();

    useEffect(() => {
        if (!center) return;
        map.setView(center);
    }, [map, center])

    return null;
}

export default function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [searchParams] = useSearchParams();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition
    } = useGeolocation();

    const [mapLat, mapLng] = useURLPosition();

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geoLocationPosition) {
            setMapPosition([
                geoLocationPosition.lat,
                geoLocationPosition.lng
            ]);
        }
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition &&
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use my location"}
                </Button>
            }
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span><FlagImg emoji={city.emoji}/></span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <UpdateCenter center={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
}