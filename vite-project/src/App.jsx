import { useState } from "react";
import MapView from "./components/MapView";
import HotelList from "./components/HotelList";
import { hotels } from "./data/hotels";
import { useUserLocation } from "./hooks/useUserLocation";

function App() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { location } = useUserLocation();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "0"
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "20px",
        textAlign: "center"
      }}>
        <h1 style={{
          margin: "0 0 8px 0",
          fontSize: "28px",
          color: "#333"
        }}>Hotel Finder Map</h1>
        <p style={{
          margin: "0",
          color: "#666",
          fontSize: "14px"
        }}>Find and navigate to hotels near Murang'a</p>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px"
      }}>
        <MapView selectedHotel={selectedHotel} />
        <HotelList hotels={hotels} onSelectHotel={setSelectedHotel} userLocation={location} />
      </div>
    </div>
  );
}

export default App;
