import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from "../store";
import { login } from "../slices/auth";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const  message = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        
        dispatch(login(data))
        .unwrap()
        .then(() => {  
            navigate("/");
        })
        .catch(() => {
            console.log('Something Went Wrong');
        });
    }
    
    return (
        <div className='container mt-5'>
            <h3>Login here</h3>
            <p>Dont have any account? <span> <Link aria-current="page" to="/register">Click here</Link> </span></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['email'] ? value['email'] : ""}</p> 
                        ))  
                    )) }
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger' key={key}>{value['password'] ? value['password'] : ""}</p> 
                        ))  
                    )) }
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login