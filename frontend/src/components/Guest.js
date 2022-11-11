import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Link } from 'react-router-dom';
import GuestHome from "./GuestHome";
function Guest() {
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
                         <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
      <Routes>
            <Route path='/' element={<GuestHome/>}/> 
            <Route path='/login' element={<Login/>}/> 
            <Route path='/signup' element={<Register/>}/> 
      </Routes>
    </div>
  );
}

export default Guest;
