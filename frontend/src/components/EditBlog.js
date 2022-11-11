import React, {useEffect, useState} from 'react'
import ConnApi from "./ConnApi";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from "react-router-dom"
import moment from "moment";
import Swal from 'sweetalert2';
function EditBlog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { http, user } = ConnApi();
    const [Blogs , setBlogs] = useState([]);
    const [Title, setTitle] = useState();
    const [Description, setDescription] = useState();
    const [Image, setImage] = useState();
    const [Visiblefrom, setVisiblefrom] = useState();
    const [Visibleto, setVisibleto] = useState();
    const [validationError,setValidationError] = useState({});

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = new FormData();
        data.append('id', user.id);
        data.append('blog',id);
        data.append('title', Title);
        data.append('description', Description);
        data.append('image',Image);
        data.append('visiblefrom', Visiblefrom);
        data.append('visibleto', Visibleto);
        Axios.post('http://localhost:8000/api/editblog',data).then((res)=>{
            navigate('/');
        }).catch(({response})=>{
            if(response.status===422){
              setValidationError(response.data.errors)
            }else{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
            }
          });
        
      }
    useEffect(()=>{
        fetchBlog() 
    },[]);
    const fetchBlog = async () => {
        http.post('/viewblog',{id:user.id,blog:id}).then((res)=>{ 
            setBlogs(res.data);
            setTitle(res.data[0].blog_title);
            setDescription(res.data[0].detail['post_text']);
            setVisiblefrom(moment(res.data[0].detail['visible_from']).format('Y-M-DD'));
            setVisibleto(moment(res.data[0].detail['visible_to']).format('Y-M-DD'));
        }).catch(({response})=>{
            Swal.fire({
            text:response.data.message,
            icon:"error"
            })
          });
    }
  return (
    <div className='container mt-5'>
        {
            Object.keys(validationError).length > 0 && (
            <div className="row">
                <div className="col-12">
                <div className="alert alert-danger">
                    <ul className="mb-0">
                    {
                        Object.entries(validationError).map(([key, value])=>(
                        <li key={key}>{value}</li>   
                        ))
                    }
                    </ul>
                </div>
                </div>
            </div>
            )
        }
        {
            Blogs.length > 0 && (
                Blogs.map((row, key)=>(
                    <div key={row.id}>
                        <h3>Edit Blog</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" value={Title} onChange={e=>setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Description</label>
                                <textarea name="description" className="form-control" rows="5" cols="137" onChange={e=>setDescription(e.target.value)} value={Description}>  </textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" className="form-control"  onChange={e=>setImage(e.target.files[0])}/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="visible_from">Visible From</label>
                                <input type="date" name="visible_from" id="inputdate" className="form-control" value={Visiblefrom} onChange={e=>setVisiblefrom(e.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="visible_to">Visible To</label>
                                <input type="date" name="visible_to" id="inputdate" className="form-control" value={Visibleto} onChange={e=>setVisibleto(e.target.value)}/>
                            </div>
                            <input type="submit" name="submit" className="btn btn-primary my-3 form-control"></input>
                        </form>
                    </div>
                ))
            )
        }
    </div>
  )
}

export default EditBlog