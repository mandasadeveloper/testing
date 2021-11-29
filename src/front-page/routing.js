import {Switch, Route } from "react-router-dom";
import CreateTest from './CreateTest';
import TestList from "./TestList";
import QuizList from './QuizList';
import Report from "./Report";


function Front_Routing() {   
    return (
        <Switch>         
        <Route exact  path="/home"><CreateTest/></Route>
        <Route  path="/test-list"><TestList/></Route>
        <Route  path="/quiz-list"><QuizList/></Route>
        <Route  path="/report"><Report/></Route>
      </Switch>
    )
}

export default Front_Routing
