import React, {useState, useEffect} from 'react'
import {Switch, Route } from "react-router-dom";
import Login from "../login";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Authentication from "./authentication"
import Users from "./users"
import Edit from "./Edit"
import {auth} from '../firebase'
import Banners from './Banners/banners';
import CreateTest from './FirbaseTest/CreateTest';
import TestList from './FirbaseTest/TestList';
import QuizList from './FirbaseTest/QuizList';
import CreateCource from './classes/CreateCource';
import EditCourses from './classes/EditCourses';
import Subjects from './classes/Subjects';
import VideosClass from './classes/Videos';
import Video from './classes/Video';


function Routing(url) {
    const [state, setState] = useState(null);
    useEffect(() => {
       auth.onAuthStateChanged(user=>{
           if(user){setState(user)}
           else{setState(null)}
       })
    }, [])
    return (
        <Switch>
           {!state?
           <Route exact path="/">
           <Login/>
         </Route>         
        //  <Route path="/signup">
        //    <Signup/>
        //  </Route>    
        :<>      
        <div className="sb-nav-fixed">
         <Navbar state={state}/>    
         <div id="layoutSidenav">
         <div id="layoutSidenav_nav">
             <Sidebar/>
             </div>
             <div id="layoutSidenav_content">         
             <Route  path="/authentication" component={Authentication}/>
             <Route  path="/users"><Users/></Route>
             <Route  path="/edit"><Edit/></Route> 
             <Route  path="/banners"><Banners/></Route>
             <Route  path="/test-series"><CreateTest/></Route>
             <Route  path="/test-list/:id" children={<TestList/>}/>
             <Route  path="/quiz-list/:url_id/:uid" children={<QuizList/>}/>
             <Route  path="/admin-classes"><CreateCource/></Route>
             <Route  path="/edit-courses/:id"><EditCourses/></Route>
             <Route  path="/admin-sujects/:id"><Subjects/></Route>
             <Route  path="/admin-videos-link/:id/:videos_id"><VideosClass/></Route>
             <Route  path="/admin-video/:id/:videos_id/:index"><Video/></Route>
            </div>  
         </div>
         </div>
        </>      }
      </Switch>
    )
}

export default Routing
