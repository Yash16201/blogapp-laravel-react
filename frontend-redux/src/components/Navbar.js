import React from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from "../actions/auth";


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = ()=>{
          dispatch(logoutUser())
          navigate("/");
          window.location.reload(); 
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BlogApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <span className="nav-link" onClick={logout}>Logout</span>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
    </div>
    
  )
}
export default Navbar;
