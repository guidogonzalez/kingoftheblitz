const STORAGE_KEY = "kotb-player";
import { createContext, useContext, useState, useEffect } from "react";
import { connectPlayer } from "../services/playerService";
import { refreshPlayerProfile } from "../services/playerService";
import matchService from "../services/matchService";
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

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

        await refreshPlayer(savedPlayer.nickname);
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

  const refreshPlayer = async (nickname = player?.nickname) => {
    await Promise.all([refreshProfile(nickname), refreshHistory(nickname)]);
  };

  const refreshHistory = async (nickname = player?.nickname) => {
    if (!nickname) return [];

    const result = await matchService.getMatchHistory(nickname);

    const matches = result.data ?? [];

    setHistory(matches);

    return matches;
  };

  async function login(nickname, password) {
    setLoading(true);

    try {
      const data = await connectPlayer(nickname, password);

      if (!data.found) {
        return {
          success: false,
          message: data.message,
        };
      }

      setPlayer(data);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      await refreshPlayer(data.nickname);

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
        refreshHistory,
        refreshPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
