import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useModal } from "../context/ModalContext";

export default function Login() {
  const { login } = usePlayer();
  const { showModal } = useModal();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const result = await login(nickname, password);

    if (!result.success) {
      showModal({
        type: "error",
        title: "Error",
        message: result.message,
        autoClose: true,
      });

      return;
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img
            className="profile-logo"
            src="https://i.imgur.com/mdYwRBy.png"
            alt="King of the Blitz"
          />

          <input
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <input
            type="password"
            placeholder="Código"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="confirm-button" onClick={handleLogin}>
            Conectar
          </button>
        </div>

        <div className="login-info-card">
          <h2>📚 Guía de King of the Blitz</h2>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Qué es King of the Blitz?",
                message:
                  "Es una competición basada en temporadas donde los jugadores podrán disputar tantas partidas como deseen dentro de una franja horaria determinada." +
                  "\n\nDurante ese tiempo simplemente tendrás que entrar en la plataforma, pulsar Buscar partida y el sistema te emparejará automáticamente con otro jugador disponible." +
                  "\n\nSin rondas. Sin esperas. Sin estar atado a un torneo durante toda la tarde." +
                  "\n\nSi necesitas irte, simplemente dejas de buscar partidas y listo. Tus estadísticas y tu progreso permanecerán intactos.",
                autoClose: false,
              })
            }
          >
            🏆 ¿Qué es King of the Blitz?
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Formato",
                message:
                  "Las partidas serán BO1, pero no perderán el componente estratégico." +
                  "\nCada enfrentamiento seguirá este procedimiento:" +
                  "\n-Cada jugador seleccionará 3 decks." +
                  "\n-Se realizará una fase de baneos." +
                  "\n-Tras los baneos, cada jugador jugará con el deck restante." +
                  "\n\nEste sistema busca mantener la profundidad estratégica propia de los formatos competitivos, reduciendo al mismo tiempo la duración de cada enfrentamiento.",
                autoClose: false,
              })
            }
          >
            📋 Formato
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Modalidad",
                message:
                  "Toda la competición se desarrollará mediante webcam, permitiendo participar desde cualquier lugar sin necesidad de desplazarse." +
                  "\n\nDiscord: https://discord.gg/qBrStk7yhn",
                autoClose: false,
              })
            }
          >
            ⚔️ Modalidad
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Sistema de ELO",
                message:
                  "Cada victoria y cada derrota tendrá impacto en tu clasificación." +
                  "\n\nEl matchmaking intentará emparejarte con rivales de un nivel similar para ofrecer partidas equilibradas y competitivas." +
                  "\n\nA medida que aumente el número de jugadores, el sistema ajustará automáticamente el rango de búsqueda para reducir los tiempos de espera sin perder competitividad.",
                autoClose: false,
              })
            }
          >
            📈 Sistema de ELO
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Premios",
                message:
                  "El ganador de cada temporada recibirá:" +
                  "\n\n📦 Una caja del set más reciente de Digimon Card Game disponible en ese momento." +
                  "\n\nPara que el ranking refleje una participación real, el premio solo se entregará si los jugadores que finalicen en el Top 10 han disputado al menos 15 partidas durante la temporada.",
                autoClose: false,
              })
            }
          >
            🎁 Premios
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Horarios",
                message:
                  "El ganador de cada temporada recibirá:" +
                  "\n\n📦 Una caja del set más reciente de Digimon Card Game disponible en ese momento." +
                  "\n\nPara que el ranking refleje una participación real, el premio solo se entregará si los jugadores que finalicen en el Top 10 han disputado al menos 20 partidas durante la temporada.",
                autoClose: false,
              })
            }
          >
            🕒 Horarios
          </button>

          <button
            onClick={() =>
              showModal({
                type: "info",
                title: "Registro & Login",
                message:
                  "Si es la primera vez que entras, solo tienes que introducir un Nickname y código de 6 dígitos." +
                  "\n\nLuego cuando te quieras conectar en otro momento, podrás hacerlo con los mismo datos sin perder tú progreso.",
                autoClose: false,
              })
            }
          >
            🌐 Registro & Login
          </button>
        </div>
      </div>
    </div>
  );
}
