import { supabase } from "./supabase";

const matchService = {
  async getActiveMatch(nickname) {
    const { data, error } = await supabase.rpc("get_active_match", {
      p_nickname: nickname,
    });

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  },

  async selectDecks(matchId, nickname, decks) {
    const { data, error } = await supabase.rpc("select_decks", {
      p_match_id: matchId,
      p_nickname: nickname,
      p_deck1: decks[0],
      p_deck2: decks[1],
      p_deck3: decks[2],
    });

    if (error) {
      console.error("select_decks error:", error);
      throw error;
    }

    return data;
  },

  async ready(matchId, nickname) {
    return await supabase.rpc("ready_match", {
      p_match_id: matchId,
      p_nickname: nickname,
    });
  },

  async banDeck(matchId, nickname, deck) {
    return await supabase.rpc("ban_deck", {
      p_match_id: matchId,
      p_nickname: nickname,
      p_deck: deck,
    });
  },

  async finishMatch(matchId, winner) {
    return await supabase.rpc("finish_match", {
      p_match_id: matchId,
      p_winner: winner,
    });
  },

  async getMatchHistory(nickname) {
    return await supabase.rpc("get_player_matches", {
      p_nickname: nickname,
    });
  },

  async getRanking(page = 1, pageSize = 10) {
    return await supabase.rpc("get_ranking");
  },

  async checkQueueSchedule() {
    const { data, error } = await supabase.rpc("check_queue_schedule");

    return { data, error };
  },
};

export default matchService;
