import * as React from "react";
import { setEmail, setPassword, setUserName, signIn } from "../components/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { auth } from "../index.js";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="px-10 py-10 w-1/3 container mx-auto">
      <h1 className="text-5xl font-semibold">Registrer deg</h1>
      <p className="font-medium text lg text-gray-500 mt-4">
        Registrer deg for å lage og redigere dine egne leker!
      </p>
      <div className="mt-4">
        <div>
          <label className="text-lg font-medium">E-post</label>
          <input
            className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1"
            placeholder="E-post"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Brukernavn</label>
          <input
            className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1"
            placeholder="Brukernavn"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Passord</label>
          <input
            className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1"
            placeholder="Passord"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          <button
            onClick={(e) => {
              signIn();
              if (auth.authStateReady != null) {
                navigate("/minside");
              }
            }}
            className="active:scale-[.98] hover:scale-[1.01] ease-in-out active:duration-75  transition-all py-3 rounded-xl bg-blue-400 shadow-inner hover:bg-blue-500 text-white text-lg text-bold"
          >
            Neste
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Har du allerede en konto?</p>
          <Link
            to="/login"
            className="active:scale-[0.98] hover:text-blue-400 ease-in-out active:duration-75 transition-all text-blue-500 font-medium ml-2"
          >
            Logg inn
          </Link>
        </div>
      </div>
    </div>
  );
}
