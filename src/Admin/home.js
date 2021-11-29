import React from "react"
import { BrowserRouter, Route} from "react-router-dom"
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Authentication from "./authentication"
import Users from "./users"
const Home=()=>{
return(
<BrowserRouter>
<div className="sb-nav-fixed">
   <Navbar/>    
   <div id="layoutSidenav">
   <div id="layoutSidenav_nav">
       <Sidebar/>
       </div>
       <div id="layoutSidenav_content">         
       <Route path="/authentication" component={Authentication}/>
       <Route path="/users" component={Users}/>
        </div>  
   </div>
   </div>
</BrowserRouter>
      )
}
export default Home