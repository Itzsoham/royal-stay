import { neon } from "./neon";
import supabase from "./supabase";
import { uploadImage } from "./cloudinary";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avtar: "" },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  if (password) {
    throw new Error("Password updates are disabled for this demo");
  }

  const image = avatar ? await uploadImage(avatar) : undefined;

  const { data, error } = await neon.auth.updateUser({
    name: fullName,
    ...(image ? { image } : {}),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
