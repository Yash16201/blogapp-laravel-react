import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchblogbyid } from "../actions/blog";

const ViewBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { single_blog } = useSelector(state => state.blog);
  useEffect(() => {
    dispatch(fetchblogbyid(id))
  },[])
  
  return (
    <div className="container">
            {
                single_blog.length > 0 && (
                    single_blog.map((row, key)=>(
                        <div key={row.id}>
                            <b>Title :- </b> {row.blog_title} <br></br>
                            <b>Description :- </b> {row['detail'].post_text} <br></br>
                            <b>Image :- </b> <br></br>
                                <img src={`http://localhost:8000/public/image/${row['detail'].blog_attachment_1}`} alt="BlogImage" className="img-fluid"/>
                        </div>
                    ))
                )
            }
        </div>
  )
}

export default ViewBlog