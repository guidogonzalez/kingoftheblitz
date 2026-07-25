import { usePlayer } from "../../context/PlayerContext";
import HistoryCard from "./HistoryCard";

export default function HistoryPanel() {
  const { history, loading } = usePlayer();

  return (
    <section className="history-panel">
      <div className="panel-header">
        <h2>Últimas 10 partidas</h2>
      </div>

      {loading ? (
        <div className="history-empty">Cargando historial...</div>
      ) : history.length === 0 ? (
        <div className="history-empty">
          Todavía no has jugado ninguna partida.
        </div>
      ) : (
        <div className="history-list">
          {history.map((match) => (
            <HistoryCard key={match.match_id} match={match} />
          ))}
        </div>
      )}
    </section>
  );
}
