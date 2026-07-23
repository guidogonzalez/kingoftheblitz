export default function RankingRow({ player }) {
  return (
    <tr>
      <td>
        {player.position === 1
          ? "🥇"
          : player.position === 2
            ? "🥈"
            : player.position === 3
              ? "🥉"
              : player.position}
      </td>

      <td>{player.nickname}</td>

      <td>{player.elo}</td>

      <td>
        {player.wins} / {player.losses}
      </td>

      <td>{player.winrate}%</td>
    </tr>
  );
}
