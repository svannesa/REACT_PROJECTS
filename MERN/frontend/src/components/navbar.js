import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]); // cookies

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/auth");
    }
  }, [cookies.access_token, navigate]);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/createpat">
              Create Patient
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/updatePat">
              Modifications
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          {!cookies.access_token ? (
            <li className="nav-item">
              <Link className="nav-link" to="/auth">
                Login/Register
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};