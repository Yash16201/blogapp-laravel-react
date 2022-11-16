import "bootstrap/dist/css/bootstrap.min.css";
import Guest from "./components/Guest";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddBlog from "./components/AddBlog";
import ViewBlog from "./components/ViewBlog";
import EditBlog from "./components/EditBlog";
import './App.css';

const App = () => {
  if(!sessionStorage.getItem('token')){
    return <Guest/>;
  }
  return (
    <div>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/addblog' element={<AddBlog/>}/>  
            <Route path='/viewblog/:id' element={<ViewBlog/>}/> 
            <Route path='/editblog/:id' element={<EditBlog/>}/>  
        </Routes>
    </div>  
  );
}

export default App;
