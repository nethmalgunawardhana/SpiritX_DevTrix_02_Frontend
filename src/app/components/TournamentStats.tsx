"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface TournamentStats {
  overallRuns: number;
  overallWickets: number;
  highestRunScorer: { player: string; runs: number };
  highestWicketTaker: { player: string; wickets: number };
}

const TournamentStats = () => {
  const [stats, setStats] = useState<TournamentStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<TournamentStats>(
          "http://localhost:3005/api/tournament-stats/0001"
        );
        setStats(response.data);
      } catch {
        setError("Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center text-teal-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 text-white p-8 rounded-lg shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Overall Runs:</span>
          <span className="text-xl font-bold text-teal-300">{stats?.overallRuns}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Overall Wickets:</span>
          <span className="text-xl font-bold text-teal-300">{stats?.overallWickets}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Highest Run Scorer:</span>
          <span className="text-xl font-bold text-teal-300">{stats?.highestRunScorer.player} ({stats?.highestRunScorer.runs} runs)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Highest Wicket Taker:</span>
          <span className="text-xl font-bold text-teal-300">{stats?.highestWicketTaker.player} ({stats?.highestWicketTaker.wickets} wickets)</span>
        </div>
      </div>
    </div>
  );
};

export default TournamentStats;