import supabase, { supabaseUrl } from "./supabase";

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
  // 1 - Update user fullName or password
  let updataData = {};
  if (password) updataData = { password };
  if (fullName) updataData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updataData);

  if (error) {
    throw new Error(error.message);
  }

  // 2 - Upload avatar image
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  //3 - Update avatar URL in User
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}
