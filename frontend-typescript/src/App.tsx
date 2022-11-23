import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import Guest from "./components/Guest";
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';
import EditBlog from './components/EditBlog';
import { RootState } from "./store";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn  = useSelector((state : RootState) => state.auth.isLoggedIn);
  return (
    <div>

      {
        isLoggedIn === true && <div>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/addblog' element={<AddBlog/>}/>  
              <Route path='/viewblog/:id' element={<ViewBlog/>}/> 
              <Route path='/editblog/:id' element={<EditBlog/>}/>  
          </Routes>
        </div>
      }
      {
        isLoggedIn === false && <div>
          <Guest/>
        </div>
      }
    

    </div>
  );
}

export default App;
