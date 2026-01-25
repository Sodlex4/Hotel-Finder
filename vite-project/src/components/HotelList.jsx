import HotelCard from "./HotelCard";

export default function HotelList({ hotels, onSelectHotel }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{
        fontSize: "18px",
        color: "#333",
        marginBottom: "15px",
        textAlign: "left"
      }}>Available Hotels</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          width: "100%"
        }}
      >
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onClick={() => onSelectHotel(hotel)}
          />
        ))}
      </div>
    </div>
  );
}
