import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom";
import ConnApi from "./context/ConnApi";
import Home from "./components/Home";
import Guest from "./components/Guest";
import BlogState from "./context/Blogs/BlogState";
import AddBlog from "./components/AddBlog";
import ViewBlog from "./components/ViewBlog";
import EditBlog from "./components/EditBlog";

function App() {
  const { getToken } = ConnApi();
  if(!getToken()){
    return <Guest/>;
  }
  return (
    <div >
      <BlogState>
      <Navbar/>
      <Routes>
            <Route path='/' element={<Home/>}/> 
            <Route path='/addblog' element={<AddBlog/>}/> 
            <Route path='/editblog/:id' element={<EditBlog/>}/> 
            <Route path='/viewblog/:id' element={<ViewBlog/>}/>
      </Routes>
      </BlogState>
    </div>
  );
}

export default App;
