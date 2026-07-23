import { useMemo } from "react";

import decks from "../../data/decks";

export default function HistoryCard({ match }) {
  const {
    opponent,
    my_deck,
    opponent_deck,
    result,
    elo_change,
    new_elo,
    finished_at,
  } = match;

  console.log(match);

  const myDeck = useMemo(
    () => decks.find((d) => d.name === my_deck),
    [my_deck],
  );

  const opponentDeck = useMemo(
    () => decks.find((d) => d.name === opponent_deck),
    [opponent_deck],
  );

  const myBans = useMemo(
    () =>
      (match.my_bans ?? [])
        .map((name) => decks.find((d) => d.name === name))
        .filter(Boolean),
    [match.my_bans],
  );

  const opponentBans = useMemo(
    () =>
      (match.opponent_bans ?? [])
        .map((name) => decks.find((d) => d.name === name))
        .filter(Boolean),
    [match.opponent_bans],
  );

  const oldElo = new_elo - elo_change;

  const formattedDate = new Date(finished_at).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const win = result === "win";

  return (
    <article className={`history-card ${win ? "win" : "loss"}`}>
      <div className="history-card-header">
        <div>
          <h3>{win ? "🏆 Victoria" : "❌ Derrota"}</h3>
          <span>vs {opponent}</span>
        </div>

        <div className={`elo-change ${win ? "positive" : "negative"}`}>
          {win ? "+" : ""}
          {elo_change} ELO
        </div>
      </div>

      <div className="history-card-decks">
        <div className="deck-side">
          <div className="deck-row">
            {myBans.map((deck) => (
              <div className="mini-deck" key={deck.name}>
                <img src={deck.image} alt={deck.name} />
                <span>{deck.name}</span>
              </div>
            ))}

            <div className="main-deck">
              <img src={myDeck?.image} alt={my_deck} />
              <span>{my_deck}</span>
            </div>
          </div>
        </div>

        <div className="vs">VS</div>

        <div className="deck-side">
          <div className="deck-row">
            <div className="main-deck">
              <img src={opponentDeck?.image} alt={opponent_deck} />
              <span>{opponent_deck}</span>
            </div>

            {opponentBans.map((deck) => (
              <div className="mini-deck" key={deck.name}>
                <img src={deck.image} alt={deck.name} />
                <span>{deck.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="history-card-footer">
        <span>
          ELO: {oldElo} → {new_elo}
        </span>

        <span>{formattedDate}</span>
      </div>
    </article>
  );
}
