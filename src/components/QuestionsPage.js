import {React, useContext, useState, useEffect} from 'react'
import TourContext from '../context/TourContext'
import Finishpage from './FinishPage';

export default function QuestionsPage() {
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
    if(questions.length === 10){
      setTimeout(() => {
        setQuestionsActive(false);
      }, 1000);
    }
  }, [questions])
  
  const generateQuestions = () => {
    const randomNum1 = Math.floor(Math.random() * 10);
    const randomNum2 = Math.floor(Math.random() * 10);
    setQuestion(`${randomNum1} x ${randomNum2}`);
    let correctAnswer = randomNum1 * randomNum2;
    setCorrectAnswer(correctAnswer);
    // setQuestions(questions => [...questions, `${question} = ${correctAnswer}`]);

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
  function handleAnswer(isCorrect, answer){
    const timeout = 1000;
    let bodyStyle= document.body.style;

    if(isCorrect){
      bodyStyle.background = "#00BF63";
      setQuestions(questions => ([...questions, `${question} = ${correctAnswer} ✓ `]));      
      const squareRootValue = Math.sqrt(answer);
      setTimeout(() => {
      // add earned points to state value, check if square root first
        isSquare(answer) ? setScore(score + squareRootValue) 
        : setScore(score + Math.ceil(squareRootValue));

        setCorrectTotal(correctTotal + 1);
      }, timeout);
    } 
    else if(!isCorrect){
      bodyStyle.background = "#FA0000";
      setQuestions(questions => ([...questions, `${question} = ${correctAnswer} X `]));
    }

    setTimeout(() => {
      bodyStyle.background = "#2D2D2D";
      generateQuestions();
    }, timeout);
  }
  const renderPage = () =>{
    return(
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
             {renderAnswers()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {questionsActive && renderPage()}
      {!questionsActive && <Finishpage point={score} questions={questions} correctAnswers={correctTotal}></Finishpage>}
    </div>
  )
}
