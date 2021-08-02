import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
import '../style/Register.css'
const Register = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { userDispatch } = useContext(UserContext);
    const history = useHistory();
    const [registerValues, setRegisterValues] = useState({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
    });
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            if (registerValues.password !== registerValues.repeatPassword) {
                return enqueueSnackbar("Password Doesn't match", { variant: "error" });
              }
            const { data } = await axios.post("/api/user/register", registerValues);
            let accessToken = data.accessToken;
            localStorage.setItem("auth-token", accessToken);
            userDispatch({ type: "REGISTER_USER", payload: data.payload });

            enqueueSnackbar("Registered Successfully", { variant: "success" });
            history.push("/")
        } catch (err) {
            console.log(err);
        }
      };
      const handleChangeInput = (ev) => {
        setRegisterValues((prev) => ({
          ...prev,
          [ev.target.name]: ev.target.value,
        }));
      };
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Welcome to</h3>
                <h4 className="text-uppercase text-center mb-4">Social-Hunt</h4>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" name="name"
                    onChange={handleChangeInput} value={registerValues.name} 
                    style={{background: `${alert.fullname ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.fullname ? alert.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    onChange={handleChangeInput} value={registerValues.email} 
                    style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {alert.email ? alert.email : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">
                        
                        <input
                        className="form-control" id="exampleInputPassword1" type="password"
                        onChange={handleChangeInput}  name="password" value={registerValues.password} 
                        style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />
            
                    </div>

                    <small className="form-text text-danger">
                        {alert.password ? alert.password : ''}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>

                    <div className="pass">
                        
                        <input 
                        className="form-control" id="cf_password" name="repeatPassword" type="password"
                        onChange={handleChangeInput} value={registerValues.repeatPassword} 
                        style={{background: `${alert.cf_password ? '#fd2d6a14' : ''}`}} />

                    </div>
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Register
                </button>

                <p className="my-2">
                    Already have an account? <Link to="/login" style={{color: "crimson"}}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register