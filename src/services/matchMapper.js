export function mapMatch(data) {
  if (!data) return null;

  return {
    id: data.match_id,

    phase: getPhase(data),

    status: data.status,

    player1: {
      nickname: data.player1,
      elo: data.player1_elo,
    },

    player2: {
      nickname: data.player2,
      elo: data.player2_elo,
    },

    opponentNickname: data.opponent,

    selectedDecks: {
      me: (data.my_decks ?? []).filter(Boolean).map((name) => ({
        name,
        image: "",
      })),

      opponent: (data.opponent_decks ?? []).filter(Boolean).map((name) => ({
        name,
        image: "",
      })),
    },

    meDecksConfirmed: (data.my_decks ?? []).filter(Boolean).length === 3,

    opponentDecksConfirmed:
      (data.opponent_decks ?? []).filter(Boolean).length === 3,

    meReady: data.my_ready,

    opponentReady: data.opponent_ready,

    myBan: (data.my_bans ?? []).filter(Boolean),

    opponentBan: (data.opponent_bans ?? []).filter(Boolean),

    finalDeck: data.my_final_deck,

    opponentFinalDeck: data.opponent_final_deck,

    banTurn: data.ban_turn,

    player1Roll: data.player1Roll,

    player2Roll: data.player2Roll,

    firstPlayer: data.firstPlayer,
  };
}

function getPhase(data) {
  if (data.winner) return "result";

  switch (data.status) {
    case "ban_phase":
      return "ban_phase";

    case "playing":
      return "playing";

    case "finished":
      return "result";

    default:
      return "deck_selection";
  }
}
