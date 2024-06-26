import { useRef, useContext, useState } from "react"
import loginStyles from "./login.module.css";
import axios from "axios";
import AuthContext from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef= useRef();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      login();
    }
  }


  const login = () => {
     const userEmail = emailRef.current.value;
     const userPassword = passwordRef.current.value;

     axios.post("http://localhost:5000/api/login", {
      email: userEmail,
      password: userPassword
     }).then(res=> {
       setIsLoggedIn(true);
       navigate("/home");
     }, (err)=> {
      toast.error("Invalid Credentials", {theme: "colored", autoClose: 3000});
     })
  }

  const validateForm = () => {
    let isValid = false;
    let userEmail = emailRef.current.value, userPassword = passwordRef.current.value;
    if (userEmail.trim() === "") {
      setEmailError("Email is required");
    } else if (userPassword.trim() === "") {
      setPasswordError("Password is required");
    } else {
      isValid = true;
      setEmailError("");
      setPasswordError("");
    }
    return isValid
  }
  return (
    <div className={loginStyles.loginContainer}>
      <ToastContainer/>
      <div className={loginStyles.heading}>Login</div>
      <div className={loginStyles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={loginStyles.formGroup}>
              <label htmlFor="email">Email: </label>
              <input type="text" name="email" ref={emailRef}/>
              {emailError.length > 0 ? (
                    <span className={loginStyles.error}>{emailError}</span>
              ) : null}
            </div>
            <div className={loginStyles.formGroup}>
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" ref={passwordRef}/>
              {passwordError.length > 0 ? (
                    <span className={loginStyles.error}>{passwordError}</span>
              ) : null}
            </div>
            <button className={loginStyles.loginBtn} type="submit">Login</button>
            <div className={loginStyles.registerLink}>Register</div>
          </form>

      </div>
    </div>
  )
}

export default Login