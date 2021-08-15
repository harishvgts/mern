import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
    
    const history = useHistory()

    useEffect(()=>{
        history.push('/home')
    },[])
    return (
        <></>
    )
}

export default Home

    

