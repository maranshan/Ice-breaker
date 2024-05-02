import React, { useState, useEffect } from "react";
import { db } from "../index.js";
import { doc, getDoc } from "firebase/firestore";
import { onSubmitGame } from "../backend/firebase/getFirebaseInfo";

const NewGameForm = () => {
  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGameRules, setNewGameRules] = useState([]);
  const [newGameTimer, setNewGameTimer] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitGame(
      newGameName,
      newGameDescription,
      newGameRules.split("\n"),
      selectedCategories,
      newGameTimer
    );
    resetForm();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const resetForm = () => {
    setNewGameName("");
    setNewGameDescription("");
    setNewGameRules("");
    setSelectedCategories([]);
    setNewGameTimer("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  return (
    <>
      <h1 className="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
        Legg til ny lek
      </h1>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">
            Bli-kjent-lek
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Legg inn tittel"
            value={newGameName} 
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setNewGameName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">
            Lek beskrivelse
          </label>
          <textarea
            type="text"
            name="description"
            required
            placeholder="Legg inn beskrivelse"
            value={newGameDescription} 
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setNewGameDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-l font-medium text-gray-700">
            Regler
          </label>
          <textarea
            name="rules"
            required
            placeholder="Legg inn regler (en regel per linje)"
            value={newGameRules} 
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setNewGameRules(e.target.value)}
          />
        </div>
        <fieldset className="mb-4">
          <legend className="mb-2 block text-l font-medium text-gray-700">
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
          <label className="block text-l font-medium text-gray-700">
            Timer
          </label>
          <input
            type="number" 
            name="duration"
            required
            placeholder="Legg til antall minutter"
            value={newGameTimer} 
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setNewGameTimer(e.target.value)} 
            min="1" 
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="submit"
            value="Legg til lek"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mr-4"
          />
          {isSubmitted && <p>Leken din er lagt til.</p>}
        </div>
      </form>
    </>
  );
};

export default NewGameForm;
