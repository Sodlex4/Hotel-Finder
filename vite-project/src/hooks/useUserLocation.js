import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDefault, setUsingDefault] = useState(false);

  useEffect(() => {
    let mounted = true;
    const defaultLocation = { lat: -0.7167, lng: 37.1500 }; // Murang'a Town Center

    const setFallback = (msg) => {
      if (!mounted) return;
      setLocation(defaultLocation);
      setUsingDefault(true);
      setError(msg || null);
      setLoading(false);
    };

    if (!navigator || !navigator.geolocation) {
      setFallback("Geolocation is not supported by this browser.");
      return () => (mounted = false);
    }

    // Helper to actually request position
    const requestPosition = () => {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!mounted) return;
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setUsingDefault(false);
          setError(null);
          setLoading(false);
        },
        (err) => {
          if (!mounted) return;
          console.warn("Geolocation error:", err);
          if (err.code === err.PERMISSION_DENIED) {
            setFallback("Location permission denied. Please enable location for this site in your browser settings.");
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            setFallback("Location information is unavailable.");
          } else if (err.code === err.TIMEOUT) {
            setFallback("Timed out while retrieving location.");
          } else {
            setFallback("Unable to retrieve location.");
          }
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );
    };

    // Use Permissions API if available to check status and give better UX.
    let permStatus;
    const tryPermissions = async () => {
      if (!navigator.permissions || !navigator.permissions.query) {
        // Permissions API not available — just request position (this should trigger prompt)
        requestPosition();
        return;
      }

      try {
        permStatus = await navigator.permissions.query({ name: "geolocation" });

        if (!mounted) return;

        if (permStatus.state === "granted") {
          // Already allowed
          requestPosition();
        } else if (permStatus.state === "prompt") {
          // Will prompt the user — request position now to trigger the browser prompt
          requestPosition();
        } else if (permStatus.state === "denied") {
          // User has previously denied — show fallback and instructions
          setFallback("Location access has been denied. Please allow location access in your browser settings to see nearby results.");
        }

        // Listen for permission changes in case user updates settings while on the page
        permStatus.onchange = () => {
          if (!mounted) return;
          if (permStatus.state === "granted") {
            requestPosition();
          } else if (permStatus.state === "denied") {
            setFallback("Location access denied.");
          }
        };
      } catch {
        // If Permissions API throws, fall back to direct request which should prompt
        requestPosition();
      }
    };

    tryPermissions();

    return () => {
      mounted = false;
      if (permStatus && permStatus.onchange) permStatus.onchange = null;
    };
  }, []);

  return { location, loading, error, usingDefault };
}
