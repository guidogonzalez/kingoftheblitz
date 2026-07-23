import { useMatch } from "../../context/MatchContext";

export default function MatchHeader() {
  const { match } = useMatch();

  return (
    <header className="match-header">

      <div className="match-player">
        <div className="match-player-name">
          {match.player1.nickname}
        </div>

        <div className="match-player-elo">
          {match.player1.elo} ELO
        </div>
      </div>

      <div className="match-vs">
        VS
      </div>

      <div className="match-player">
        <div className="match-player-name">
          {match.player2.nickname}
        </div>

        <div className="match-player-elo">
          {match.player2.elo} ELO
        </div>
      </div>

    </header>
  );
}