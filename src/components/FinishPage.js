import React from 'react';

const Finishpage = ({correctAnswers, questions, point}) => {
  const renderPage = () => {
    return(
      <div className="container">
        <div className="col-6 text-center">
          <h1 className='header'>Final</h1>
          <p className="sub-header">Point: {point}</p>
          <p className="sub-header">Questions: {questions.length}</p>
          <p className="sub-header">Correct Answers: {correctAnswers}</p>
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
