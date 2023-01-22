import React from 'react'
import { useState } from 'react'
import './css/recipe_input.css'

const RecipeInput = ({inputArray, setInputArray}) => {
    console.log(inputArray)
    const handleStepChange = (event) => {
        let array = inputArray
        array[event.target.name] = event.target.value
        
        setInputArray(array)
    }
    const addInput=(event, condition)=>{
        event.preventDefault()
        if(condition){
            setInputArray([...inputArray,""])
        }else{
            const count = inputArray.length - 1
            setInputArray(inputArray.filter((step,index)=>index!==count))
        }
        console.log("array: ",inputArray)
    } 
  return (
    <div style={{backGround: "red"}}>
<div className='inputList'>
            {inputArray.map(((step, index)=>
                <textarea
                    type="text" 
                    placeholder='write some step'
                    key={index+"_step"}
                    name={index}
                    defaultValue={step||""}
                    onChange={handleStepChange}
                >
                </textarea>
            ))}
        </div>
        <button onClick={(e)=>addInput(e,true)}><h3>+</h3></button>
        <button onClick={(e)=>addInput(e,false)}><h3>-</h3></button>
    </div>
  )
}

export default RecipeInput