// Image storage for cabins and avatars.
//
// Neon has no file storage (unlike Supabase), so uploads go to Cloudinary via
// an *unsigned* upload preset — the browser POSTs the file directly and gets
// back a hosted URL, which we store in the Postgres `image`/`avatar` column.
//
// Create the preset in: Cloudinary > Settings > Upload > Add upload preset
// (Signing Mode: Unsigned), then set these in .env.
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload an image File to Cloudinary and return its hosted https URL.
 * @param {File} file
 * @returns {Promise<string>} secure_url of the uploaded image
 */
export async function uploadImage(file) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    console.error(detail);
    throw new Error("Image could not be uploaded to Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
}
