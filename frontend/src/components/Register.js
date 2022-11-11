import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ConnApi from './ConnApi';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

function Register() {
    const navigate = useNavigate();
    const {http} = ConnApi();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [password, setPassword] = useState();
    const [validationError,setValidationError] = useState({});
    const handleSubmit = async(e)=>{
        e.preventDefault()
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
  return (
    <div className='container mt-5'>
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
        <h3>Register here</h3>
        <p>Already have an account? <span> <Link aria-current="page" to="/login">Click here</Link> </span></p>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input className="form-check-input mx-2" type="radio" name="gender" value="Male" onChange={e=>setGender(e.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Male
                </label>
                <input className="form-check-input mx-2" type="radio" name="gender" value="Female" onChange={e=>setGender(e.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Female
                </label>
                <input className="form-check-input mx-2" type="radio" name="gender" value="Other" onChange={e=>setGender(e.target.value)}/>
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Other
                </label>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default Register