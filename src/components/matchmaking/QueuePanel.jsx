import { useState, useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext";
import {
  joinQueue,
  leaveQueue,
  checkQueueSchedule,
} from "../../services/playerService";
import { useMatch } from "../../context/MatchContext";
import { supabase } from "../../services/supabase";
import { useModal } from "../../context/ModalContext";

export default function QueuePanel({ embedded = false }) {
  const [searching, setSearching] = useState(false);
  const { player } = usePlayer();
  const { match, loadMatch } = useMatch();
  const { showModal } = useModal();

  useEffect(() => {
    if (!match) {
      setSearching(false);
    }
  }, [match]);

  if (match) {
    return null;
  }
  async function handleSearch() {
    try {
      const { data, error } = await checkQueueSchedule();

      if (error) {
        showModal({
          type: "error",
          title: "Error",
          message: "No se ha podido comprobar el horario.",
          autoClose: true,
        });

        return;
      }

      if (!data.allowed) {
        showModal({
          type: "warning",
          title: "Fuera de horario",
          message: `${data.message}\n\nPróxima apertura: ${data.next_open}`,
        });

        return;
      }

      const result = await joinQueue(player.nickname);

      if (result.matched) {
        const match = await loadMatch();

        showModal({
          type: "info",
          title: "¡Has encontrado rival!",
          message: `${match.player1.nickname} vs ${match.player2.nickname}`,
          autoClose: true,
        });
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
