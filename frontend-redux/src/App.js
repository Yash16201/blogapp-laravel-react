import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Guest from './components/Guest';
import Navbar from "./components/Navbar";
import AddBlog from "./components/AddBlog";
import ViewBlog from "./components/ViewBlog";
import EditBlog from "./components/EditBlog";

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
