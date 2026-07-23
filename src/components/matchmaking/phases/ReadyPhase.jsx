import { useEffect } from "react";
import { useMatch } from "../../../context/MatchContext";

export default function ReadyPhase() {
  const { match, readyUp } = useMatch();

  useEffect(() => {
    if (match.meReady && match.opponentReady) {
      setMatch({
        ...match,
        phase: "ban",
      });
    }
  }, [match.meReady, match.opponentReady]);

  return (
    <div className="ready-phase">
      <h2>Ready Check</h2>

      <div className="deck-status">
        <div>
          Tú:
          {match.meReady ? " ✅ Ready" : " ⏳ Esperando"}
        </div>

        <div>
          Rival:
          {match.opponentReady ? " ✅ Ready" : " ⏳ Esperando"}
        </div>
      </div>

      <button disabled={match.meReady} onClick={() => readyUp()}>
        READY
      </button>
    </div>
  );
}
