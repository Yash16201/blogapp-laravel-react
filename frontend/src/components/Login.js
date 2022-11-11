import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import ConnApi from './ConnApi';
import Swal from 'sweetalert2';

function Login() {
  const {http, setToken} = ConnApi();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [validationError,setValidationError] = useState({});

  
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
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
  return (
    <div className="container mt-5">
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
        <h3>Login here</h3>
        <p>Dont have any account? <span> <Link aria-current="page" to="/signup">Click here</Link> </span></p>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1"  onChange={e=>setEmail(e.target.value)}/>
                

            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)}/>
                
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login