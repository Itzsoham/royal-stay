import { neon } from "./neon";
import { uploadImage } from "./cloudinary";

export async function getCabins() {
  const { data, error } = await neon.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Tolerate being handed either the cabin id (number) or a whole cabin object —
  // otherwise `.eq("id", obj)` serializes to "[object Object]" and Postgres
  // rejects it as an invalid bigint.
  const cabinId = id && typeof id === "object" ? id.id : id;

  // When editing without changing the picture, newCabin.image is already a
  // hosted URL (string). When creating or replacing it, it's a File to upload.
  const imagePath =
    typeof newCabin.image === "string"
      ? newCabin.image
      : await uploadImage(newCabin.image);

  let query = neon.from("cabins");

  // create the cabin
  if (!cabinId) query = query.insert([{ ...newCabin, image: imagePath }]);

  // update the cabin
  if (cabinId)
    query = query.update({ ...newCabin, image: imagePath }).eq("id", cabinId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await neon.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't deleted");
  }
}
