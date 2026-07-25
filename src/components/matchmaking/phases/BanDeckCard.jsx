export default function BanDeckCard({
  deck,
  canBan = false,
  banned = false,
  onBan,
}) {
  return (
    <div
      className={`ban-card
        ${banned ? "banned" : ""}
        ${deck.playing ? "playing" : ""}
    `}
    >
      <img src={deck.image} alt={deck.name} className="ban-image" />

      <h3>{deck.name}</h3>

      {canBan && !banned && (
        <button
          className="ban-button"
          onClick={() => {
            onBan(deck.name);
          }}
        >
          BAN
        </button>
      )}

      {banned && <div className="ban-ribbon banned-ribbon">BANNED</div>}

      {deck.playing && <div className="ban-ribbon playing-ribbon">PLAYING</div>}
    </div>
  );
}
