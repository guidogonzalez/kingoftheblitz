import { createContext, useContext, useEffect, useState } from "react";
import matchService from "../services/matchService";
import { supabase } from "../services/supabase";
import { usePlayer } from "./PlayerContext";
import { mapMatch } from "../services/matchMapper";
import { useModal } from "./ModalContext";

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const { player, refreshPlayer } = usePlayer();
  const { showModal } = useModal();
  const [match, setMatch] = useState(null);
  const [lastStatus, setLastStatus] = useState(null);

  async function refreshMatch() {
    try {
      const data = await matchService.getActiveMatch(player.nickname);

      if (!data.active) {
        setMatch(null);
        return;
      }

      const mapped = mapMatch(data);

      const wasFinished = match?.status === "finished";

      if (mapped.status === "finished" && !wasFinished) {
        const iWon =
          mapped.winner.toLowerCase() === player.nickname.toLowerCase();

        showModal({
          type: iWon ? "success" : "error",
          title: iWon ? "¡Victoria!" : "Derrota",
          message: iWon ? "Has ganado la partida." : "Has perdido la partida.",
          autoClose: true,
        });
      }

      setMatch(mapped);

      // Si la partida acaba de entrar en deck_choice,
      // seleccionamos automáticamente el único deck disponible.
      if (mapped.status === "deck_choice" && !mapped.finalDeck) {
        const myAvailable = mapped.selectedDecks.me.filter(
          (deck) => !mapped.myBan.includes(deck.name),
        );

        if (myAvailable.length === 1) {
          await selectFinalDeck(mapped.id, myAvailable[0].name);
        }
      }

      return mapped;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!player?.nickname || match) return;

    const channel = supabase
      .channel(`waiting-${player.nickname}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "matches",
        },
        async (payload) => {

          console.log(payload);
          const p1 = payload.new.player1?.toLowerCase();
          const p2 = payload.new.player2?.toLowerCase();
          const me = player.nickname.toLowerCase();

          if (p1 !== me && p2 !== me) return;

          await loadMatch();

          showModal({
            type: "info",
            title: "¡Has encontrado rival!",
            message: `${payload.new.player1}  vs ${payload.new.player2}`,
            autoClose: true,
          });
        },
      )
      .subscribe((status) => {});

    return () => {
      supabase.removeChannel(channel);
    };
  }, [player?.nickname, match]);

  useEffect(() => {
    if (!match?.id) return;

    const channel = supabase
      .channel(`match-${match.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "matches",
          filter: `id=eq.${match.id}`,
        },
        async (payload) => {
          if (payload.new.status === "finished") {
            const iWon = payload.new.winner === player.id;

            showModal({
              type: iWon ? "success" : "error",
              title: iWon ? "¡Victoria!" : "Derrota",
              message: iWon
                ? `Has ganado la partida.\n\n+${payload.new.winner_elo_change} ELO\n${payload.new.winner_old_elo} → ${payload.new.winner_new_elo}`
                : `Has perdido la partida.\n\n${payload.new.loser_elo_change} ELO\n${payload.new.loser_old_elo} → ${payload.new.loser_new_elo}`,
              autoClose: true,
            });

            await refreshPlayer();

            setMatch(null);
            return;
          }

          await refreshMatch();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [match?.id]);

  async function confirmDecks(selectedDecks) {
    try {
      await matchService.selectDecks(match.id, player.nickname, selectedDecks);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadMatch() {
    return await refreshMatch();
  }

  useEffect(() => {
    if (!player?.nickname) return;

    loadMatch();
  }, [player?.nickname]);

  async function readyUp() {
    try {
      await matchService.ready(match.id, player.nickname);
    } catch (error) {
      console.error(error);
    }
  }

  async function banDeck(deckName) {
    try {
      const result = await matchService.banDeck(
        match.id,
        player.nickname,
        deckName,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function selectFinalDeck(matchId, deckName) {
    const { data, error } = await supabase.rpc("select_final_deck", {
      p_match_id: matchId,
      p_nickname: player.nickname,
      p_deck: deckName,
    });

    if (error) {
      console.error(error);
      return;
    }
  }

  return (
    <MatchContext.Provider
      value={{
        match,
        setMatch,

        confirmDecks,
        readyUp,
        banDeck,
        selectFinalDeck,

        loadMatch,
        finishMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );

  async function finishMatch(winner) {
    try {
      const data = await matchService.finishMatch(match.id, winner);

      const iWon = winner.toLowerCase() === player.nickname.toLowerCase();

      const elo = data.data;

      showModal({
        type: iWon ? "success" : "error",
        title: iWon ? "¡Victoria!" : "Derrota",
        message: iWon
          ? `Has ganado la partida.\n\n+${elo.winner_elo_change} ELO\n${elo.winner_old_elo} → ${elo.winner_new_elo}`
          : `Has perdido la partida.\n\n${elo.loser_elo_change} ELO\n${elo.loser_old_elo} → ${elo.loser_new_elo}`,
        autoClose: true,
      });
      await refreshPlayer();
      setMatch(null);
    } catch (err) {
      console.error(err);
    }
  }
}

export function useMatch() {
  return useContext(MatchContext);
}
