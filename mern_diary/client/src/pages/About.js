import React from 'react'

const About = () => {
    const style = {
        listStyle: 'none',
        textAlign: 'left',
        margin: 'auto 2.5rem'
    }
    return (
        <div style={style} className="about">
            <h2>About</h2>
            <p>A simple MERN Diary application which can register and login user useing jwt which 
            is saved useing contextAPI, after logging in can create diary entry,edit and delete.<br/>
            <br/><b>Tech used</b><br/>
            react : reacthooks(useState, useEffect, useContext),react-router and axios<br/>
            nodejs : Express, cors, middleware, router , cors, jwt, bcrypt<br/>
            mongoDB<br/>
            </p>
            <h2>Routes</h2>
            <li>/login</li>
            <li>/Register</li>
            <li>/home</li>
            <li>/about</li>
            <li>/diary</li>
            <li>/diary/add</li>
            <li>/diary/:id</li>
            <li>/diary/edit/:id</li>
        </div>
    )
}

export default About


