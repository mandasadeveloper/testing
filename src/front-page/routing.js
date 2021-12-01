import {Switch, Route } from "react-router-dom";
import CreateTest from './CreateTest';
import TestList from "./TestList";
import QuizList from './QuizList';
import Report from "./Report";


function Front_Routing() {   
    return (
        <Switch>         
        <Route exact  path="/home"><CreateTest/></Route>
        <Route  path="/test-list/:id" children={<TestList/>}/>
        <Route  path="/quiz-list/:url_id/:uid" children={<QuizList/>}/>
        <Route  path="/report"><Report/></Route>
      </Switch>
    )
}

export default Front_Routing
