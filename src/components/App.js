import TourContext from "../context/TourContext";
import {React, useContext, useState, useEffect} from "react"
import StartPage from "./StartPage";
import QuestionsPage from "./QuestionsPage"

// export const TourContext = React?.createContext();

function App() {
  const [gameIsActive, setGameIsActive] = useState(false);
  const [isFinishPage, setIsFinishPage] = useState(false);
  const [tour, setTour] = useState(1);

  const renderPages = ()=> {
    if(!gameIsActive){
      return (<StartPage setGameIsActive={setGameIsActive}/>)
    }
    else if(gameIsActive){
      return (
          <TourContext.Provider value={tour} >
            <QuestionsPage setTour={setTour} setGameIsActive={setGameIsActive} />
          </TourContext.Provider>
      )
    }
  }
  return (
    <div>
      {renderPages()}
    </div>
  );
}

export default App;
