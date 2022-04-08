import React from 'react';

const Finishpage = () => {
  const renderPage = () => {
    return(
      <div className="container">
        <div className="col-6">
          <h1 className='header'>Final</h1>
          <p className="sub-header">Point: </p>
          <p className="sub-header">Questions: </p>
          <p className="sub-header">Correct Answers: </p>
        </div>
        <div className="col-6">
          <h1 className='header'>All Question</h1>
          <ul>
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
