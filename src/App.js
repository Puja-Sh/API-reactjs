import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./components/Home";
import Instruction from "./components/Instructions";
import Quiz from "./components/quiz";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact/>
      <Route path="/play/instructions" component={Instruction} exact />
      <Route path="/quiz" component={Quiz} exact /> 
      <Route path="/quiz/result" component={Result} exact />     
    </Router>
  );
}

export default App;
