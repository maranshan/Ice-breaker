import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../index";
import { addToFav, deleteFavGame } from "../backend/firebase/getFirebaseInfo";

const FavoriteButton = ({ gameId }) => {
  const [isActive, setIsActive] = useState(false);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().favGames) {
        setIsActive(userSnap.data().favGames.includes(gameId));
      }
    };

    checkFavoriteStatus();
  }, [gameId, userId]);

  return (
    <button
      className={`p-2 rounded-md border-2 border-yellow-400 ${
        isActive
          ? "bg-yellow-400 text-white hover:bg-red-500 hover:text-white"
          : "bg-white text-yellow-400 hover:bg-yellow-400 hover:text-white"
      } focus:outline-none focus:ring focus:border-yellow-500 transition-color`}
      onClick={(e) => {
        e.preventDefault();
        if (isActive) {
          deleteFavGame(gameId);
        } else {
          addToFav(gameId);
        }
        setIsActive(!isActive);
      }}
    >
      {isActive ? "(-) Favoritter" : "(+) Favoritter"}
    </button>
  );
};

export default FavoriteButton;
