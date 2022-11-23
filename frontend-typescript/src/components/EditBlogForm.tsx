import React, {useState} from 'react'
import { RootState, AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { editBlog } from "../slices/blog";
import { useNavigate } from "react-router-dom";

const EditBlogForm = (props:any) => {
    const navigate = useNavigate();
    const [Title, setTitle] = useState<string>(props.title);
    const [Description, setDescription] = useState<string>(props.description);
    const [Image, setImage] = useState<any>();
    const [Visiblefrom, setVisiblefrom] = useState<string>(props.Visible_From);
    const [Visibleto, setVisibleto] = useState<string>(props.Visible_To);
    const user:any = sessionStorage.getItem('user');
    const dispatch = useDispatch<AppDispatch>();
    const message = useSelector((state: RootState) => state.message);
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        console.log(Title);
        const data = new FormData();
        data.append('id', user);
        data.append('blog',props.blog_id);
        data.append('title', Title);
        data.append('description', Description);
        data.append('image',Image);
        data.append('visiblefrom', Visiblefrom);
        data.append('visibleto', Visibleto);
        dispatch(editBlog(data)).then(() => {
            navigate('/');
            window.location.reload();
        })
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        
        <h3>Edit Blog</h3>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={Title} onChange={e=>setTitle(e.target.value)} />
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['title'] ? value['title'] : ""}</p> 
                        ))  
            )) }
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Description</label>
            <textarea name="description" className="form-control" rows={5} cols={137} value={Description} onChange={e=>setDescription(e.target.value)} >   </textarea>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['description'] ? value['description'] : ""}</p> 
                        ))  
            )) }
        </div>
        <div className="form-group mb-3">
            <label htmlFor="image">Image</label>
            <input type="file" name="image" className="form-control"  onChange={(e:any)=>setImage(e.target.files[0])}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['image'] ? value['image'] : ""}</p> 
                        ))  
            )) }
        </div>
        <div className="form-group mb-3">
            <label htmlFor="visible_from">Visible From</label>
            <input type="date" name="visible_from" id="inputdate" className="form-control" value={Visiblefrom} onChange={e=>setVisiblefrom(e.target.value)}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['visible_from'] ? value['visible_from'] : ""}</p> 
                        ))  
            )) }
        </div>
        <div className="form-group mb-3">
            <label htmlFor="visible_to">Visible To</label>
            <input type="date" name="visible_to" id="inputdate" className="form-control" value={Visibleto} onChange={e=>setVisibleto(e.target.value)}/>
            {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['visible_to'] ? value['visible_to'] : ""}</p> 
                        ))  
            )) }    
        </div>
        <input type="submit" name="submit" className="btn btn-primary my-3 form-control"></input>
    </form>
    </div>
  )
}

export default EditBlogForm