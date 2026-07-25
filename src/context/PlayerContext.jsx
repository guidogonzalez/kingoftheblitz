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
  const [ranking, setRanking] = useState({
    players: [],
    totalPages: 1,
  });

  const [rankingLoading, setRankingLoading] = useState(false);

  const refreshRanking = async () => {
    setRankingLoading(true);

    try {
      const { data, error } = await matchService.getRanking();

      if (!error && data) {
        setRanking({
          players: data.players,
          totalPages: data.total_pages,
        });
      }
    } finally {
      setRankingLoading(false);
    }
  };

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
    await Promise.all([
      refreshProfile(nickname),
      refreshHistory(nickname),
      refreshRanking(),
    ]);
  };

  async function refreshHistory(nickname) {
    setLoading(true);

    const { data, error } = await matchService.getMatchHistory(nickname);


    if (!error) {
      setHistory(data);
    }

    setLoading(false);
  }

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
        history,
        loading,
        login,
        logout,
        refreshProfile,
        refreshHistory,
        refreshPlayer,
        ranking,
        rankingLoading,
        refreshRanking,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
