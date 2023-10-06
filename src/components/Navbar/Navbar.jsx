import { React, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search-solid.svg";
import Avtar from "../Avtar/Avtar";
import "./Navbar.css";
import decode from "jwt-decode";
import { setCurrentUser } from "../../actions/currentUser.js";

export default function Navbar() {
  const dispatch = useDispatch();
  var currentUser = useSelector((state) => state.currentUserReducer);
  
  const users = useSelector((state) => state.usersReducer);
  const profile = users?.filter((user) => user._id === currentUser?.result?._id)[0];

  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = currentUser?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch, currentUser?.token, handleLogout]);

  return (
    <div>
      <nav className="main-nav">
        <div className="navbar">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn">
            About
          </Link>
          <Link to="/" className="nav-item nav-btn">
            Products
          </Link>
          <Link to="/" className="nav-item nav-btn">
            For Teams
          </Link>
          <form onSubmit={(e) => e.preventDefault(0)}>
            <input type="text" placeholder="Search..." />
            <img
              src={search_icon}
              alt="search_icon"
              width="18"
              className="search-icon"
            />
          </form>
          {currentUser === null ? (
            <Link to="/auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Link
                to={`/users/${currentUser.result?._id}`}
                style={{ textDecoration: "none" }}
              >
                {profile?.profileImage ? (
                  <Avtar px="0px" py="0px" borderRadius="50%">
                    <img style={{ borderRadius: "50%" }}
                      src={profile?.profileImage}
                      alt="DP"
                      width="40px"
                      height="40px"
                    />
                  </Avtar>
                ) : (
                  <div width="40px" height="40px">
                    <Avtar
                    backgroundColor="#009dff"
                    px="11px"
                    py="6px"
                    borderRadius="50%"
                    color="white"
                  >
                    {profile?.name?.charAt(0).toUpperCase()}
                  </Avtar>
                  </div>
                )}
              </Link>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
