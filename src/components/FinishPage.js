import {React, useEffect, useContext} from 'react';
import TourContext from '../context/TourContext';

const Finishpage = ({correctAnswers, questions, point, setGameIsActive, setTour}) => {
  const tourContext = useContext(TourContext);

  // Add these three parameters to local storage
  useEffect(()=>{
    const existingQuestions = JSON.parse(localStorage.getItem("total-questions"))
    localStorage.setItem("total-questions", JSON.stringify(existingQuestions + questions?.length));

    const existingPoints = JSON.parse(localStorage.getItem("total-point"));
    localStorage.setItem("total-point", JSON.stringify(existingPoints + point));

    const existingAnswers = JSON.parse(localStorage.getItem("correct-answers"));
    localStorage.setItem("correct-answers", JSON.stringify(existingAnswers + correctAnswers))
  }, [])
  const restartPage = () => {
    setGameIsActive(false)
    setTour(tourContext + 1);
  }
  const renderPage = () => {
    return(
      <div className="container">
        <div className="col-6 text-center ">
          <h1 className='header'>Final</h1>
          <p className="sub-header">Point: {point}</p>
          <p className="sub-header">Questions: {questions.length}</p>
          <p className="sub-header">Correct Answers: {correctAnswers}</p>
          <button onClick={restartPage} className='restart-btn position-relative'>Restart
            <img onClick={()=> document.querySelector(".restart-btn").click()} className='vector-img-2' src={require('../images/Vector10.png')} alt="" />
          </button>
        
          
        </div>
        <div className="col-6 text-center">
          <h1 className='header'>All Question</h1>
          <ul>
            {questions.map((question, index) => question && <li className='question-li' key={index}>{question}</li>)}
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default Finishpage;
