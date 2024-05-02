import React from "react";
import { auth } from "..";
import { useState, useEffect } from "react";
import { getGameList } from "../backend/firebase/getFirebaseInfo";
import { useNavigate } from "react-router-dom";

const MyGames = () => {
  const navigate = useNavigate();

  const [gameList, setGameList] = useState([]);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    getGameList(setGameList);
  }, []);

  const myGames = gameList.filter((game) => {
    return game.getOwner() === currentUserId;
  });

  const handleGameClick = (game) => {
    if (game.getOwner() === auth.currentUser.uid) {
      navigate("/mineleker/editleker", { state: { game } });
    } else {
      navigate("/leker", { state: { game } });
    }
  };

  const leggTilNyLekClick = () => {
    navigate("/nylek");
  };

  return (
    <div>
      <h2 class="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
        Mine leker
      </h2>
      <div className="flex justify-center h-96 p-3">
        <div className="overflow-y-scroll w-3/5 p-5">
          <div className="grid grid-cols-3 gap-4">
            {myGames.map((game) => (
              <div
                key={game.id}
                className="p-3 h-40 bg-blue-200 shadow-lg shadow-slate-400/50 rounded-md overflow-hidden hover:bg-gray-400 hover:scale-[1.01] cursor-pointer"
                onClick={() => handleGameClick(game)}
              >
                <h2 className="font-bold text-black">{game.getName()}</h2>
                <h2 className="text-black">{game.getDescription()} </h2>
              </div>
            ))}
            <button
              className="p-3 h-40 bg-slate-300 opacity-65	 shadow-lg shadow-slate-400/50 rounded-md overflow-hidden hover:bg-gray-400 hover:scale-[1.01] cursor-pointer"
              onClick={() => leggTilNyLekClick()}
            >
              <h2 className="font-bold text-black">Legg til ny lek</h2>+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGames;
