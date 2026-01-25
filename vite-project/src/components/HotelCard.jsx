export default function HotelCard({ hotel, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <img
        src={hotel.image}
        alt={hotel.name}
        style={{ width: "100%", height: "140px", objectFit: "cover" }}
      />
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 6px 0", color: "#333", fontSize: "15px", fontWeight: "600" }}>
          {hotel.name}
        </h3>
        
        <div style={{ marginBottom: "6px", fontSize: "13px", color: "#FF9800" }}>
          {hotel.rating} ({hotel.reviews} reviews)
        </div>

        <div style={{ marginBottom: "6px", fontSize: "13px", fontWeight: "600", color: "#2196F3" }}>
          {hotel.price}
        </div>

        <div style={{ marginBottom: "6px", fontSize: "12px", color: "#888" }}>
          {hotel.distance}
        </div>

        <p style={{ marginBottom: "8px", fontSize: "11px", color: "#666", lineHeight: "1.4", margin: "8px 0" }}>
          {hotel.description}
        </p>

        <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "10px",
                backgroundColor: "#E3F2FD",
                color: "#1976D2",
                padding: "3px 6px",
                borderRadius: "3px",
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
            width: "100%",
            padding: "8px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1976D2")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2196F3")}
        >
          Get Directions
        </button>
      </div>
    </div>
  );
}
