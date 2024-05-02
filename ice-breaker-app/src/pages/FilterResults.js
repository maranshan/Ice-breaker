import React, { useState, useEffect } from "react";
import ListGames from "../components/ListGames";
import { getFilteredGames } from "../backend/firebase/getFirebaseInfo";
import { useNavigate } from "react-router-dom";
import { auth } from "..";

const FilterResults = () => {
  const navigate = useNavigate();
  const [filteredList, setFilteredList] = useState([]);
  const filteredGameListLength = filteredList.length;

  useEffect(() => {
    const fetchFilteredGames = async () => {
      const categories = JSON.parse(localStorage.getItem("categories"));
      const games = await getFilteredGames(categories);
      setFilteredList(games);
    };
    fetchFilteredGames();
  }, []);

  return (
    <div className="bg-slate-100 relative pt-8 pl-8">
      <h2 className="text-4xl text-gray-800 font-bold h-16 flex items-center justify-center">
        Resultater
      </h2>
      <button
        className="p-3 absolute w-30 flex items-center justify-center gap-2 rounded-xl bg-gray-400 hover:bg-gray-600 active:scale-[.98] transition duration-150 ease-in-out"
        onClick={async () => {
          navigate("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="text-white text-lg font-bold">Tilbake</span>
      </button>
      <section className="container mx-auto py-4">
        {filteredGameListLength !== 0 ? (
          <div>
            <ListGames randomGameList={filteredList} />
          </div>
        ) : (
          <div className="bg-slate-100">
            <section className="container mx-auto py-4 h-screen">
              <h2 className="text-xl text-gray-800 h-16 flex items-center justify-center">
                Foreløpig er det ingen spill å vise med dette filteret
              </h2>
            </section>
          </div>
        )}
      </section>
    </div>
  );
};

export default FilterResults;
