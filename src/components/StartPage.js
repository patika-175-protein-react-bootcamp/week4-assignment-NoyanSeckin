import React from 'react'

export default function StartGame({setGameIsActive}) {
  const getAmount = (name)=> {
    let amount = JSON.parse(localStorage.getItem(name));
    return amount || 0;
  }
  return (
    <div className='text-center'>
      <h1 className='header'>Mathematics Game</h1>
      <p className="sub-header">Total Point: {getAmount("total-point")} </p>
      <p className="sub-header">Total Questions: {getAmount("total-questions")} </p>
      <p className="sub-header">Correct Answers: {getAmount("correct-answers")} </p>
      <button  onClick={()=> setGameIsActive(true)} className='start-btn'>Start</button>
      <img onClick={()=> document.querySelector(".start-btn").click()} className='vector-img' src={require('../images/Vector10.png')} alt="" />
    </div>
  )
}
