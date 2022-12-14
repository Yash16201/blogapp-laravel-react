import {useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate';
import { RootState, AppDispatch } from "../store";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchblogs, search, delblog } from "../slices/blog";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blog:any  = useSelector((state: RootState) => state.blog);

  const [Search, setSearch] =useState<string>();
  const [PageNumber, setPageNumber] = useState<number>(0);
  const BlogsPerPage:number = 4;
  const pagevisited:number = PageNumber  * BlogsPerPage;

  useEffect(() => {
    dispatch(fetchblogs())
    // eslint-disable-next-line
  },[])

  const pageCount:any = Math.ceil(blog.blog.length / BlogsPerPage);

  const handleDelete = async (id:any) => {
    dispatch(delblog({id}));
    dispatch(fetchblogs());
  }

  const handlelivesearch = () => {
    dispatch(search(Search? Search : ""))
  }

  const changePage = ({selected}:any) =>{
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
                blog.blog.length > 0 && (
                  blog.blog.slice(pagevisited, pagevisited + BlogsPerPage).map((row:any, key:any)=>(
                        <tr key={row.id}>
                            <td>{row.blog_title}</td>
                            <td>{row['detail'].post_text}</td>
                            <td>
                                <Link className="btn btn-success" to={`/viewblog/${row.id}`} role="button">View </Link>
                                <Link className="btn btn-primary mx-2" to={`/editblog/${row.id}`} role="button">Edit</Link> 
                                {/* <a className="btn btn-primary mx-2" onClick={()=>handleEdit(row.id)} role="button">Delete</a> */}
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