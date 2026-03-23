import { supabase } from "./supabaseClient";
import { uidToEmail } from "../utils/uidToEmail";

// 🟢 Signup
export const signUpUser = async (uid, password) => {
  const email = uidToEmail(uid);

  // 1️⃣ Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

    // 2️⃣ Insert into public.users table
    const { error: insertError } = await supabase
        .from("users")
        .insert([
        {
            id: user.id,   // MUST match auth.users.id
            uid: uid,
            email: email,
            role: "buyer",
            seller_status: "none",
        },
        ]);

  if (insertError) throw insertError;

  return user;
};

// 🔵 Login
export const loginUser = async (uid, password) => {
  const email = uidToEmail(uid);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
};