import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchblogbyid } from "../actions/blog";

import moment from "moment";
import EditBlogForm from './EditBlogForm';


const EditBlog = () => {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const { single_blog } = useSelector(state => state.blog);
  useEffect(() => {
    dispatch(fetchblogbyid(id))
  },[])

  return (
    <div className='container mt-5'>
        {
            single_blog.length > 0 && (
                single_blog.map((row, key)=>(
                    <div className='container mt-5' key={row.id}>
                        <EditBlogForm title={single_blog[0].blog_title} description={single_blog[0].detail['post_text']} Visible_From={moment(single_blog[0].detail['visible_from']).format('Y-M-DD')} Visible_To={moment(single_blog[0].detail['visible_to']).format('Y-M-DD')} blog_id={id}/>
                    </div>
                ))
            )
        } 
    </div>
  )
}

export default EditBlog
