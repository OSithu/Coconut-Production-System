import React from "react";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <div className="App">
      <h1>Welcome to coconut production!</h1>
      <div>
        <Link to={`/login`}>
          <button>SignIN</button>
        </Link>

        <Link to={`/addCus`}>
          <button>SignUP</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
