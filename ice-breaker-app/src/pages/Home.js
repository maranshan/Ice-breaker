import React, { useState, useEffect } from "react";
import ListGames from "../components/ListGames";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Auth } from "firebase/auth";
import { auth } from "..";
import { getGameList } from "../backend/firebase/getFirebaseInfo";
import { useNavigate } from "react-router-dom";
import KG from "../components/KategoriDropdown";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const checkUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => checkUser();
  }, []);

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    getGameList(setGameList);
  }, []);

  return (
    <div className="bg-slate-100">
      {!isLoggedIn && (
        <section className="bg-gray-800 text-white text-center py-16 shadow-inner shadow-gray-900">
          <div className="container mx-auto">
            <p className="mb-6 text-xl">Lag en bruker og lag en lek!</p>
            <Link
              to="/signin"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded mt-6"
            >
              Lag Bruker
            </Link>
          </div>
        </section>
      )}

      <section className="container mx-auto py-4">
        <h2 className="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
          Spill
        </h2>
        <KG />
        <div>
          <ListGames randomGameList={gameList} />
        </div>
      </section>

    </div>
  );
};

export default Home;
