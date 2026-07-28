import { usePlayer } from "../../../context/PlayerContext";
import { useMatch } from "../../../context/MatchContext";
import { decks } from "../../../data/decks";

export default function PlayingPhase() {
  const { player } = usePlayer();
  const { match, finishMatch } = useMatch();

  const amIPlayer1 =
    player.nickname.toLowerCase() === match.player1.nickname.toLowerCase();

  const myDeck = decks.find((deck) => deck.name === match.finalDeck);

  const opponentDeck = decks.find(
    (deck) => deck.name === match.opponentFinalDeck,
  );

  const leftPlayer = amIPlayer1 ? player : match.opponentNickname;
  const rightPlayer = amIPlayer1 ? match.opponentNickname : player;

  const leftDeck = amIPlayer1 ? myDeck : opponentDeck;
  const rightDeck = amIPlayer1 ? opponentDeck : myDeck;

  const myRoll = amIPlayer1 ? match.player1Roll : match.player2Roll;

  const opponentRoll = amIPlayer1 ? match.player2Roll : match.player1Roll;

  const amIFirst =
    match.firstPlayer?.toLowerCase() === player.nickname.toLowerCase();

  const handleWin = () => {
    finishMatch(player.nickname);
  };

  const handleLoss = () => {
    finishMatch(match.opponentNickname);
  };

  return (
    <div className="playing-phase">
      <h2>Partida en curso</h2>

      <div className={`initiative-turn ${amIFirst ? "mine" : ""}`}>
        <div className="initiative-rolls">
          <span>🎲 Tú: {myRoll}</span>
          <span>🎲 Rival: {opponentRoll}</span>
        </div>

        <div className="initiative-result">
          {amIFirst
            ? "Empiezas primero"
            : `${match.firstPlayer} empieza primero`}
        </div>
      </div>

      <div className="playing-layout">
        <div className="playing-column">
          <div className="playing-card">
            <img src={leftDeck.image} alt={leftDeck.name} />
            <h4>{leftDeck.name}</h4>
          </div>
        </div>

        <div className="playing-vs">VS</div>

        <div className="playing-column">
          <div className="playing-card">
            <img src={rightDeck.image} alt={rightDeck.name} />
            <h4>{rightDeck.name}</h4>
          </div>
        </div>
      </div>

      <div className="playing-buttons">
        <button className="btn-win" onClick={handleWin}>
          Victoria
        </button>

        <button className="btn-loss" onClick={handleLoss}>
          Derrota
        </button>
      </div>
    </div>
  );
}
