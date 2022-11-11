import React , {useState} from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom"
import ConnApi from "../ConnApi";
import Swal from 'sweetalert2';
const AuthState = (props) =>{
    const navigate = useNavigate();
    const [validationError,setValidationError] = useState({});
   
    const {http, setToken} = ConnApi();

    const register = async (name,email,password,gender) => {
        http.post('/register',{name:name,email:email,gender:gender,password:password}).then((res)=>{
            navigate('/login');
        }).catch(({response})=>{
            if(response.status===422){
              setValidationError(response.data.errors)
            }else{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
            }
          })
    }

    const login = async (email,password) => {
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user, res.data.access_token);
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
    
    return(
        <AuthContext.Provider value={{register, validationError, login}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;