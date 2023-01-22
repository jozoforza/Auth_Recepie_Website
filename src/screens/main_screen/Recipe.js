import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Recipe = () => {
    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()
    return (
        <div>
            <h2>This is a recepie</h2>
            <p>{id}</p>
            <button onClick={()=>{navigate("/")}}><h1>back</h1></button>
        </div>
    )
}

export default Recipe