import {React, useEffect,useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
import search_icon from "../../assets/search-solid.svg"
import Avtar from "../Avtar/Avtar";
import "./Navbar.css";
import decode from "jwt-decode"
import {setCurrentUser} from "../../actions/currentUser.js"

export default function Navbar() {
  const dispatch=useDispatch()
  var User=useSelector((state)=>(state.currentUserReducer))
  
  const navigate=useNavigate();
  const handleLogout= useCallback(()=>{
    dispatch({type:'LOGOUT'})
    navigate("/")
    dispatch(setCurrentUser(null));
  },[dispatch,navigate])  
  
  useEffect(()=>{
    const token=User?.token
    if(token){
      const decodedToken=decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch,User,handleLogout])

  return (
    <div>
      <nav className="main-nav">
        <div className="navbar">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="nav-item nav-btn">About</Link>
          <Link to="/" className="nav-item nav-btn">Products</Link>
          <Link to="/" className="nav-item nav-btn">For Teams</Link>
          <form onSubmit={(e)=>e.preventDefault(0)}>
            <input type="text" placeholder="Search..." />
            <img src={search_icon} alt="search_icon" width="18" className="search-icon"/>
          </form>
          {
            User===null?
              <Link to="/auth" className="nav-item nav-links">Log in</Link>:
              <>
                <Link to={`/users/${User.result._id}`} style={{textDecoration: "none"}}>
                  <Avtar backgroundColor='#009dff' px='11px' py='6px' borderRadius='50%' color='white'>
                    {User.result.name.charAt(0).toUpperCase()}
                  </Avtar>
                </Link>
                <button className="nav-item nav-links" onClick={handleLogout}>Log out</button>
              </>
          }
        </div>
      </nav>
    </div>
  );
}
