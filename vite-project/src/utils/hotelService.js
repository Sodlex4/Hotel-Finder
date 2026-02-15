import { supabase } from "./supabaseClient";

/**
 * Convert an ArrayBuffer to a Base64 string (chunked to avoid stack limits)
 */
const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const fileToBase64 = async (file) => {
  const buffer = await file.arrayBuffer();
  const base64 = arrayBufferToBase64(buffer);
  return base64;
};

/**
 * Fetch all hotels from Supabase
 * Images are stored in the `images` jsonb column as objects: { filename, mime, data (base64), uploaded_at }
 */
export const fetchHotels = async () => {
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select(
        "id, name, description, rating, price, amenities, latitude, longitude, images"
      );

    if (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }

    // Convert stored base64 images into data URIs for direct use in <img>
    const hotelsWithImages = data.map((hotel) => ({
      ...hotel,
      images: (hotel.images || []).map((img) => {
        if (img && img.data && img.mime) {
          return `data:${img.mime};base64,${img.data}`;
        }
        return null;
      }).filter(Boolean),
    }));

    return hotelsWithImages;
  } catch (error) {
    console.error("Failed to fetch hotels:", error);
    return [];
  }
};

/**
 * Fetch a single hotel by ID
 */
export const fetchHotelById = async (hotelId) => {
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select(
        "id, name, description, rating, price, amenities, latitude, longitude, images"
      )
      .eq("id", hotelId)
      .single();

    if (error) {
      console.error("Error fetching hotel:", error);
      throw error;
    }

    const hotelWithImages = {
      ...data,
      images: (data.images || []).map((img) => {
        if (img && img.data && img.mime) {
          return `data:${img.mime};base64,${img.data}`;
        }
        return null;
      }).filter(Boolean),
    };

    return hotelWithImages;
  } catch (error) {
    console.error("Failed to fetch hotel:", error);
    return null;
  }
};

/**
 * Create a new hotel record. Optionally accepts File[] images which will be stored inline (base64) in the images column.
 * @param {Object} hotel - hotel fields (name, description, rating, price, amenities, latitude, longitude)
 * @param {File[]} [files] - optional images to attach to the hotel
 */
export const createHotel = async (hotel, files = []) => {
  try {
    const images = [];
    for (const file of files) {
      const data = await fileToBase64(file);
      images.push({ filename: file.name, mime: file.type || "application/octet-stream", data, uploaded_at: new Date().toISOString() });
    }

    const payload = { ...hotel, images };
    const { data: inserted, error } = await supabase.from("hotels").insert(payload).select().single();
    if (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
    return inserted;
  } catch (error) {
    console.error("Failed to create hotel:", error);
    return null;
  }
};

/**
 * Add a single image to an existing hotel record (stores image base64 inside the hotel's images JSONB array)
 * @param {string} hotelId
 * @param {File} file
 */
export const addImageToHotel = async (hotelId, file) => {
  try {
    const base64 = await fileToBase64(file);
    const imageObj = { filename: file.name, mime: file.type || "application/octet-stream", data: base64, uploaded_at: new Date().toISOString() };

    // fetch existing images
    const { data: existing, error: fetchErr } = await supabase.from("hotels").select("images").eq("id", hotelId).single();
    if (fetchErr) {
      console.error("Error fetching existing images:", fetchErr);
      throw fetchErr;
    }

    const images = Array.isArray(existing.images) ? existing.images.concat(imageObj) : [imageObj];

    const { data, error } = await supabase.from("hotels").update({ images }).eq("id", hotelId).select().single();
    if (error) {
      console.error("Error updating hotel images:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Failed to add image to hotel:", error);
    return null;
  }
};

/**
 * Utility: convert stored image object to a data URI
 */
export const imageObjToDataUri = (img) => {
  if (!img || !img.data || !img.mime) return null;
  return `data:${img.mime};base64,${img.data}`;
};

