import React from "react";
import { auth } from "../index.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavList } from "../backend/firebase/getFirebaseInfo.js";
import Modal from "../components/Modal.js";
import { useAuth } from "../backend/firebase/AuthContext";

const Favorites = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [favList, setFavList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getFavList(currentUser, setFavList);
  }, [currentUser]);

  const handleGameClick = (game) => {
    if (game.getOwner() === auth.currentUser.uid) {
      navigate("/mineleker/editleker", { state: { game } });
    } else {
      navigate("/leker", { state: { game } });
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl text-gray-800 font-bold h-16 flex items-center ml-4">
          Favoritter
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleOpenModal}
        >
          Velg tilfeldig favorittlek
        </button>
      </div>

      <div className="flex justify-center h-96 p-3">
        <div className="overflow-y-scroll w-3/5 p-5">
          <div className="grid grid-cols-3 gap-4">
            {favList.map((game) => (
              <div
                key={game.id}
                className="p-3 h-40 bg-blue-200 shadow-lg shadow-slate-400/50 rounded-md overflow-hidden hover:bg-gray-400 hover:scale-[1.01] cursor-pointer"
                onClick={() => handleGameClick(game)}
              >
                <h2 className="font-bold text-black">{game.getName()}</h2>
                <h2 className="text-black">{game.getDescription()} </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
};

export default Favorites;
