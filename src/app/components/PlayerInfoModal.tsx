import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface PlayerInfoModalProps {
  selectedPlayerId: string | null;
  onClose: () => void;
}

const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({ selectedPlayerId, onClose }) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [playerData, setPlayerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!selectedPlayerId) return;

    console.log(`Listening to Firestore document: players/${selectedPlayerId}`);
    setIsLoading(true);

    const playerRef = doc(db, "players", selectedPlayerId);
    
    const unsubscribe = onSnapshot(playerRef, (docSnap) => {
      if (docSnap.exists()) {
        setPlayerData(docSnap.data());
      } else {
        setPlayerData(null);
      }
      setIsLoading(false);
    });

    // Cleanup: Stop listening when modal closes
    return () => {
      console.log(`Unsubscribing from Firestore document: players/${selectedPlayerId}`);
      unsubscribe();
    };
  }, [selectedPlayerId]);

  if (!selectedPlayerId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-zinc-900 rounded-xl shadow-xl w-full max-w-md mx-4 z-10 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">
            {isLoading ? "Loading..." : playerData?.name || "Player Details"}
          </h2>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800"
          >
            &times;
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <p className="text-zinc-400">Fetching player details...</p>
            </div>
          ) : playerData ? (
            <div className="p-4 space-y-4">
              {/* Basic Info */}
              <div className="bg-zinc-800 p-4 rounded-xl">
                <h3 className="text-3xl font-semibold text-white">{playerData.name}</h3>
                <p className="text-lg text-zinc-400">{playerData.university}</p>
                <p className="text-lg font-medium">
                  <span className="text-blue-400">{playerData.category}</span>
            
                </p>
              </div>

              {/* Batting Stats */}
              <div className="bg-zinc-800 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-400">Batting Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <p>Innings Played: <span className="font-semibold text-white">{playerData.stats?.inningsPlayed || 0}</span></p>
                  <p>Runs Scored: <span className="font-semibold text-white">{playerData.stats?.totalRuns || 0}</span></p>
                  <p>Batting Avg: <span className="font-semibold text-white">{playerData.stats?.battingAverage || 0}</span></p>
                  <p>Strike Rate: <span className="font-semibold text-white">{playerData.stats?.battingStrikeRate?.toFixed(2) || 0}</span></p>
                  <p>Balls Faced: <span className="font-semibold text-white">{playerData.stats?.totalBallsFaced || 0}</span></p>
                </div>
              </div>

              {/* Bowling Stats */}
              <div className="bg-zinc-800 p-4 rounded-xl">
                <h4 className="text-lg font-semibold text-green-400">Bowling Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                  <p>Wickets Taken: <span className="font-semibold text-white">{playerData.stats?.totalWicketsTaken || 0}</span></p>
                  <p>Economy Rate: <span className="font-semibold text-white">{playerData.stats?.economyRate || 0}</span></p>
                  <p>Bowling SR: <span className="font-semibold text-white">{playerData.stats?.bowlingStrikeRate || 0}</span></p>
                  <p>Balls Bowled: <span className="font-semibold text-white">{playerData.stats?.totalBallsBowled || 0}</span></p>
                  <p>Runs Conceded: <span className="font-semibold text-white">{playerData.stats?.totalRunsConceded || 0}</span></p>
                </div>
              </div>
              {/* Base Price */}
              <div className="bg-zinc-800 p-6 rounded-xl text-center">
                <h4 className="text-xl font-semibold text-yellow-400">Base Price</h4>
                <p className="text-3xl text-zinc-300">Rs {playerData.basePrice}</p>
              </div>

            
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-zinc-400">Player not found</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoModal;