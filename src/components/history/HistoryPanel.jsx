import { useEffect, useState } from "react";

import { usePlayer } from "../../context/PlayerContext";

import matchService from "../../services/matchService";

import HistoryCard from "./HistoryCard";

export default function HistoryPanel() {
  const { player } = usePlayer();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!player?.nickname) return;

    loadHistory();
  }, [player?.nickname]);

  async function loadHistory() {
    setLoading(true);

    try {
      const result = await matchService.getMatchHistory(player.nickname);

      setMatches(result.data ?? []);
    } catch (error) {
      console.error(error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="history-panel">

      <div className="panel-header">
        <h2>Historial de partidas</h2>
      </div>

      {loading ? (
        <div className="history-empty">
          Cargando historial...
        </div>
      ) : matches.length === 0 ? (
        <div className="history-empty">
          Todavía no has jugado ninguna partida.
        </div>
      ) : (
        <div className="history-list">
          {matches.map((match) => (
            <HistoryCard
              key={match.match_id}
              match={match}
            />
          ))}
        </div>
      )}

    </section>
  );
}