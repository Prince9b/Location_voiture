import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function UserLocationMap() {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
        setUserPosition({ lat: 12.6392, lng: -8.0029 });
      }
    );
  }, []);

  if (!userPosition) return <div>Chargement de la position...</div>;

  return (
    <MapContainer center={[userPosition.lat, userPosition.lng]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userPosition.lat, userPosition.lng]}>
        <Popup>
          Vous êtes ici.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default UserLocationMap;
