import React , {useContext, useEffect}from "react";
import blogContext from '../context/Blogs/blogContext';
import { useParams } from 'react-router-dom';



const ViewBlog = () => {
    const {fetchBlogById, Blog} = useContext(blogContext);
    const { id } = useParams();

    useEffect(() => {
      fetchBlogById(id);
      // eslint-disable-next-line
    },[])

    return (
        <div className="container">
            {
                Blog.length > 0 && (
                    Blog.map((row, key)=>(
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

export default ViewBlog;