import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDefault, setUsingDefault] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const defaultLocation = { lat: -0.7167, lng: 37.1500 }; // Murang'a Town Center

    if (!navigator.geolocation) {
      if (isMounted) {
        setTimeout(() => {
          if (isMounted) { 
            setError("Geolocation not supported.");
            setLocation(defaultLocation);
            setUsingDefault(true);
            setLoading(false);
          }
        }, 0);
      }
      return;
    }

    timeoutId = setTimeout(() => {
      if (isMounted) {
        setLocation(defaultLocation);
        setUsingDefault(true);
        setLoading(false);
      }
    }, 10000); // 10s timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        if (isMounted) {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        }
      },
      (error) => {
        clearTimeout(timeoutId);
        if (isMounted) {
          console.warn("Geolocation error code:", error.code);
          setLocation(defaultLocation);
          setUsingDefault(true);
          setError("Location access denied.");
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return { location, loading, error, usingDefault };
}
