import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import Img from "next/image";
import PlayerInfoModal from "./PlayerInfoModal";

interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  university: string;
  price: string;
}

interface TableProps {
  players: Player[];
  onMenuClick: (playerId: string, event: React.MouseEvent) => void;
}

const Table: React.FC<TableProps> = ({ players, onMenuClick }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  return (
    <div className="w-[75rem] bg-zinc-900 text-white rounded-lg overflow-hidden border border-zinc-800 ml-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-[0.9rem]">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-4 px-6 text-left text-zinc-300 font-medium">Avatar</th>
              <th className="py-4 px-6 text-left text-zinc-300 font-medium">Player name</th>
              <th className="py-4 px-6 text-left text-zinc-300 font-medium">University</th>
              <th className="py-4 px-6 text-left text-zinc-300 font-medium">Price</th>
              <th className="py-4 px-6 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                onClick={() => setSelectedPlayerId(player.id)} // Opens modal
                className="border-b bg-zinc-950 border-zinc-800 hover:bg-zinc-900 cursor-pointer duration-75"
              >
                <td className="py-4 px-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Img
                      src={player.avatarUrl}
                      alt={`${player.name}'s avatar`}
                      className="w-full h-full object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                </td>
                <td className="py-4 px-6 font-medium">{player.name}</td>
                <td className="py-4 px-6 text-zinc-300">{player.university}</td>
                <td className="py-4 px-6 font-medium">{player.price}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onMenuClick(player.id, e);
                    }}
                    className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Player Modal */}
        {selectedPlayerId && (
          <PlayerInfoModal
            selectedPlayerId={selectedPlayerId}
            onClose={() => setSelectedPlayerId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
