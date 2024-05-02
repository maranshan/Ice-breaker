import { useState, useEffect } from "react";
import { editGame, deleteGame } from "../backend/firebase/getFirebaseInfo";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../index.js";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "..";
import FavoriteButton from "../components/FavoriteButton";

const EditGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state?.game;

  const [gameName, setGameName] = useState(gameData.name);
  const [gameDescription, setGameDescription] = useState(gameData.description);
  const [gameRules, setGameRules] = useState(gameData.rules.join("\n"));
  const [selectedCategories, setSelectedCategories] = useState(
    gameData.categories || []
  );
  const [categories, setCategories] = useState([]);
  const [gameTimer, setNewGameTimer] = useState(gameData.estimatedTime);
  const [gameTimerError, setGameTimerError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const rulesEdited =
      gameRules.split("\n").join("") !== gameData.rules.join("");
    const categoriesEdited = () => {
      const sortedSelectedCategories = [...selectedCategories].sort();
      const sortedOriginalCategories = [...gameData.categories].sort();
      return (
        JSON.stringify(sortedSelectedCategories) !==
        JSON.stringify(sortedOriginalCategories)
      );
    };
    const otherDetailsEdited =
      gameName !== gameData.name ||
      gameDescription !== gameData.description ||
      gameTimer !== gameData.estimatedTime;

    setIsEdited(rulesEdited || categoriesEdited() || otherDetailsEdited);
  }, [
    gameName,
    gameDescription,
    gameRules,
    selectedCategories,
    gameTimer,
    gameData,
  ]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const docRef = doc(db, "legalCategories", "aZvsIRJ0DbQYE2a5HAXj");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCategories(docSnap.data().legalCategories);
      } else {
        console.log("No such document!");
      }
    };

    fetchCategories();
  }, []);

  const handleSaveChanges = async (e) => {
    if (isEdited) {
      await editGame(
        gameName,
        gameDescription,
        gameRules.split("\n"),
        selectedCategories,
        gameTimer,
        gameData.id
      );
      navigate("/mineLeker");
    }
  };

  const handleDelete = async (e) => {
    const isConfirmed = window.confirm("Vil du virkelig slette denne leken?");
    e.preventDefault();
    if (isConfirmed) {
      e.preventDefault();
      await deleteGame(gameData.id);
      navigate("/mineleker");
    }
  };

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

  return (
    <>
      <h2 className="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
        Rediger din lek
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
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setGameName(e.target.value)}
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
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setGameDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Regler
          </label>
          <textarea
            name="regler"
            required
            value={gameRules}
            placeholder="Legg til regler (en regel per linje)"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setGameRules(e.target.value)}
          />
        </div>
        <fieldset className="mb-4">
          <legend className="block text-sm font-medium text-gray-700">
            Kategorier
          </legend>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                id={`category-${index}`}
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label
                htmlFor={`category-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                {category}
              </label>
            </div>
          ))}
        </fieldset>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Timer
          </label>
          <textarea
            name="timer"
            required
            value={gameTimer}
            placeholder="Legg til timer (min)"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setNewGameTimer(e.target.value)}
          />
          {gameTimerError && (
            <p className="text-red-500 text-xs mt-1">{gameTimerError}</p>
          )}
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
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (!gameTimer.trim()) {
                setGameTimerError(
                  "Tidsestimatet er tomt. Venligst velg en tid før du lagrer."
                );
                return;
              }
              if (parseInt(gameTimer, 10) <= 0) {
                setGameTimerError(
                  "Tidsestimatet må være større en 0. Venligst velg en tid større enn null"
                );
                return;
              } else {
                setGameTimerError("");
              }
              await editGame(
                gameName,
                gameDescription,
                gameRules.split("\n"),
                gameData.id,
                selectedCategories,
                gameTimer
              );
              navigate("/mineleker");
            }}
            disabled={!isEdited}
            className={`active:scale-[.98] hover:scale-[1.01] ease-in-out active:duration-75 transition-all py-3 rounded-xl text-lg text-bold ${
              isEdited
                ? "bg-violet-500 text-white"
                : "bg-gray-500 text-gray-400 cursor-not-allowed"
            }`}
          >
            Godta endring
          </button>
          <button
            onClick={async (e) => {
              handleDelete(e);
            }}
            className="py-3 px-4 rounded-xl bg-red-500 text-white text-lg font-bold hover:bg-red-600 active:scale-[.98] transition duration-150 ease-in-out"
          >
            Slett
          </button>
        </div>
      </form>
    </>
  );
};

export default EditGame;
