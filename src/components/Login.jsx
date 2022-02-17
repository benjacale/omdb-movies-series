import React                    from "react";
import { useContext, useState } from "react";
import { useHistory }           from "react-router";
import { Link }                 from "react-router-dom";
import axios                    from "axios";
import { UserContext }          from "../index";
import { LastLocationContext }  from "../index";
import { error }                from "../utils/logs";
import useInput                 from "../utils/customHook";
import Notification             from "../utils/Notification";
import "../index.css";


const Login = () => {
    const {setUser}                       = useContext(UserContext);
    const {lastLocation, setLastLocation} = useContext(LastLocationContext);
    const [showPassword, setShowPassword] = useState(false);
    const history                         = useHistory();
    const email                           = useInput();
    const password                        = useInput();


    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("api/auth/login", {
            email: email.value,
            password: password.value
        })
        .then(res => res.data)
        .then(user => {
            setUser(user) 
            Notification.successMessage(`Welcome, ${user.name}!`);
            }
        )
        .then( ()  => {
                lastLocation.substring(0,8) === "/search/" ? history.goBack() : history.push("/me"); 
            }
        )
        .catch(({response}) => {
            Notification.errorMessage(`Invalid email or password.`);
            error(response?.status, response?.statusText) 
        }
        );
    }

    return(
        <div>
            <div className="container1">
                <h1 style={{color:"#F5F5F5", fontSize:"35px"}}> Welcome </h1>
            </div>
            
            <div className="container2">
                <form className="signUpContainer" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control bg-dark text-white border border-secondary signUpInputs emailInput"
                            aria-describedby="emailHelp"
                            placeholder="E-mail"
                            {...email}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type={showPassword? "text" : "password"}
                                className="form-control bg-dark text-white border border-secondary signUpInputs passwordInput"
                                placeholder="Password"
                                {...password}
                                required
                            />
                            
                            <button className="btn btn-outline-secondary seePassword" type="button" id="button-addon2" onClick={handleShowClick}>
                                {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                            </button>
                        </div>

                        <p className="d-flex ms-auto mt-1" style={{fontSize:"0.8em"}}>
                            {/* <Link to="/reset-password" className="text-white" style={{textDecoration:"none"}}> */} Forgot password? {/* </Link> */}
                        </p>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className={`btn btn-warning w-100 m-0 mt-4 ${!email.value || !password.value? 'disabled' : null }`}> Log in <i className="fa-solid fa-arrow-right-to-bracket ps-1"></i></button>
                    </div>

                    <div className="mb-3">
                    <Link to="/sign-up" className="text-white" style={{textDecoration:"none"}}>
                        <p style={{fontSize:"0.8em"}}> Create an account for free <i className="fa-solid fa-user-plus ps-1"></i></p>
                    </Link>
                    </div>

                </form>
            </div>
        </div>

    )
};

export default Login;

