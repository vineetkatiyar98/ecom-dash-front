import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="navcont">
      <div className="subnavcont">
        {auth ? (
          <div className="unli">
            <Link className="listlinks" to="/">
              😀
            </Link>
            <Link className="listlinks" to="/add">
              😍
            </Link>

            <Link className="listlinks" to="/update">
              😇
            </Link>

            <Link className="listlinks" onClick={logout} to="/signup">
              😔
              {JSON.parse(auth).name}
            </Link>
          </div>
        ) : (
          <div className="ulli">
            <Link className="listlinks" to="/signup">
              Signup
            </Link>

            <Link className="listlinks" to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
