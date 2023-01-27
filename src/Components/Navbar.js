import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(){
        super();
        this.state={
            location : window.location.pathname
        }
        this.navbarRef = React.createRef();
    }

    handleNavClick = () => {
        this.navbarRef.current.click()
        this.setState({ location: window.location.pathname })
    }

    render() {
        return (
            <div className='row' style={{marginBottom:'3.5rem'}}>
            <nav className="col-12 navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Moviepedia</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Moviepedia</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" ref={this.navbarRef}></button>
                        </div>
                        <div className="offcanvas-body justify-content-between align-items-center">
                            <ul className="navbar-nav justify-content-start align-items-center">
                                <li className="nav-item" onClick={()=>this.handleNavClick()}>
                                    <Link className={`nav-link ${this.state.location === "/"?"active":""}`} aria-current="page" to="/" 
                                    >Home</Link>
                                </li>
                                <li className="nav-item" onClick={()=>this.handleNavClick()}>
                                    <Link className={`nav-link ${this.state.location === "/favorite"?"active":""}`} to="/favorite">My favorite Movies</Link>
                                </li>
                            </ul>
                            {
                                // <form className="d-flex mt-3 mt-lg-0" role="search">
                                //     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                //     <button className="btn btn-success" type="submit">Search</button>
                                // </form>
                            }
                        </div>
                    </div>

                </div>
            </nav>
            </div>
        );
    }
}

export default Navbar;