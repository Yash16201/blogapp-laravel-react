import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function ConnApi(){
    const navigate = useNavigate();
    

    const getToken = () =>{
        const tokenstring = sessionStorage.getItem('token');
        const usertoken = JSON.parse(tokenstring);
        return usertoken;
    }

    const getUser = () =>{
        const userstring = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userstring);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);

        navigate('/');
    }

    const logout = () =>{
        sessionStorage.clear();
        navigate('/login');
    }


    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer `+token
        }
    });

    const httpimg = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "multipart/form-data",
            "Authorization" : `Bearer `+token
        }
    });
    return{
        setToken:saveToken,
        token,
        user,
        logout,
        getToken,
        httpimg,
        http
    }
}