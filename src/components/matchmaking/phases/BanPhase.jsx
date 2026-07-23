import { useEffect } from "react";
import { useMatch } from "../../../context/MatchContext";
import { usePlayer } from "../../../context/PlayerContext";
import BanDeckCard from "./BanDeckCard";
import { decks } from "../../../data/decks";

export default function BanPhase() {
  const { player } = usePlayer();
  const { match, banDeck, selectFinalDeck } = useMatch();

  const amIPlayer1 =
    player.nickname.toLowerCase() === match.player1.nickname.toLowerCase();

  const leftIsOpponent = !amIPlayer1;
  const rightIsOpponent = amIPlayer1;

  const canBan =
    (amIPlayer1 && (match.banTurn === 1 || match.banTurn === 3)) ||
    (!amIPlayer1 && (match.banTurn === 2 || match.banTurn === 4));

  useEffect(() => {
    if (!match) return;

    const myAvailable = match.selectedDecks.me.filter(
      (deck) => !match.myBan.includes(deck.name)
    );

    if (myAvailable.length !== 1) return;

    if (match.finalDeck) return;

    selectFinalDeck(myAvailable[0].name);
  }, [match, selectFinalDeck]);

  const leftDecks = amIPlayer1
    ? match.selectedDecks.me
    : match.selectedDecks.opponent;

  const rightDecks = amIPlayer1
    ? match.selectedDecks.opponent
    : match.selectedDecks.me;

  const leftDecksWithImages = leftDecks.map((deck) => {
    const deckInfo = decks.find((d) => d.name === deck.name);

    return {
      ...deck,
      image: deckInfo?.image ?? "",
    };
  });

  const rightDecksWithImages = rightDecks.map((deck) => {
    const deckInfo = decks.find((d) => d.name === deck.name);

    return {
      ...deck,
      image: deckInfo?.image ?? "",
    };
  });

  const leftBans = amIPlayer1 ? match.myBan : match.opponentBan;
  const rightBans = amIPlayer1 ? match.opponentBan : match.myBan;

  return (
    <div className="ban-phase">
      <h2>Fase de Baneos</h2>

      <div className="ban-layout">
        <div className="ban-column">
          {leftDecksWithImages.map((deck) => (
            <BanDeckCard
              key={deck.name}
              deck={deck}
              canBan={leftIsOpponent && canBan}
              banned={leftBans.includes(deck.name)}
              onBan={banDeck}
            />
          ))}
        </div>

        <div className="ban-vs">VS</div>

        <div className="ban-column">
          {rightDecksWithImages.map((deck) => (
            <BanDeckCard
              key={deck.name}
              deck={deck}
              canBan={rightIsOpponent && canBan}
              banned={rightBans.includes(deck.name)}
              onBan={banDeck}
            />
          ))}
        </div>
      </div>
    </div>
  );
}