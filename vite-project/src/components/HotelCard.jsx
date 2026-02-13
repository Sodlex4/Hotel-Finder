import React, { useEffect, useRef, useState, useMemo } from 'react'
import './HotelCard.css'

export default function HotelCard({ hotel }) {
  const images = useMemo(() => hotel.images || [], [hotel.images])
  const [current, setCurrent] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const intervalRef = useRef(null)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  useEffect(() => {
    // autoplay every 4s; cleaned up when images change or unmount
    if (images.length <= 1) return undefined
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, 4000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [images])

  // manual navigation resets the interval for a fresh 4s
  const handleManualNav = (navFn) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    navFn()
    if (images.length > 1) {
      intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000)
    }
  }

  return (
    <div className="hotel-card">
      <div className="card-media">
        {images.length > 0 ? (
          <div className="carousel">
            <button className="arrow left" aria-label="Previous image" onClick={() => handleManualNav(prev)}>‹</button>

            <img
              src={images[current]}
              alt={`${hotel.name} ${current + 1}`}
              className="carousel-image"
            />

            <button className="arrow right" aria-label="Next image" onClick={() => handleManualNav(next)}>›</button>
          </div>
        ) : (
          <div className="no-image">No image</div>
        )}
      </div>

      <div className="card-body">
        <h3 className="hotel-name">{hotel.name}</h3>
        <div className="hotel-meta">
          <span className="price">${hotel.price}</span>
          <span className="rating">⭐ {hotel.rating}</span>
        </div>

        <div className="amenities">
          {(hotel.amenities || []).slice(0, 5).map((a, i) => (
            <span className="amenity" key={a + i}>{a}</span>
          ))}
        </div>

        <div className="card-actions">
          <button className="details-btn" onClick={() => setIsModalOpen(true)}>View Details</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}>
          <div className="modal-content">
            <button className="modal-close" aria-label="Close modal" onClick={() => setIsModalOpen(false)}>×</button>

            <div className="modal-grid">
              <div className="modal-gallery">
                {(images || []).map((src, idx) => (
                  <div className="modal-image-wrap" key={src + idx}>
                    <img src={src} alt={`${hotel.name} ${idx + 1}`} className="modal-image" />
                  </div>
                ))}
              </div>

              <div className="modal-info">
                <h2>{hotel.name}</h2>
                <p className="modal-price">Price: <strong>${hotel.price}</strong></p>
                <p className="modal-rating">Rating: <strong>⭐ {hotel.rating}</strong></p>
                <p className="modal-phone">📞 <a href={`tel:${hotel.phone}`}>{hotel.phone}</a></p>
                {hotel.email && <p className="modal-email">✉️ <a href={`mailto:${hotel.email}`}>{hotel.email}</a></p>}
                {hotel.checkin && <p className="modal-checkin">Check-in: <strong>{hotel.checkin}</strong></p>}
                {hotel.checkout && <p className="modal-checkout">Check-out: <strong>{hotel.checkout}</strong></p>}

                <div className="modal-amenities">
                  <h4>Amenities</h4>
                  <ul>
                    {(hotel.amenities || []).map((amenity, i) => (
                      <li key={amenity + i}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}