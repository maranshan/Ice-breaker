import logo from "./assets/images/ice-breaker-logo.png";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewGame from "./pages/GameOverView.js";
import MinSide from "./pages/MyPage";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Game from "./pages/EditGame.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import MineLeker from "./pages/MyGames";
import NewGameForm from "./pages/NewGameForm.js";
import EditGame from "./pages/EditGame.js";
import GameOverView from "./pages/GameOverView.js";
import Favorites from "./pages/Favorites.js";
import FilterResults from "./pages/FilterResults.js";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nylek" element={<NewGameForm />} />
          <Route path="/leker" element={<GameOverView />} />
          <Route path="/minside" element={<MinSide />} />
          <Route path="/mineleker" element={<MineLeker />} />
          <Route path="/mineleker/editleker" element={<EditGame />} />
          <Route path="/favoritter" element={<Favorites />} />
          <Route path="/loggut" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/results" element={<FilterResults />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
