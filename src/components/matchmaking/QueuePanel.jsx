import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { joinQueue, leaveQueue } from "../../services/playerService";
import { useMatch } from "../../context/MatchContext";
import { supabase } from "../../services/supabase";

export default function QueuePanel({ embedded = false }) {
  const [searching, setSearching] = useState(false);
  const { player } = usePlayer();
  const { match, loadMatch } = useMatch();
  if (match) {
    return null;
  }
  async function handleSearch() {
    try {
      const result = await joinQueue(player.nickname);

      if (result.matched) {
        await loadMatch();
        return;
      }

      setSearching(true);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleCancel() {
    try {
      await leaveQueue(player.nickname);

      setSearching(false);
    } catch (error) {
      console.error(error);

      setError(error.message);
    }
  }

  const content = (
    <>
      {!searching ? (
        <button className="confirm-button" onClick={handleSearch}>
          Buscar partida
        </button>
      ) : (
        <>
          <p>Buscando rival...</p>

          <button className="cancel-button" onClick={handleCancel}>
            Cancelar búsqueda
          </button>
        </>
      )}
    </>
  );

  return embedded ? content : <section className="panel">{content}</section>;
}
