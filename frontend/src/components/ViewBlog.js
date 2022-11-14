import React, {useEffect, useState} from 'react'
import ConnApi from "./ConnApi";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function ViewBlog() {
    const { id } = useParams();
    const { http, user } = ConnApi();
    const [Blogs , setBlogs] = useState([]);
    useEffect(()=>{
        fetchBlog()
        // eslint-disable-next-line 
    },[]);
    const fetchBlog = async () => {
        http.post('/viewblog',{id:user.id,blog:id}).then((res)=>{ 
            setBlogs(res.data);
        }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
        });
    }
  return (
    <div className="container">
        {
            Blogs.length > 0 && (
                Blogs.map((row, key)=>(
                    <div key={row.id}>
                        <b>Title :- </b> {row.blog_title} <br></br>
                        <b>Description :- </b> {row['detail'].post_text} <br></br>
                        <b>Image :- </b> <br></br>
                            <img src={`http://localhost:8000/public/image/${row['detail'].blog_attachment_1}`} alt="Blogimg" className="img-fluid"/>


                    </div>
                ))
            )
        }
    </div>
  )
}

export default ViewBlog