import axios from "axios";


const register = async (name,email,password,gender) => {
    return axios.post('http://localhost:8000/api/register',{name:name,email:email,gender:gender,password:password})
}

const login = async (email,password) => {
    return axios.post('http://localhost:8000/api/login',{email:email,password:password}).then((res)=>{
        // setToken(res.data.user, res.data.access_token);
        if (res.data.access_token) {
            sessionStorage.setItem('token',res.data.access_token);
            sessionStorage.setItem('user',JSON.stringify(res.data.user));
        }
        return res.data;
    })  
}

const logoutUser = () =>{
    sessionStorage.clear();
}

const AuthService = {
    register,
    login,
    logoutUser
}

export default AuthService;
