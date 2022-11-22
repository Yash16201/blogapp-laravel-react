import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { RootState, AppDispatch } from "../store";
import { addBlog } from "../slices/blog";

const AddBlog = () => {
    const user:any = sessionStorage.getItem('user');
    const navigate = useNavigate();
    const [Title, setTitle] =useState<string>("");;
    const [Description, setDescription] =useState<string>("");;
    const [Image, setImage] =useState<any>();;
    const [Visiblefrom, setVisiblefrom] =useState<string>("");;
    const [Visibleto, setVisibleto] =useState<string>("");;
    const dispatch = useDispatch<AppDispatch>();
    const message  = useSelector((state: RootState) => state.message);
  
    const handleSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const data = new FormData();
      data.append('id', user);
      data.append('title', Title);
      data.append('description', Description);
      data.append('image',Image);
      data.append('visiblefrom', Visiblefrom);
      data.append('visibleto', Visibleto);
      dispatch(addBlog(data)).then(()=>{
        navigate("/");
      });
    }
    return (
      <div className='container mt-5'> 
      <h3>Add New Blog</h3>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" onChange={e=>setTitle(e.target.value)} />
              {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['title'] ? value['title'] : ""}</p> 
                        ))  
              )) }
          </div>
          <div className="mb-3">
              <label htmlFor="title" className="form-label">Description</label>
              <textarea name="description" className="form-control" rows={5} cols={137} onChange={e=>setDescription(e.target.value)}></textarea>
              {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['description'] ? value['description'] : ""}</p> 
                        ))  
              )) }
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" className="form-control" onChange={(e:any)=>setImage(e.target.files[0])}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['image'] ? value['image'] : ""}</p> 
                        ))  
            )) }
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visible_from">Visible From</label>
            <input type="date" name="visible_from" id="inputdate" className="form-control" onChange={e=>setVisiblefrom(e.target.value)}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['visible_from'] ? value['visible_from'] : ""}</p> 
                        ))  
            )) }
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visible_to">Visible To</label>
            <input type="date" name="visible_to" id="inputdate" className="form-control" onChange={e=>setVisibleto(e.target.value)}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['visible_to'] ? value['visible_to'] : ""}</p> 
                        ))  
            )) }
          </div>
  
          <input type="submit" name="submit" className="btn btn-primary my-3 form-control"></input>
      </form>
  
      </div>
    )
  }
  
  export default AddBlog

