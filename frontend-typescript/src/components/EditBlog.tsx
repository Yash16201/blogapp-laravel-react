import React, {useEffect} from 'react'
import { RootState, AppDispatch } from "../store";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchblogbyid } from "../slices/blog";
import moment from "moment";
import EditBlogForm from './EditBlogForm';


const EditBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams(); 
  const blog:any  = useSelector((state: RootState) => state.blog.singleBlog);
  useEffect(() => {
    dispatch(fetchblogbyid(id))
    console.log(blog);
    
    // eslint-disable-next-line
  },[])
  return (
    <div className='container mt-5'>
    {
        blog.length > 0 && (
            blog.map((row:any, key:any)=>(
                <div className='container mt-5' key={row.id}>
                    <EditBlogForm title={row.blog_title} description={row['detail'].post_text} Visible_From={moment(row['detail'].visible_from).format('Y-M-DD')} Visible_To={moment(row['detail'].visible_to).format('Y-M-DD')} blog_id={id}/>
                </div>
            ))
        )
    } 
    </div>
  )
}

export default EditBlog