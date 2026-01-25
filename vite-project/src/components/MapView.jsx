import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useUserLocation } from "../hooks/useUserLocation";
import { hotels } from "../data/hotels";

// Helper component to programmatically change map center
function MapCenter({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 16, { animate: true });
  }
  return null;
}

export default function MapView({ selectedHotel }) {
  const { location, loading, error, usingDefault } = useUserLocation();

  if (loading) return <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>Getting your location...</p>;
  
  if (error && !usingDefault) {
    return <p style={{ textAlign: "center", color: "#d32f2f", marginBottom: "20px" }}>{error}</p>;
  }
  
  if (usingDefault) {
    return (
      <div>
        <p style={{ textAlign: "center", color: "#f57c00", marginBottom: "15px", fontSize: "13px" }}>
          Showing default location
        </p>
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={14}
          style={{ height: "500px", width: "100%", marginBottom: "20px" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selectedHotel && <MapCenter position={[selectedHotel.lat, selectedHotel.lng]} />}

          <Marker position={[location.lat, location.lng]}>
            <Popup>Default Location</Popup>
          </Marker>

          {hotels.map((hotel) => (
            <Marker
              key={hotel.id}
              position={[hotel.lat, hotel.lng]}
              title={hotel.name}
            >
              <Popup>{hotel.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }

  if (!location) return <p style={{ textAlign: "center", marginBottom: "20px" }}>Location not available</p>;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={14}
      style={{ height: "500px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedHotel && <MapCenter position={[selectedHotel.lat, selectedHotel.lng]} />}

      <Marker position={[location.lat, location.lng]}>
        <Popup>Your Location</Popup>
      </Marker>

      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={[hotel.lat, hotel.lng]}
          title={hotel.name}
        >
          <Popup>{hotel.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
