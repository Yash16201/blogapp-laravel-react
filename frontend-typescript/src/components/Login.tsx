import React, { useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
// import { login } from "../slices/auth";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const { message } = useSelector(state => state.message);
    // const dispatch = useDispatch();

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        // dispatch(login({email, password}))
        // .unwrap()
        // .then(() => {
        //     navigate("/");
        //     window.location.reload(); 
        // })
        // .catch(() => {
        //     console.log('error');
        // });
    }
    return (
        <div className='container mt-5'>
            <h3>Login here</h3>
            <p>Dont have any account? <span> <Link aria-current="page" to="/register">Click here</Link> </span></p>
            <form onSubmit={handleSubmit}>
                {/* {
                    message &&(Object.keys(message).length > 0 && (
                    <div className="row">
                        <div className="col-12">
                        <div className="alert alert-danger">
                            <ul className="mb-0">
                            {
                                Object.entries(message).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                                ))
                            }
                            </ul>
                        </div>
                        </div>
                    </div>
                    ))
                } */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login