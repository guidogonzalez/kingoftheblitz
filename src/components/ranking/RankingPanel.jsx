import { useState, useEffect } from "react";

import { usePlayer } from "../../context/PlayerContext";

import RankingRow from "./RankingRow";

export default function RankingPanel() {
  const { ranking, rankingLoading, refreshRanking } = usePlayer();

  const [page, setPage] = useState(1);

  useEffect(() => {
    refreshRanking(page);
  }, [page]);

  return (
    <section className="ranking-panel">
      <div className="panel-header">
        <h2>Ranking</h2>
      </div>

      {rankingLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
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

          <div className="ranking-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ← Anterior
            </button>

            <span>
              Página {page} de {ranking.totalPages}
            </span>

            <button
              disabled={page === ranking.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </section>
  );
}
