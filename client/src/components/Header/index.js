import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/authenticate";
const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Quake Power</h1>
        </Link>

        <nav className="text-center">
          {/* conditional render if logged in or not */}
          {Auth.loggedIn() ? (
            <>
              <Link to="/myprofile">My Profile</Link>
              <a href="/">Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
