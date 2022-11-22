import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import Guest from "./components/Guest";
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddBlog from './components/AddBlog';
import ViewBlog from './components/ViewBlog';
import EditBlog from './components/EditBlog';
import logo from './logo.svg';

function App() {
  const user:string | null = localStorage.getItem('user');
  
  return (
    <div>

      {
        user !== null || user !== "" && <div>
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
        user == null || user === ""  &&  <div>
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
