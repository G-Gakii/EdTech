import React from "react";
import RegisterUser from "./components/auth/RegisterUser";
import LoginUser from "./components/auth/LoginUser";

const App = () => {
  return (
    <div>
      <RegisterUser />
      <LoginUser />
    </div>
  );
};

export default App;
