import React, { useState, useEffect ,useContext} from 'react'
import { useParams, Link, useHistory } from "react-router-dom"
import UserContext from "../context/Context";
import axios from 'axios'

const Page = () => {
    const contextData = useContext(UserContext);
    const user = contextData[0]
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    //edit
    
    const params = useParams()
    const history = useHistory()
    const id = JSON.stringify(params.id)
    const newId = id.slice(2,-1)
    
    useEffect(() => {
        data()
        console.log(newId)
    },[])
    // const headers = { 'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${user.accesstoken}`}

    const data = async () => {
        try{
            const res = await axios.get(`/diary/view/${newId}`,{headers: {'Authorization': `Bearer ${user.accesstoken}`}})
            console.log(res.data)
            setTitle(res.data.title)
            let newDate = res.data.date.slice(0,-14)
            setDate(newDate)
            console.log(date)
            setDescription(res.data.description)

        } catch(err) { console.log(err) } 
    }
    const deleteData = () => {
        axios.delete(`/diary/delete/${newId}`)
        .then(res =>  history.push('/diary') )
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className="page-container">
                <h1>{title}</h1>
                <p>{date}</p>
                <p className='diary-container'>{description}</p>
            </div>

        <div className="settings">
            <Link className='link' to={`/diary/edit/:${newId}`} >Edit</Link>
            <button className="delete-btn" onClick={deleteData}>delete</button>
        </div>
    </>
    )
}

export default Page


