import {React, useContext, useState, useEffect} from 'react'
import TourContext from '../context/TourContext'
import Finishpage from './FinishPage';
export default function QuestionsPage({setIsFinishPage}) {
  const tourContext = useContext(TourContext);
  
  const [questionsActive, setQuestionsActive] = useState(true)
  const [question, setQuestion] = useState("")
  const [questions, setQuestions] = useState([]);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [falseAnswer1, setFalseAnswer1] = useState(null);
  const [falseAnswer2, setFalseAnswer2] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  useEffect(() =>{
    generateQuestions();
  }, [])
  useEffect(()=>{
    if(questions.length === 8){
      setIsFinishPage(true);
    }
  }, [questions])
  
  const generateQuestions = () => {
    const randomNum1 = Math.floor(Math.random() * 10);
    const randomNum2 = Math.floor(Math.random() * 10);

    setCorrectAnswer(randomNum1 * randomNum2);
    setQuestion(`${randomNum1} x ${randomNum2}`);
    setQuestions(questions => [...questions, question]);

    let falseAnswer1 = randomNum1 - 1 * randomNum2;
    let falseAnswer2 = randomNum1 + 1 * randomNum2;
    if(falseAnswer1 === falseAnswer2){
      falseAnswer2 = randomNum1 * randomNum2;
    }else if(falseAnswer1 === falseAnswer2){
      falseAnswer1 = randomNum1 + 1 * randomNum2
    }

    setFalseAnswer1(Math.abs(falseAnswer1))
    setFalseAnswer2(Math.abs(falseAnswer2))
  }

  const renderAnswers = () => {
    return(
      <div> 
        <p onClick={()=> handleAnswer(true, correctAnswer)}>Correct Answer: {correctAnswer}</p>
        <p onClick={()=> handleAnswer(false)}>False Answer: {falseAnswer1}</p>
        <p onClick={()=> handleAnswer(false)}>False Answer: {falseAnswer2}</p>
      </div>
    )
  }
  const isSquare = (n) => {
    return Math.sqrt(n) % 1 === 0;
};
  function handleAnswer(correct, correctAnswer){
    // change body color accordingly
    // if answer true increase score 
    // skip to next question
    // 
    const timeout = 1000;
    let bodyStyle= document.body.style;
    if(correct){
      bodyStyle.background = "#00BF63";
      const squareRootValue = Math.sqrt(correctAnswer);
      
      setTimeout(() => {
      // add earned points to state value, check if square root first
        isSquare(correctAnswer) ? setScore(score + squareRootValue) 
        : setScore(score + Math.ceil(squareRootValue));

        setCorrectTotal(correctTotal + 1);
      }, timeout);
    
    } 
    else if(!correct){
      bodyStyle.background = "#FA0000";
    }

    setTimeout(() => {
      bodyStyle.background = "#2D2D2D";
      generateQuestions();
    }, timeout);
  }
 

  return (
   <div>
      <div className='text-white container'>
      <div className="col-6">
        <h3>svg</h3>
        Current Question: {question}
      </div>
      <div className="col-6">
        <div className='d-flex space-between'>
          <p onClick={generateQuestions} className='sub-header2'>Score: {score} </p>
          <p className='sub-header2'>Tour: {tourContext}</p>
          <p className='sub-header2'>Questions: {correctTotal}/{questions.length} </p>
        </div>
        <div>
          {/* {generateQuestions()} */}
          {renderAnswers()}
          {/* <ul>
            {questions.map(question=>(<li>{question}</li>))}
          </ul> */}
        </div>
      </div>
    </div>
   </div>
  )
}
