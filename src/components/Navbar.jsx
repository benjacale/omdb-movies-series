import React                    from "react";
import { useContext, useState } from "react";
import { Link, useHistory }     from "react-router-dom";
import axios                    from "axios";
import { UserContext }          from "../index";
import { error }                from "../utils/logs";
import Notification             from "../utils/Notification";
import Swal                     from "sweetalert2";


const Navbar = () => {
    const {user, setUser}     = useContext(UserContext);
    const [search, setSearch] = useState( {input: ""} );
    const history             = useHistory();

    const handleChange = (e) => {
        setSearch({
            [e.target.localName]: e.target.value.trim(),
          });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${search.input}`);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const confirm  = await Swal.fire({
              title: 'Are you sure?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            })
            if(confirm.isConfirmed) {
                Notification.successMessage("See you soon!")
                axios.post("/api/auth/logout");
                setUser({});
                history.push("/");
            }
       
        } catch ({ response }) {
            error(response.status, response.statusText);
        }
    };
    
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary fixed-top">
                <div className="container-fluid">
                    <Link to="/home" style={{textDecoration:"none"}}>
                        <span className="navbar-brand mb-0 h1 fs-1 ps-4 text-warning" style={{fontFamily:"'Faster One', cursive"}}>OMDB</span>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex ms-auto mt-2 mb-2" onSubmit={handleSubmit}>
                                <input
                                    className="form-control me-2 bg-dark border border-secondary text-white searchInput w-100"
                                    style={{height:"50px", width:"400px", fontSize:"15px"}}
                                    type="search"
                                    placeholder="Search movie or serie..."
                                    aria-label="Search"
                                    onChange={handleChange}
                                />
                        </form>
                        
                        {user.id? (
                            <ul className="navbar-nav ms-auto mt-2 mb-2 d-flex flex-row justify-content-center">
                                <li className="nav-item">
                                    <Link to="/me">
                                        <button className="btn btn-outline-primary" id="btnUser"> {user.name} <i className="fa-solid fa-chevron-right ps-2" style={{color:"white"}}></i> </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/home">
                                        <button className="btn btn-outline-warning" onClick={handleLogout}> Log out <i className="bi bi-power ps-1"></i></button>
                                    </Link>
                                </li>
                            </ul>
                            ) : (
                            <ul className="navbar-nav ms-auto mt-2 mb-2 d-flex flex-row justify-content-center">
                                <li className="nav-item">
                                    <Link to="/sign-in" >
                                        <button className="btn btn-outline-warning" id="btnLogin"> Log in </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sign-up" >
                                        <button className="btn btn-primary"> Sign up</button>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;



