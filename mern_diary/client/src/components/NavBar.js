import React, { useContext, useEffect, useState } from 'react'
import UserContext from "../context/Context";
import './nav.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const HeaderLink = ({ page, selected }) => {
    const title = page.charAt(0).toUpperCase() + page.slice(1)
    let className = selected ? 'headerlink-no-link ' : ''
    className += 'headerlink-title'
  
    return (
      <Link to={`/${page}`} style={{ textDecoration: 'none' }} className={className}>
        {title}
        <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>
          •
        </div>
      </Link>
    );
  };
  
  const Navbar = () => {

    const [ logout, setLogout] = useState(false)
    const page = useParams().page || 'home';
    const [user, setUser] = useContext(UserContext)


    useEffect(()=>{
      // if(userData) setLogout(true)
    })
    
    const onClick = () =>{
      
    }

    return (
      <>
      <div className='nav'>
        <HeaderLink page='home' selected={page === 'home'} />
        <HeaderLink page='about' selected={page === 'about'} />
        <HeaderLink page='diary' selected={page === 'diary'} />
        {/* { userData && <button className='delete-btn' onClick={onClick}>logout</button>} */}
      </div>
      </>
    );
  };

export default Navbar



