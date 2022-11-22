import axios from "axios";

const  user:any  = sessionStorage.getItem('user');

const addBlog = async (data:any) => {
    return await axios.post('http://localhost:8000/api/postblog',data)
}

const editblog = async (data:any) => {
    return await axios.post('http://localhost:8000/api/editblog',data)
}

const fetchBlogs = async () =>{
    return await axios.post('http://localhost:8000/api/myblogs',{id:user.id}).then((res)=>{  
        return res.data;
    })
}

const fetchBlogById = async (id:string|number) =>{
    return await axios.post('http://localhost:8000/api/viewblog',{id:user.id,blog:id}).then((res)=>{ 
        return res.data
    })
}

const livesearch = async (Search:string) =>{
    return await axios.post('http://localhost:8000/api/searchlive',{id:user.id,name:Search}).then((res)=>{
        return res.data
    })
}

const deleteblog = async (id:string|number) => {
    return await axios.post('http://localhost:8000/api/deleteblog',{id:user.id,blog:id})
}

const BlogService = {
    addBlog, editblog ,fetchBlogs , fetchBlogById , livesearch, deleteblog
}

export default BlogService;

