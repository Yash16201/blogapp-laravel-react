import React , {useState} from "react";
import BlogContext from "./blogContext";
import { useNavigate } from "react-router-dom"
import ConnApi from "../ConnApi";
import Swal from 'sweetalert2';
import axios from "axios";

const BlogState = (props) =>{
    const navigate = useNavigate();
    const [validationError,setValidationError] = useState({});
    const {http, user} = ConnApi();
    const [Blogs, setBlogs] = useState([]);
    const [Blog, setBlog] = useState([]);

    const addBlog = async (data) => {
        await axios.post('http://localhost:8000/api/postblog',data).then((res)=>{
            navigate('/');
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
            Swal.fire({
                text:response.data.message,
                icon:"error"
            })
            }
        });
    }

    const editblog = async (data) => {
        await axios.post('http://localhost:8000/api/editblog',data).then((res)=>{
            navigate('/');
        }).catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
            Swal.fire({
                text:response.data.message,
                icon:"error"
            })
            }
        });
    }

    const fetchBlogs = async () =>{
        await http.post('/myblogs',{id:user.id}).then((res)=>{  
            setBlogs(res.data);
          }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
        });
    }

    const fetchBlogById = async (id) =>{
        setBlog([]);
        await http.post('/viewblog',{id:user.id,blog:id}).then((res)=>{ 
            setBlog(res.data)
        }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
          });
   
    }

    const livesearch = async (Search) =>{
        http.post('/searchlive',{id:user.id,name:Search}).then((res)=>{  
            setBlogs(res.data);
          }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
        });
    }

    const deleteblog = async (id) => {
        http.post('/deleteblog',{id:user.id,blog:id}).then((res)=>{  
            fetchBlogs() 
          }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
        });
    }


    return(
        <BlogContext.Provider value={{validationError, fetchBlogs , Blogs, Blog, livesearch ,deleteblog, addBlog, editblog, fetchBlogById}}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState;