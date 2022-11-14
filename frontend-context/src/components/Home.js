import React , {useContext, useEffect, useState}from "react";
import { Link } from 'react-router-dom';
import blogContext from '../context/Blogs/blogContext';
import ReactPaginate from 'react-paginate';


const Home = () => {
    const {fetchBlogs, Blogs, livesearch , deleteblog} = useContext(blogContext);
    const [Search, setSearch] =useState();
    const [PageNumber, setPageNumber] = useState(0);
    const BlogsPerPage = 4;
    const pagevisited = PageNumber  * BlogsPerPage;

    useEffect(() => {
      fetchBlogs();
      // eslint-disable-next-line
    },[])

    const handleDelete = async (id) => {
        deleteblog(id)
    }
  
    const handlelivesearch = () => {
        livesearch(Search)
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
                                <button className="btn btn-danger" onClick={()=>handleDelete(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                )
              }
            </tbody>
        </table> 
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
    </div>
    )
}

export default Home;