import MatchHeader from "./MatchHeader";
import DeckSelection from "./phases/DeckSelection";
import ReadyPhase from "./phases/ReadyPhase";
import BanPhase from "./phases/BanPhase";
import PlayingPhase from "./phases/PlayingPhase";
import ResultPhase from "./phases/ResultPhase";

import { useMatch } from "../../context/MatchContext";

export default function MatchPanel() {
  const { match } = useMatch();

  return (
    <section className="panel">
      <MatchHeader match={match} />

      {match.phase === "deck_selection" && <DeckSelection match={match} />}

      {match.phase === "ban_phase" && <BanPhase match={match} />}

      {match.phase === "playing" && <PlayingPhase match={match} />}

      {match.phase === "result" && <ResultPhase match={match} />}
    </section>
  );
}
