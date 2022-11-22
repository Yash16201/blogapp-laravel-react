import React, {useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
import { RootState, AppDispatch } from "../store";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchblogbyid } from "../slices/blog";

const ViewBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const blog:any  = useSelector((state: RootState) => state.blog);
  useEffect(() => {
    dispatch(fetchblogbyid(id))
  },[])
  return (
    <div className="container">
            {
                blog.single_blog.length > 0 && (
                    blog.single_blog.map((row:any, key:any)=>(
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