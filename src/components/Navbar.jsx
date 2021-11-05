import React, {useState}       from "react";
import {useContext}            from "react";
import {Link, useHistory}      from "react-router-dom";
import axios                   from "axios";
import {UserContext}           from "../index";
import {log, success, error}   from "../utils/logs";


const Navbar = () => {
    const {user}      = useContext(UserContext);
    const {setUser}   = useContext(UserContext);
    const history     = useHistory();
    // const search      = useInput();
    // const {setSearch} = useContext(UserContext);
    const [search, setSearch] = useState( {input: ""} );

    const handleChange = (e) => {
        setSearch({
            [e.target.localName]: e.target.value,
          });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${search.input}`);
    };

    const handleLogout = async () => {
        log("logout attempt...");
        try {
          await axios.post("/api/auth/logout");
          setUser({});
          success("Logged out");
          history.push("/");
        } catch ({ response }) {
          error(response.status, response.statusText);
        }
    };
    
    return(
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/home" >
                    <h2>OMDB</h2>
                </Link>

                <form className="d-flex" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search a movie..."
                        aria-label="Search"
                        onChange={handleChange}
                    />
                    <img onClick={handleSubmit} className='lupa' src='https://www.clipartmax.com/png/full/8-85921_search-instagram-search-icon-vector.png' alt='searchImg' />
                </form>

                
                {user.id? (
                    <div>
                        <Link to="/secret">
                            <button className="btn btn-outline-success"> Hi, {user.name} </button>
                        </Link>
                        <Link to="/secret">
                            <button className="btn btn-success" onClick={handleLogout}> Log out </button>
                        </Link>
                    </div>
                    ) : (
                    <div>
                        <Link to="/sign-up" >
                            <button className="btn btn-success"> Sign up</button>
                        </Link>
                        <Link to="/sign-in" >
                            <button className="btn btn-outline-success"> Log in </button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;



