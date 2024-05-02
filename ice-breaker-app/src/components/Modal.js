import React, { useEffect, useState } from "react";
import { getFavList } from "../backend/firebase/getFirebaseInfo.js";
import { useNavigate } from "react-router-dom";
import { auth } from "..";
import { useAuth } from "../backend/firebase/AuthContext";

const Modal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [favList, setFavList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectGame, setSelectGame] = useState(null);

  useEffect(() => {
    getFavList(currentUser, setFavList);
  }, [currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      handleRandomFav();
    }
  }, [showContent]);

  const getRandomGame = (favList) => {
    const randomIndex = Math.floor(Math.random() * favList.length);
    return favList[randomIndex];
  };

  const handleRandomFav = () => {
    if (favList.length > 0) {
      const randomFavGame = getRandomGame(favList);
      setShowModal(true);
      setSelectGame(randomFavGame);
    } else {
      console.log("Ingen favorittleker å velge mellom.");
    }
  };

  const handleGameClick = (game) => {
    if (game.getOwner() === auth.currentUser.uid) {
      navigate("/mineleker/editleker", { state: { game } });
    } else {
      navigate("/leker", { state: { game } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      {showLoading && (
        <div className="bg-white w-80 h-64 rounded-lg shadow-lg flex justify-center items-center relative">
          <p>Laster inn...</p>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mr-2 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}

      {showContent && selectGame && (
        <div className="bg-white w-80 h-64 rounded-lg shadow-lg flex flex-col justify-center items-center relative">
          <h2 className="text-xl font-bold mb-4"> {selectGame.name}</h2>
          <div className="flex mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleGameClick(selectGame)}
            >
              Gå til lek
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRandomFav}
            >
              Velg ny lek
            </button>
          </div>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mr-2 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
