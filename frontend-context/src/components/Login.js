import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import authContext from '../context/Authentication/authContext';

const Login = () => {
    const {login, validationError} = useContext(authContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async(e)=>{
        e.preventDefault()
        login(email,password)  
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
            <h3>Login here</h3>
            <p>Dont have any account? <span> <Link aria-current="page" to="/register">Click here</Link> </span></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={e=>setEmail(e.target.value)}/>
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

export default Login