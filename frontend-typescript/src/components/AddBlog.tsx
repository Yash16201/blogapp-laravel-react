import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
// import { addBlog } from "../slices/blog";

const AddBlog = () => {
    // const  user  = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [Title, setTitle] =useState<string>("");;
    const [Description, setDescription] =useState<string>("");;
    const [Image, setImage] =useState<any>();;
    const [Visiblefrom, setVisiblefrom] =useState<string>("");;
    const [Visibleto, setVisibleto] =useState<string>("");;
    const dispatch = useDispatch();
    // const { message } = useSelector(state => state.message);
  
    const handleSubmit = async(e:React.FormEvent)=>{
      e.preventDefault();
      const data = new FormData();
      // data.append('id', user.id);
      data.append('title', Title);
      data.append('description', Description);
      data.append('image',Image);
      data.append('visiblefrom', Visiblefrom);
      data.append('visibleto', Visibleto);
      // dispatch(addBlog(data)).then(()=>{
      //   navigate("/");
      // });
    }
    return (
      <div className='container mt-5'> 
      <h3>Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        {/* {
            message &&(Object.keys(message).length > 0 && (
            <div className="row">
                <div className="col-12">
                <div className="alert alert-danger">
                    <ul className="mb-0">
                    {
                        Object.entries(message).map(([key, value])=>(
                        <li key={key}>{value}</li>   
                        ))
                    }
                    </ul>
                </div>
                </div>
            </div>
            ))
        } */}
          <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
              <label htmlFor="title" className="form-label">Description</label>
              <textarea name="description" className="form-control" rows={5} cols={137} onChange={e=>setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" className="form-control" onChange={(e:any)=>setImage(e.target.files[0])}/>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visible_from">Visible From</label>
            <input type="date" name="visible_from" id="inputdate" className="form-control" onChange={e=>setVisiblefrom(e.target.value)}/>
            
          </div>
          <div className="form-group mb-3">
            <label htmlFor="visible_to">Visible To</label>
            <input type="date" name="visible_to" id="inputdate" className="form-control" onChange={e=>setVisibleto(e.target.value)}/>
          </div>
  
          <input type="submit" name="submit" className="btn btn-primary my-3 form-control"></input>
      </form>
  
      </div>
    )
  }
  
  export default AddBlog

