import { BLOG_ADDED, BLOG_FAILED, BLOG_EDITED, BLOG_UNEDITED, BLOG_FETCHED, BLOG_UNFETCHED, BLOG_DELETED, BLOG_UNDELETED, SINGLE_BLOG_FETCHED , SINGLE_BLOG_UNFETCHED, SET_MESSAGE } from "./type";
import BlogService from '../services/blog.service';
import Swal from 'sweetalert2';

export const addblog = (data) => (dispatch) => {
    return BlogService.addBlog(data).then(
      (response) => {
        dispatch({
          type: BLOG_ADDED,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        if(error.response.status===422){
          const message = error.response.data.errors 
  
          dispatch({
            type: BLOG_FAILED,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }else{
          Swal.fire({
            text:error.response.data.message,
            icon:"error"
          })
        }
  
        return Promise.reject();
      }
    );
};

export const editblog = (data) => (dispatch) => {
    return BlogService.editblog(data).then(
      (response) => {
        dispatch({
          type: BLOG_EDITED,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        if(error.response.status===422){
          const message = error.response.data.errors 
  
          dispatch({
            type: BLOG_UNEDITED,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
        }else{
          Swal.fire({
            text:error.response.data.message,
            icon:"error"
          })
        }
  
        return Promise.reject();
      }
    );
};

export const fetchblogs = () => (dispatch) => {
    return BlogService.fetchBlogs().then(
      (response) => {
        dispatch({
          type: BLOG_FETCHED,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        
        Swal.fire({
        text:error.response.data.message,
        icon:"error"
        })
        dispatch({
            type: BLOG_UNFETCHED,
        });
    
        return Promise.reject();
      }
    );
};

export const fetchblogbyid = (id) => (dispatch) => {
    return BlogService.fetchBlogById(id).then(
      (response) => {
        dispatch({
          type: SINGLE_BLOG_FETCHED,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        
        Swal.fire({
        text:error.response.data.message,
        icon:"error"
        })
        dispatch({
            type: SINGLE_BLOG_UNFETCHED,
        });
    
        return Promise.reject();
      }
    );
};

export const search = (Search) => (dispatch) => {
    return BlogService.livesearch(Search).then(
      (response) => {
        dispatch({
          type: BLOG_FETCHED,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        
        Swal.fire({
        text:error.response.data.message,
        icon:"error"
        })
        dispatch({
            type: BLOG_UNFETCHED,
        });
    
        return Promise.reject();
      }
    );
};


export const delblog = (id) => (dispatch) => {
    return BlogService.deleteblog(id).then(
      (response) => {
        dispatch({
          type: BLOG_DELETED,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data,
        });
  
        return Promise.resolve();
      },
      (error) => { 
        
        Swal.fire({
        text:error.response.data.message,
        icon:"error"
        })
        dispatch({
            type: BLOG_UNDELETED,
        });
    
        return Promise.reject();
      }
    );
};
