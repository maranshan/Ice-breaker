import React, { useState, useEffect } from "react";
import { getLegalCategories } from "../backend/firebase/getFirebaseInfo";
import { useNavigate } from "react-router-dom";

const KategoriDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [valgtKategori, setValgtKategori] = useState([]);
  const [dropdownKategorier, setDropdownKategorier] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdropdownKategorier = async () => {
      const dropdownKategorier = await getLegalCategories();
      setDropdownKategorier(dropdownKategorier);
    };

    fetchdropdownKategorier();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (category) => {
    if (valgtKategori.includes(category)) {
      setValgtKategori(valgtKategori.filter((item) => item !== category));
    } else {
      setValgtKategori([...valgtKategori, category]);
    }
  };

  const handleRemoveAll = () => {
    setValgtKategori([]);
  };

  const handleSearch = () => {
    localStorage.setItem("categories", JSON.stringify(valgtKategori));
    navigate("/results");
    console.log(valgtKategori);
  };

  return (
    <div className="relative pl-6">
      <div className="dropdown w-44 relative  bg-gray-200 shadow-sm shadow-slate-400/50 rounded-md cursor-pointer">
        <div
          className="dropdown-toggle hover:bg-gray-400 p-1 rounded-md"
          onClick={toggleDropdown}
        >
          Filtrer på kategorier
        </div>
        {isOpen && (
          <div className="dropdown-menu absolute p-1 z-10 w-44 rounded-sm bg-gray-200 ">
            <ul>
              {dropdownKategorier.map((category, index) => (
                <li
                  className="hover:bg-blue-200 rounded-sm "
                  key={index}
                  onClick={() => handleItemClick(category)}
                >
                  <input
                    type="checkbox"
                    checked={valgtKategori.includes(category)}
                    readOnly
                    className=" mr-2 accent-blue-300 "
                  />
                  {category}
                </li>
              ))}
            </ul>
            <div className="dropdown-buttons grid grid-cols-2 p-1">
              <button
                className=" bg-slate-300  hover:bg-gray-400  border-slate-400 border-2 "
                onClick={handleRemoveAll}
              >
                Fjern alle
              </button>
              <button
                className=" bg-blue-200 hover:bg-blue-300  border-blue-300 border-2 hover:scale-[1.04]"
                onClick={handleSearch}
              >
                Søk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KategoriDropdown;
