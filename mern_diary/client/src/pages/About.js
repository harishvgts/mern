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
            <p>svdsvcxc dbcb cbxcbvxcsdb dbxcsdchbgsj dhgshdbgvs dsbdv xckb xchb xc bxkjcbj
                vsdjv kjxc vxcn vxcv 
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


