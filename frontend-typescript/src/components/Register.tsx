import  React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from "../store";
import { register } from "../slices/auth";


const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const  message = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('gender', gender);
        data.append('password', password);
        dispatch(register(data))
            .unwrap()
            .then(() => {
            navigate("/login");
            window.location.reload();
        })
        .catch(() => {
            console.log('error');
        });
    }
    return ( 
        <div className='container mt-5'>
            <h3>Register here</h3>
            <p>Already have an account? <span> <Link aria-current="page" to="/login">Click here</Link> </span></p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={e=>setName(e.target.value)} />
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['name'] ? value['name'] : ""}</p> 
                        ))  
                    )) }
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" onChange={e=>setEmail(e.target.value)}/>
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['email'] ? value['email'] : ""}</p> 
                        ))  
                    )) }
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
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['gender'] ? value['gender'] : ""}</p> 
                        ))  
                    )) }
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)}/>
                    {message &&(Object.keys(message).length > 0 && (
                        Object.entries(message).map(([key, value]:any)=>(
                            <p className='text-danger'>{value['password'] ? value['password'] : ""}</p> 
                        ))  
                    )) }
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register