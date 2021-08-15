import React,{ useContext, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Cookies from 'js-cookie'
import axios from "axios";
import UserContext from "../context/Context";

const Login = () => {
  const [user, setUser] = useContext(UserContext)
  const [error, setError] = useState(false)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      // @ts-ignore
      username: usernameRef.current.value,
      // @ts-ignore
      password: passwordRef.current.value,
    };
    axios.post("/api/users/login", data)
      .then(res =>{
        setUser({ accesstoken: res.data.accessToken ,username: res.data.username});  
        console.log(res.data)      
        history.push('/diary')
      }).catch (err => {
        setError(true)
        console.log(err);
      })
  };
  let cookie = Cookies.get()
  console.log(cookie)
  // console.log(currentUserName)

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor='username' style={{display: 'flex'}} >username</label>
        <input className="input" autoFocus placeholder="username" ref={usernameRef} />
        <label htmlFor='password' style={{display: 'flex'}} >password</label>
        <input className="input" 
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="btn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
    </div>
  );
}

export default Login