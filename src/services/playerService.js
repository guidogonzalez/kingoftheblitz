import { supabase } from "./supabase";

export async function connectPlayer(nickname, password) {
  const { data, error } = await supabase.rpc("connect_player", {
    p_nickname: nickname,
    p_password: password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function getPlayerProfile(nickname) {
  const { data, error } = await supabase.rpc("get_player_profile", {
    p_nickname: nickname,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function refreshPlayerProfile(nickname) {
  return await getPlayerProfile(nickname);
}

export async function joinQueue(nickname) {
  const { data, error } = await supabase.rpc("join_queue", {
    p_nickname: nickname,
  });

  if (error) throw error;

  return data;
}

export async function leaveQueue(nickname) {
  const { data, error } = await supabase.rpc("leave_queue", {
    p_nickname: nickname,
  });

  if (error) throw error;

  return data;
}
