import React, { useState, useContext } from 'react'
import axios from 'axios'
import UserContext from "../context/Context";
import { useHistory } from 'react-router-dom'
import './form.css'

const Add = () => {
    const data = useContext(UserContext);
    const user = data[0]
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const url = 'http://localhost:5000/add-to-diary';
    const history =  useHistory()

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
          title: title,
          description: description,
          date: date,
          username: user.username
        }
        const headers = { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accesstoken}`}

        console.log(data)
        axios.post(url, data, {headers: headers})
       .then( history.push('/diary') )
       .catch(err => console.log(err.data)) 
    }
    
    return (
    <div className="-form">
        <h1>ADD TO <span className='text'>DIARY</span></h1>
        <form className="form" onSubmit={handleSubmit} >
            <div className="form-container">
                <label htmlFor='title'>Title</label>
                <input type='text' className='input text' value={title} onChange={e => setTitle(e.target.value)} name='title' />
            </div>
            <div  className="form-container">
                <label htmlFor='date'>Date</label>
                <input type='date' className='input date' value={date} onChange={e => setDate(e.target.value)} name='date' />
            </div>
            <div className="form-container">
                <label htmlFor='description'>Description</label>
                <textarea className='input description' value={description} onChange={e => setDescription(e.target.value)} name='description'></textarea>
            </div> 
            <button className='btn' type="submit">Post</button>
        </form>
    </div>
    )
}

export default Add


