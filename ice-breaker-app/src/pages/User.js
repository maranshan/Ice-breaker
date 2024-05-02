import React from "react";
import ReactDOM from "react-dom";

const userInfo = {
  email: "user@example.com",
};

ReactDOM.render(
  <UserDisplay user={userInfo} />,
  document.getElementById("root")
);
