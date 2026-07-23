const STORAGE_KEY = "kotb-player";
import { createContext, useContext, useState, useEffect } from "react";
import { connectPlayer } from "../services/playerService";
import { refreshPlayerProfile } from "../services/playerService";
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        return;
      }

      try {
        setLoading(true);

        const savedPlayer = JSON.parse(stored);

        setPlayer(savedPlayer);

        const profileData = await refreshPlayerProfile(savedPlayer.nickname);

        setProfile(profileData);
      } catch (error) {
        console.error(error);

        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const refreshProfile = async (nickname = player?.nickname) => {
    if (!nickname) return;

    const data = await refreshPlayerProfile(nickname);

    setProfile(data);

    return data;
  };

  async function login(nickname, password) {
    setLoading(true);

    try {
      const data = await connectPlayer(nickname, password);

      console.log(data);
      if (!data.found) {
        return {
          success: false,
          message: data.message,
        };
      }

      const profileData = await refreshPlayerProfile(data.nickname);

      setPlayer(data);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      setProfile(profileData);

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: "Ha ocurrido un error inesperado.",
      };
      
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPlayer(null);
    setProfile(null);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        profile,
        loading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
