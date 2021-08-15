import axios from "axios";
import { useRef, useState } from "react";
import {Link} from 'react-router-dom'
import React from 'react'

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const styleLable = {
    display: 'flex', 
    // width: '50vw'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      // @ts-ignore
      username: usernameRef.current.value,
      // @ts-ignore
      email: emailRef.current.value,
      // @ts-ignore
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/api/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor='username' style={{display: 'flex'}} >username</label>
        <input className="input" autoFocus placeholder="username" ref={usernameRef} />
        <label htmlFor='email' style={styleLable} >email</label>
        <input className="input" type="email" placeholder="email" ref={emailRef} />
        <label htmlFor='password' style={styleLable} >password</label>
        
        <input className="input"
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="btn" type="submit">
          sign up
        </button><br/>
        {success && <>
          <span className="success">Successfull. You can login now!</span><br/>
          <Link className="link" to="login">Login</Link>
        </>
        }
        {error && 
        <span className="failure">Something went wrong!</span>
        }
      </form>
    </div>
  );
}

export default Register
