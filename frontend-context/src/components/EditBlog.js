import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import blogContext from '../context/Blogs/blogContext';
import moment from "moment";
import EditBlogForm from './EditBlogForm';



const EditBlog = () => {
  const {fetchBlogById, Blog} = useContext(blogContext);
  const { id } = useParams();
  
  useEffect(()=>{
    fetchBlogById(id);
    // eslint-disable-next-line
  },[]);

  return (
    <div className='container mt-5'>
        {
            Blog.length > 0 && (
                Blog.map((row, key)=>(
                    <div className='container mt-5' key={row.id}>
                        <EditBlogForm title={Blog[0].blog_title} description={Blog[0].detail['post_text']} Visible_From={moment(Blog[0].detail['visible_from']).format('Y-M-DD')} Visible_To={moment(Blog[0].detail['visible_to']).format('Y-M-DD')} blog_id={id}/>
                    </div>
                ))
            )
        } 
    </div>
  )
}

export default EditBlog