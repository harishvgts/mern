import React, { useState,useEffect, useContext,  } from 'react'
import {Link} from 'react-router-dom'
// import { useHistory } from "react-router-dom"
import axios from 'axios'
import UserContext from "../context/Context";


const Diary = () => {
    const data = useContext(UserContext);
    const user = data[0]
    const [render, setRender] = useState(false)
    const [loading, setLoading] = useState(false)
    const [diary, setDiary] =  useState([])

    
    useEffect(() =>  {
        
        const entry = async () => {
            try {
                const userEntry = await axios.get(`/diary/${user.username}`, {headers: {
                    'Authorization': `Bearer ${user.accesstoken}`}}) 
                    setDiary(userEntry.data)
                } catch (err) { console.log(err) }
            }
            entry()
            if(user) setRender(true)
    },[])


    return (
        <>
            { render ? 
            <div style={{marginTop:'-5rem'}} className='add-container'>
                <div className="add">
                    <p>{`Add to Diary ${user.username}`}</p>
                    <Link className='btn' style={{textDecoration:'none'}} to='/diary/add'>Add</Link>
                </div>
            </div> : <div> 
                <p>need to login</p>
                <Link className='link' to='./login' >Login</Link><span>  (or)  </span>
                <Link className='link' to='./register' >Register</Link> 
                </div>
            }

            <div className="diary">
                { diary.map( d => (
                    <div key={d._id} className="diary-container">
                        <h3>{ d.title }</h3>
                        <p>{ d.date.slice(0,-14) }</p>
                        <Link className='link' to={`/diary/:${ d._id }`}  >More</Link> 
                    </div>
                )) }
            </div>
        </>
    )
}

export default Diary


