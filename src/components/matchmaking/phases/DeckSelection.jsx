import { useEffect, useState } from "react";
import { useMatch } from "../../../context/MatchContext";
import { decks } from "../../../data/decks";

export default function DeckSelection() {
  const { match, setMatch, confirmDecks } = useMatch();

  const [search, setSearch] = useState("");
  const [selectedDecks, setSelectedDecks] = useState([]);

  const filteredDecks = decks.filter((deck) =>
    deck.name.toLowerCase().includes(search.toLowerCase()),
  );

  function addDeck(deck) {
    if (match.meDecksConfirmed) return;

    if (selectedDecks.some((d) => d.name === deck.name)) return;

    if (selectedDecks.length >= 3) return;

    setSelectedDecks([...selectedDecks, deck]);

    setSearch("");
  }

  function removeDeck(deck) {
    if (match.meDecksConfirmed) return;

    setSelectedDecks((prev) => prev.filter((d) => d.name !== deck.name));
  }

  return (
    <div className="deck-selection">
      <h2>Selección de Decks</h2>

      <div className="deck-controls">
        <input
          type="text"
          className="deck-search"
          placeholder="Buscar deck..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="deck-picker"
          value=""
          disabled={selectedDecks.length >= 3 || match.meDecksConfirmed}
          onChange={(e) => {
            const deck = decks.find((d) => d.name === e.target.value);

            if (deck) {
              addDeck(deck);
            }
          }}
        >
          <option value="">Selecciona un deck...</option>

          {filteredDecks.map((deck) => (
            <option key={deck.name} value={deck.name}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>

      <div className="deck-selected">
        <h3>Decks seleccionados</h3>

        {selectedDecks.map((deck) => (
          <div key={deck.name} className="deck-item">
            <span>{deck.name}</span>

            <button className="deck-remove" onClick={() => removeDeck(deck)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        className="confirm-button"
        disabled={selectedDecks.length !== 3}
        onClick={() => confirmDecks(selectedDecks.map((deck) => deck.name))}
      >
        Confirmar decks
      </button>

      <div className="deck-status">
        <div>
          Tú:
          {match.meDecksConfirmed ? " ✅ Confirmado" : " ⏳ Esperando"}
        </div>

        <div>
          Rival:
          {match.opponentDecksConfirmed ? " ✅ Confirmado" : " ⏳ Esperando"}
        </div>
      </div>
    </div>
  );
}
