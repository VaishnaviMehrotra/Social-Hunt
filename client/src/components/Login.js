import React, { useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { useSnackbar } from 'notistack';
import axios from '../utils/axios';
import '../style/Register.css'

const Login = () => {
    const {userDispatch}=useContext(UserContext);
    const history = useHistory();
    const {enqueueSnackbar}=useSnackbar();
    const [loginValue,setloginValues]=useState({
        email:"",
        password:"",
    });
    const handleSubmit=async(ev)=>{
        ev.preventDefault();
        try{
            const {data}=await axios.post("/api/user/login",loginValue);
            userDispatch({type:"LOGIN_USER",payload:data.payload});
            let accessToken=data.accessToken;
            localStorage.setItem("auth-token",accessToken);
            enqueueSnackbar("Logged in Successfully",{variant:"success"})
            history.push("/")
        }catch(err){
            console.log(err);
            enqueueSnackbar("Invalid login credentials",{variant:"error"})
        }
    }
    const handleChangeInput=(ev)=>{
        setloginValues((prev)=>({
            ...prev,[ev.target.name]:ev.target.value,
        }));
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Social-Hunt</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={loginValue.email}/>
                    
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input 
                        className="form-control" id="exampleInputPassword1" type="password"
                        onChange={handleChangeInput}  name="password" value={loginValue.password}/>

                    </div>
                   
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login