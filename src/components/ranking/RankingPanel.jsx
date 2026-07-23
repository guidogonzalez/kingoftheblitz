import { useEffect, useState } from "react";

import matchService from "../../services/matchService";

import RankingRow from "./RankingRow";

export default function RankingPanel() {
  const [players, setPlayers] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking(page);
  }, [page]);

  async function loadRanking(pageNumber) {
    setLoading(true);

    const { data, error } = await matchService.getRanking(pageNumber);

    if (!error && data) {
      setPlayers(data.players);

      setTotalPages(data.total_pages);
    }

    setLoading(false);
  }

  return (
    <section className="ranking-panel">
      <h2>Ranking</h2>

      {loading ? (
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
              {players.map((player) => (
                <RankingRow key={player.nickname} player={player} />
              ))}
            </tbody>
          </table>

          <div className="ranking-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ← Anterior
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              disabled={page === totalPages}
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
