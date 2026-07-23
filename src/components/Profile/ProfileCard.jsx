import { usePlayer } from "../../context/PlayerContext";
import QueuePanel from "../matchmaking/QueuePanel";
export default function ProfileCard() {
  const { profile } = usePlayer();

  if (!profile) return null;

  return (
    <div className="profile">
      <img
        className="profile-logo"
        src="https://i.imgur.com/mdYwRBy.png"
        alt="King of the Blitz"
      />
      <div className="profile-info">
        <div className="profile-name">{profile.nickname}</div>
        <div className="profile-elo">
          <span className="elo-value">{profile.elo}</span>
          <span className="elo-label">ELO</span>
        </div>
      </div>

      <div className="profile-panel">
        <div className="profile-stat">
          <span className="profile-stat-label">Victorias</span>

          <span className="profile-stat-value">{profile.wins}</span>
        </div>

        <div className="profile-stat">
          <span className="profile-stat-label">Derrotas</span>

          <span className="profile-stat-value">{profile.losses}</span>
        </div>

        <div className="profile-stat">
          <span className="profile-stat-label">Winrate</span>

          <span className="profile-stat-value">{profile.winrate}%</span>
        </div>
      </div>

      <div className="profile-search">
        <QueuePanel embedded />
      </div>
    </div>
  );
}
