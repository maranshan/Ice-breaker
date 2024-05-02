import React from "react";
import logo from "../assets/images/image.png";
import textImg from "../assets/images/ice-breaker-header-text.png";

function Header() {
  return (
    <header className="h-36 w-full flex items-center justify-between p-4 bg-blue-200">
      <div className="flex items-center">
        <img className="h-12 w-12 ml-4" src={logo} alt="logo" />
      </div>
      <div className="flex-grow flex justify-center">
        {" "}
        <img className="h-24" src={textImg} alt="textImg" />
      </div>
      <div></div> 
    </header>
  );
}

export default Header;
