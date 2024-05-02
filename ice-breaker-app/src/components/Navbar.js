import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./Auth";
import { auth } from "../index.js";

const Dropdown = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
      <Link
        to="/minside"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Profil
      </Link>
      <Link
        to="/mineleker"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Mine leker
      </Link>
      <Link
        to="/favoritter"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Favorittleker
      </Link>
      <button
        onClick={async (e) => {
          await logout();
          navigate("/");
        }}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Logg ut
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const loginStatus = auth.onAuthStateChanged((user) => {
      setUserIsLoggedIn(!!user);
    });
    return () => loginStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="grid bg-blue-400 shadow-inner shadow-blue-500/50 text-white p-4 h-16 content-center relative">
      <div>
        <ul className="flex gap-4 justify-center text-2xl relative">
          <li>
            <Link to="/" className="hover:bg-blue-500 p-2 rounded">
              Hjem
            </Link>
          </li>
          <li>
            {userIsLoggedIn && (
              <Link to="/nylek" className="hover:bg-blue-500 p-2 rounded">
                Opprett lek
              </Link>
            )}
          </li>
          <li>
            {!userIsLoggedIn && (
              <Link to="/login" className="hover:bg-blue-500 p-2 rounded">
                Logg inn
              </Link>
            )}
          </li>
          <li
            className="relative group"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            {userIsLoggedIn && (
              <span className="hover:bg-blue-500 p-2 rounded">Min Side</span>
            )}
            {isDropdownOpen && <Dropdown />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
