export default function HotelCard({ hotel, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(25, 118, 210, 0.08)",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 14px 30px rgba(25, 118, 210, 0.12)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(25, 118, 210, 0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ width: "100%", height: "160px", overflow: "hidden" }}>
        <img
          src={hotel.image}
          alt={hotel.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ padding: "14px 14px 16px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <h3 style={{ margin: 0, color: "#222", fontSize: "16px", fontWeight: 700 }}>{hotel.name}</h3>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", color: "#FF9800", fontWeight: 700 }}>{hotel.rating}</div>
            <div style={{ fontSize: "11px", color: "#777" }}>{hotel.reviews} reviews</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#1976D2", fontWeight: 700 }}>{hotel.price}</div>
          <div style={{ fontSize: "12px", color: "#888" }}>{hotel.distance}</div>
        </div>

        <div style={{ fontSize: "12px", color: "#555" }}>Lat: {hotel.lat}, Lng: {hotel.lng}</div>

        <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.35 }}>{hotel.description}</p>

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "6px" }}>
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "11px",
                backgroundColor: "#eef6ff",
                color: "#1976D2",
                padding: "6px 8px",
                borderRadius: "14px",
              }}
            >
              {amenity}
            </span>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${hotel.lat},${hotel.lng}`,
              "_blank"
            );
          }}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 700,
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#165fbd")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976D2")}
        >
          Get Directions
        </button>
      </div>
    </div>
  );
}
