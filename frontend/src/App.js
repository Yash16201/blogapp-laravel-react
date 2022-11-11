import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Guest from "./components/Guest";
import ConnApi from "./components/ConnApi";
import AddBlog from "./components/AddBlog";
import ViewBlog from "./components/ViewBlog";
import EditBlog from "./components/EditBlog";
function App() {
  const { getToken } = ConnApi();
  if(!getToken()){
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
            <Route path='/logout' element={<Home/>}/> 
      </Routes>
    </div>
  );
}

export default App;
