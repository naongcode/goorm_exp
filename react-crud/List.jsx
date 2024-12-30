import React, { useState } from 'react'

export default function List({inputs,handleInputChange,handleSubmit}) {
    
  return (
    <div>
        <form className='input-form' onSubmit={handleSubmit}>
            <div className='input-item'>
            <div>항목</div>
            <input 
                type="text"
                name="item"
                value={inputs.item}
                onChange={handleInputChange}></input>
            </div>
            <div className='input-cost'>
            <div>비용</div>
            <input 
                type="number"
                name="cost" 
                value={inputs.cost}
                onChange={handleInputChange}></input>
            </div>
            <button type='submit'>제출 
              <span className='material-icons'> send</span></button>
        </form>
    </div>
  )
}
