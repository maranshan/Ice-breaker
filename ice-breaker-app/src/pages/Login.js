import * as React from "react";
import { logIn, setEmail, setPassword } from "../components/Auth.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { auth } from "../index.js";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="px-10 py-10 w-1/3 container mx-auto ">
      <h1 className="text-5xl font-semibold">Logg inn</h1>
      <p className="font-medium text lg text-gray-500 mt-4">
        Bli med å lage en lek!
      </p>
      <div className="mt-4">
        <div>
          <label className="text-lg font-medium">E-mail</label>
          <input
            className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1"
            placeholder="Skriv inn din e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="text-lg font-medium">Passord</label>
          <input
            className="w-full border-2 border-gray-500 rounded-xl p-2 mt-1"
            placeholder="Skriv inn ditt passord"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          <button
            onClick={async (e) => {
              await logIn();
              if (auth.currentUser !== null) {
                navigate("/minside");
              }
            }}
            className="active:scale-[.98] hover:scale-[1.01] ease-in-out active:duration-75  transition-all py-3 rounded-xl  bg-blue-400 shadow-inner hover:bg-blue-500 text-white text-lg text-bold"
          >
            Logg inn
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Har du ikke en konto?</p>
          <Link
            to="/signin"
            className="active:scale-[0.98] hover:text-blue-500 ease-in-out active:duration-75 transition-all text-blue-400 font-medium ml-2"
          >
            Registrer deg!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
