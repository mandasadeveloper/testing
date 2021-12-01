import React from "react";
import { Link } from "react-router-dom";
const Sidebar=()=>{
    return(
        <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    {/* <div className="sb-sidenav-menu-heading">Core</div> */}
                    <Link className="nav-link" to="/authentication">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Authentication
                    </Link>
                    <Link className="nav-link" to="/users">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Users
                    </Link>       
                    <Link className="nav-link" to="/banners">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Banners
                    </Link>
                    <Link className="nav-link" to="/test-series">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Create Test
                    </Link>            
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Powered By:</div>
               Mandasa Technologies
            </div>
        </nav>
    </div>
      )
}
export default Sidebar