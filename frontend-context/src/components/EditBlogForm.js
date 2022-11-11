import React, {useState, useContext} from 'react'
import blogContext from '../context/Blogs/blogContext';
import ConnApi from "../context/ConnApi";

const EditBlogForm = (props) => {
    const {editblog, validationError} = useContext(blogContext);
    const [Title, setTitle] = useState(props.title);
    const [Description, setDescription] = useState(props.description);
    const [Image, setImage] = useState();
    const [Visiblefrom, setVisiblefrom] = useState(props.Visible_From);
    const [Visibleto, setVisibleto] = useState(props.Visible_To);
    const { user } = ConnApi();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(Title);
        const data = new FormData();
        data.append('id', user.id);
        data.append('blog',props.blog_id);
        data.append('title', Title);
        data.append('description', Description);
        data.append('image',Image);
        data.append('visiblefrom', Visiblefrom);
        data.append('visibleto', Visibleto);
        editblog(data)
      }
  return (
    <>
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
    <form onSubmit={handleSubmit}>
        <h3>Edit Blog</h3>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" value={Title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Description</label>
            <textarea name="description" className="form-control" rows="5" cols="137" value={Description} onChange={e=>setDescription(e.target.value)} >   </textarea>
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
    </>
  )
}

export default EditBlogForm