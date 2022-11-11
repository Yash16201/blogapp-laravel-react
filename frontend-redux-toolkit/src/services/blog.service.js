import axios from "axios";

const  user  = JSON.parse(sessionStorage.getItem('user'));

const addBlog = async (data) => {
    return await axios.post('http://localhost:8000/api/postblog',data)
}

const editblog = async (data) => {
    return await axios.post('http://localhost:8000/api/editblog',data)
}

const fetchBlogs = async () =>{
    return await axios.post('http://localhost:8000/api/myblogs',{id:user.id}).then((res)=>{  
        return res.data;
    })
}

const fetchBlogById = async (id) =>{
    return await axios.post('http://localhost:8000/api/viewblog',{id:user.id,blog:id}).then((res)=>{ 
        return res.data
    })
}

const livesearch = async (Search) =>{
    return await axios.post('http://localhost:8000/api/searchlive',{id:user.id,name:Search}).then((res)=>{
        return res.data
    })
}

const deleteblog = async (id) => {
    return await axios.post('http://localhost:8000/api/deleteblog',{id:user.id,blog:id})
}

export default {
    addBlog, editblog ,fetchBlogs , fetchBlogById , livesearch, deleteblog
};
