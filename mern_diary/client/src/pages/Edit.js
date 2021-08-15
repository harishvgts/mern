import React, { useEffect, useState, useContext } from 'react'
import UserContext from "../context/Context";
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios'
import './form.css'

const Edit = () => {
    const contextData = useContext(UserContext);
    const user = contextData[0]
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const history =  useHistory()
    // @ts-ignore
    const { id } = useParams()
    const newId = id.slice(1)
    const headers = {'Authorization': `Bearer ${user.accesstoken}`}
    
    useEffect(() => {
        const data = () => {
            axios.get(`/diary/view/${newId}`, {headers: headers} )
            .then(res =>{
                setTitle(res.data.title)
                setDate(res.data.date.slice(0,-14))
                setDescription(res.data.description)
                console.log(res.data)
                })
            .catch(err => console.log(err))
        }
        data()
        console.log(newId)
    },[])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = {
          title: title,
          description: description,
          date: date
        }
        console.log(input)
        try {
            const res = await axios.put(`/diary/edit/:${newId}`, input, {headers: headers})
            console.log(res.data)
            history.push('/diary')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="-form">
        <h1>EDIT <span className='text'>DIARY</span></h1>
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

export default Edit

