import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { auth } from "../index";

const GameOverView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state?.game;

  const [gameName, setNewGameName] = useState(gameData.name);
  const [gameDescription, setNewGameDescription] = useState(
    gameData.description
  );
  const gameRules = gameData.rules || [];
  const categories = gameData.categories || [];
  const [gameTimer, setNewGameTimer] = useState(gameData.estimatedTime);
  const [timeLeft, setTimeLeft] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert("Tiden er ute!");
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(gameTimer * 60);
  };

  const handleFavButtonClick = () => {
    if (user) {
      return <FavoriteButton gameId={gameData.id} />;
    }
  };

  const showCategories = () => {
    if (categories.length === 0) {
      return;
    } else {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Kategorier
          </label>
          <ul className="list-disc pl-5 mt-1 p-2">
            {categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <>
      <h2 className="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
        Lek
      </h2>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tittel på lek
          </label>
          <input
            type="text"
            name="tittel"
            required
            value={gameName}
            placeholder="Legg til spilltittel"
            readOnly
            className="mt-1 p-2 bg-slate-50 rounded-md w-full focus:outline-none focus:none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Beskrivelse av leken
          </label>
          <textarea
            type="text"
            name="beskrivelse"
            required
            value={gameDescription}
            placeholder="Legg til beskrivelse"
            readOnly
            className="mt-1 p-2 bg-slate-50 rounded-md w-full focus:outline-none focus:none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Regler
          </label>
          <ul className="list-disc pl-5 mt-1 p-2">
            {gameRules.map((rules, index) => (
              <li key={index}>{rules}</li>
            ))}
          </ul>
        </div>
        {showCategories()}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Timer
          </label>
          <input
            name="timer"
            required
            value={gameTimer}
            placeholder="Legg til timer (min)"
            readOnly
            className="mt-1 p-2 bg-slate-50 rounded-md w-full focus:outline-none focus:none"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="button"
            value="Start Timer"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-4"
            onClick={startTimer}
          />
          {handleFavButtonClick()}
          {timeLeft !== null && (
            <p>
              Gjenværende tid: {Math.floor(timeLeft / 60)}:
              {("0" + (timeLeft % 60)).slice(-2)}
            </p>
          )}
        </div>
        <div className="mb-4 flex justify-end"></div>
      </form>
    </>
  );
};

export default GameOverView;
