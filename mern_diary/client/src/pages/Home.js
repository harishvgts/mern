import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const link = {
        textDecoration: 'none',
        color: '#66fcf1',
    }
    const span ={
        color: "#66fcf1"
    }
    return (
        <div className="showcase">
            <h1>Welcome to <span style={span}>MERN</span> Diary</h1>
            <p>Record Your Daily Life</p>
            <Link to="/diary" className="link" style={link}>Open Diary</Link>
        </div>
    )
}

export default Home

    

