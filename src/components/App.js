import TourContext from "../context/TourContext";
import {useContext, useState} from "react"
import StartPage from "./StartPage";
import QuestionsPage from "./QuestionsPage"
import FinishPage from "./FinishPage"
function App() {

  const context = useContext(TourContext);
  const [gameIsActive, setGameIsActive] = useState(false);
  const [isFinishPage, setIsFinishPage] = useState(false);
  const [tour, setTour] = useState(0);

  const renderPages = ()=> {
    if(isFinishPage){
      return ( <FinishPage/>)
    }
    else if(!gameIsActive){
      return (<StartPage setGameIsActive={setGameIsActive}/>)
    }
    else if(gameIsActive){
      return (<QuestionsPage setIsFinishPage={setIsFinishPage}/>)
    }
  }
  return (
    <div>
      {renderPages()}
      {/* <TourContext.Provider value={tour}>
        <QuestionsPage></QuestionsPage>
      </TourContext.Provider> */}
    </div>
  );
}

export default App;
