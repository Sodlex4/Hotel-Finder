import HotelCard from "./HotelCard";
import { useMemo, useState } from "react";

export default function HotelList({ hotels, onSelectHotel, userLocation }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    price: false,
    reviews: false,
    rating: false,
    wifi: false,
  });

  const toggleFilter = (key) => {
    setFilters((f) => ({ ...f, [key]: !f[key] }));
  };

  const clearFilters = () => {
    setFilters({ price: false, reviews: false, rating: false, wifi: false });
    setQuery("");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hotels.filter((h) => {
      if (q && !h.name.toLowerCase().includes(q)) return false;

      // price filter: keep hotels with numeric price <= 6000
      if (filters.price) {
        const num = parseInt((h.price || "").replace(/[^0-9]/g, ""), 10) || Infinity;
        if (num > 6000) return false;
      }

      // reviews filter: minimum 200 reviews
      if (filters.reviews) {
        if ((h.reviews || 0) < 200) return false;
      }

      // rating filter: minimum 4.1
      if (filters.rating) {
        if ((h.rating || 0) < 4.1) return false;
      }

      // wifi amenity filter
      if (filters.wifi) {
        if (!h.amenities || !h.amenities.includes("Free Wi-Fi")) return false;
      }

      return true;
    });
  }, [hotels, query, filters]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2 style={{ fontSize: "18px", color: "#333", margin: 0 }}>Available Hotels</h2>
        <div style={{ fontSize: "13px", color: "#666" }}>{filtered.length} results</div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center", flexDirection: "column" }}>
        <div style={{ display: "flex", width: "100%", gap: "8px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hotels by name..."
            style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
          />

          <button onClick={clearFilters} style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #e0e0e0", background: "#fff" }}>Clear</button>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "8px", width: "100%", alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => toggleFilter("price")}
          style={{ padding: "6px 10px", borderRadius: 20, border: "1px solid #ddd", background: filters.price ? "#1976D2" : "#fff", color: filters.price ? "#fff" : "#333" }}
        >
          Price ≤ 6k
        </button>

        <button
          onClick={() => toggleFilter("reviews")}
          style={{ padding: "6px 10px", borderRadius: 20, border: "1px solid #ddd", background: filters.reviews ? "#1976D2" : "#fff", color: filters.reviews ? "#fff" : "#333" }}
        >
          Reviews ≥ 200
        </button>

        <button
          onClick={() => toggleFilter("rating")}
          style={{ padding: "6px 10px", borderRadius: 20, border: "1px solid #ddd", background: filters.rating ? "#1976D2" : "#fff", color: filters.rating ? "#fff" : "#333" }}
        >
          Rating ≥ 4.1
        </button>

        <button
          onClick={() => toggleFilter("wifi")}
          style={{ padding: "6px 10px", borderRadius: 20, border: "1px solid #ddd", background: filters.wifi ? "#1976D2" : "#fff", color: filters.wifi ? "#fff" : "#333" }}
        >
          Free Wi‑Fi
        </button>
      </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "#666" }}>Suggestions:</div>
          {hotels.slice(0, 3).map((s) => (
            <button
              key={s.id}
              onClick={() => setQuery(s.name)}
              style={{ padding: "6px 10px", borderRadius: 16, border: "1px solid #eee", background: "#fff" }}
            >
              {s.name}
            </button>
          ))}
        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px",
          width: "100%"
        }}
      >
        {filtered.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onClick={() => onSelectHotel(hotel)}
            userLocation={userLocation}
          />
        ))}
      </div>
    </div>
  );
}
