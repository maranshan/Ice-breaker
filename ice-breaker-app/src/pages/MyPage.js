import React from "react";
import { useState, useEffect } from "react";
import { getUserList } from "../backend/firebase/getFirebaseInfo";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../components/Auth";
import { auth } from "..";

const MyPage = ({ user }) => {
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  return (
    <>
      <div className="text-center mb-8">
        <br />
        <h2 className="text-3xl font-bold mb-4">Brukerinformasjon</h2>
        <div className="border border-white rounded-lg p-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">E-post:</h3>
            <p className="text-gray-700">
              {auth.currentUser ? auth.currentUser.email : ""}
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Brukernavn:</h3>
            <p className="text-gray-700">
              {userList
                .find((userItem) => userItem.getUID() === auth.currentUser?.uid)
                ?.getBrukernavn() || ""}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={async (e) => {
                await logout();
                navigate("/");
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Logg ut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
