import Layout from "../components/layout/Layout";

import MatchPanel from "../components/matchmaking/MatchPanel";

import HistoryPanel from "../components/history/HistoryPanel";
import RankingPanel from "../components/ranking/RankingPanel";

import { useMatch } from "../context/MatchContext";

export default function Home() {
  const { match } = useMatch();

  return (
    <Layout>
      {match ? <MatchPanel /> : ""}

      <HistoryPanel />

      <RankingPanel />
    </Layout>
  );
}
