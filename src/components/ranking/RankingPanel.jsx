import { useEffect } from "react";

import { usePlayer } from "../../context/PlayerContext";

import RankingRow from "./RankingRow";

export default function RankingPanel() {
  const { ranking, rankingLoading, refreshRanking } = usePlayer();

  useEffect(() => {
    refreshRanking();
  }, []);

  return (
    <section className="ranking-panel">
      <div className="panel-header">
        <h2>Top 20 Ranking</h2>
      </div>

      {rankingLoading ? (
        <div>Cargando...</div>
      ) : (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>ELO</th>
              <th>W/L</th>
              <th>WR</th>
            </tr>
          </thead>

          <tbody>
            {ranking.players.map((player) => (
              <RankingRow key={player.nickname} player={player} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}