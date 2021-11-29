import React from "react";
import "../assets/js/scripts.js";
import "../assets/css/styles.css";
import { auth } from "../firebase.js";
import { Link, useHistory } from "react-router-dom";
const Navbar=()=>{
    const history=useHistory();
    return(
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">       
        <p className="navbar-brand ps-3">Pscadda</p>        
        <button className="btn btn-a btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>       
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">               
            </div>
        </form>       
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <Link className="nav-a dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">                                      
                    <li><button className="dropdown-item" onClick={()=>{
                        auth.signOut()
                        history.push("/")
                    }}>Logout</button></li>                 
                </ul>
            </li>
        </ul>
    </nav>
      )
}
export default Navbar