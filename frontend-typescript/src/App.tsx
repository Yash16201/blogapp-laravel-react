import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import Guest from "./components/Guest";
import Home from './components/Home';
import Navbar from './components/Navbar';
import logo from './logo.svg';

function App() {
  const user = localStorage.getItem('user') || null;
  
  return (
    <div>

      {
        user !== null || user !== "" && <div>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
      }
      {
        user == null || user == ""  && <div>
          <Guest/>
        </div>
      }
    
      {/* <Navbar/>
        <Routes>
             <Route path='/' element={<Home/>}/>
        </Routes>  */}

    </div>
  );
}

export default App;
