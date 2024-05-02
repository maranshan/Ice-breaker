import { useNavigate } from "react-router-dom";
import { auth } from "..";

export default function ListGames({ randomGameList }) {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    if (auth.currentUser !== null) {
      if (game.getOwner() === auth.currentUser.uid) {
        navigate("/mineleker/editleker", { state: { game } });
      } else {
        navigate("/leker", { state: { game } });
      }
    } else {
      navigate("/leker", { state: { game } });
    }
  };

  return (
    <div className="flex justify-center h-96">
      <div className="overflow-y-scroll w-3/5 bg-slate-100 p-5">
        <div className="grid grid-cols-3 gap-4">
          {randomGameList.map((game) => (
            <div
              key={game.id}
              className="p-3 h-40 bg-blue-200 shadow-lg shadow-slate-400/50 rounded-md overflow-hidden hover:bg-gray-400 hover:scale-[1.01] cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              <h2 className="font-bold">{game.name}</h2>
              <p className="truncate">{game.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
