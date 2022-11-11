import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE} from "./type";
import AuthService from '../services/auth.service';
import Swal from 'sweetalert2';

export const register = (name, email, gender, password) => (dispatch) => {
    return AuthService.register(name, email, gender ,password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
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
            type: REGISTER_FAIL,
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
  
  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        console.log(error);
        if(error.response.status===422){
          const message = error.response.data.errors 
  
          dispatch({
            type: LOGIN_FAIL,
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
  
  export const logoutUser = () => (dispatch) => {
    AuthService.logoutUser();
    dispatch({
      type: LOGOUT,
    });
  };
  