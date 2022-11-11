import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import ConnApi from "./ConnApi";
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

function Home() {
  const { http, user } = ConnApi();
  const [Blogs , setBlogs] = useState([]);
  const [Search, setSearch] =useState();
  const [PageNumber, setPageNumber] = useState(0);
  const BlogsPerPage = 4;
  const pagevisited = PageNumber  * BlogsPerPage;


  useEffect(()=>{
    fetchBlogs() 
  },[]);
  const fetchBlogs = async () => {
    http.post('/myblogs',{id:user.id}).then((res)=>{  
      setBlogs(res.data);
      
    }).catch(({response})=>{
      Swal.fire({
      text:response.data.message,
      icon:"error"
      })
  });
  }
  const handleDelete = async (id) => {
    http.post('/deleteblog',{id:user.id,blog:id}).then((res)=>{  
      fetchBlogs() 
    }).catch(({response})=>{
      Swal.fire({
      text:response.data.message,
      icon:"error"
      })
  });
  }
  const handlelivesearch = () => {
    http.post('/searchlive',{id:user.id,name:Search}).then((res)=>{  
      setBlogs(res.data);
    }).catch(({response})=>{
      Swal.fire({
      text:response.data.message,
      icon:"error"
      })
  });
  }
  const pageCount = Math.ceil(Blogs.length / BlogsPerPage);

  const changePage = ({selected}) =>{
    setPageNumber(selected);
  }
  return (
    
    <div className="container">
        <h1>My Blogs</h1>
        <div className="row my-5">
          <div className="col-md-10">
            <input type="search" className="form-control" placeholder="Search Here" onKeyUp={handlelivesearch} onChange={(e=>setSearch(e.target.value))}  name="search" id="search"/>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary float-end" to="/addblog" role="button"> Add New </Link>
          </div>
        </div>
        
        <table className="table mt-5">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              {
                Blogs.length > 0 && (
                  Blogs.slice(pagevisited, pagevisited + BlogsPerPage).map((row, key)=>(
                        <tr key={row.id}>
                            <td>{row.blog_title}</td>
                            <td>{row['detail'].post_text}</td>
                            <td>
                                <Link className="btn btn-success" to={`/viewblog/${row.id}`} role="button">View </Link>
                                <Link className="btn btn-primary mx-2" to={`/editblog/${row.id}`} role="button">Edit</Link> 
                                <a className="btn btn-danger" onClick={()=>handleDelete(row.id)} role="button">Delete</a>
                            </td>
                        </tr>
                    ))
                )
              }
              <ReactPaginate
              
              previousAriaLabel='Previous'
              nextLabel='Next'
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination mt-2"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              disabledClassName={"page-item disabled"}
              activeClassName={"page-item active"}

              />
            </tbody>
        </table> 
    </div>
  )
}

export default Home