import React, {useContext}   from "react";
import {Link}                from "react-router-dom";
import useInput              from "../utils/customHook";
import {useHistory}          from "react-router";
import axios                 from "axios";
import {UserContext}         from "../index";
import {log, success, error} from "../utils/logs";

import "../index.css";


const Login = () => {
    const {setUser} = useContext(UserContext);
    const history   = useHistory();
    const email     = useInput();
    const password  = useInput();


    const handleSubmit = (e) => {
        e.preventDefault();
        log("Login attempt...");
        axios.post("api/auth/login", {
            email: email.value,
            password: password.value
        })
        .then(res => res.data)
        .then(user => setUser(user) )
        .then( ()  => success(`User logged in.`))
        .then( ()  => history.push("/secret") )
        .catch(({response}) => error(response.status, response.statusText) );
    }

    return(
        <div>
            <div className="container2">
                <h1> Sign in to your account </h1>
            </div>
            
            <div className="container2">
                <form className="signUpContainer" onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email address"
                            {...email}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            {...password}
                        />
                        <div id="emailHelp" className="form-text">
                            <Link to="/reset-password"> Forgot password? </Link>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary"> Log in </button>
                    </div>

                    <div className="mb-3">
                        Don't have an account? <Link to="/sign-up"> Sign up </Link>
                    </div>

                </form>
            </div>
        </div>

    )
};

export default Login;

