import React                    from "react";
import { useContext, useState } from "react";
import { useEffect }            from "react";
import {useHistory}             from "react-router";
import {Link}                   from "react-router-dom";
import axios                    from "axios";
import useInput                 from "../utils/customHook";
import Notification             from "../utils/Notification";
import { LastLocationContext }  from "../index";
import "../index.css";


const Register = () => {
    const {lastLocation, setLastLocation} = useContext(LastLocationContext);
    const history                         = useHistory();
    const name                            = useInput();
    const surname                         = useInput();
    const email                           = useInput();
    const password                        = useInput();
    const [showPassword, setShowPassword] = useState(false);

    // const [name, setName]              = useState("");
    // const [email, setEmail]            = useState("");
    // const [password, setPass]          = useState("");

    // const handleNameChange  = (e) => setName(e.target.value);
    // const handleEmailChange = (e) => setEmail(e.target.value);
    // const handlePassChange  = (e) => setPass(e.target.value);

    useEffect(() => {
        setLastLocation("");
    }, []);

    const handleShowClick = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("api/auth/register", {
            name: (name.value.trim().charAt(0).toUpperCase() + name.value.trim().slice(1).toLowerCase()).trim(),
            surname: (surname.value.trim().charAt(0).toUpperCase() + surname.value.trim().slice(1).toLowerCase().trim()),
            email: email.value,
            password: password.value
        })
        .then(res => {
                if(res.data.name === "SequelizeValidationError") {
                    if(res.data.errors[0].message === "Validation len on password failed") {
                        Notification.errorMessage(`The password must contain between 8-20 characters.`);
                    }
                    if(res.data.errors[0].message === "Validation is on name failed") {
                        Notification.errorMessage(`Name must contain only letters.`);
                    }    
                    if(res.data.errors[0].message === "Validation is on surname failed") {
                        Notification.errorMessage(`Surname must contain only letters.`);
                    }    
                }
                else if(res.data.name === "SequelizeUniqueConstraintError") {
                    Notification.errorMessage(`The email already exists.`);
                }
                else {
                    console.log("PASA POR ACA 666 ?!?!?!")
                    Notification.successMessage("User created successfully");
                    history.push("/sign-in")
                }
            }
        ) 
        .catch(err => console.log(err) );
    };


    return(
        <div>
            <div className="container2">
                <h1 className="mt-5" style={{color:"#F5F5F5", fontSize:"35px"}}> Create your account </h1>
            </div>
            
            <div className="container2">
                <form className="signUpContainer" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control bg-dark text-white border border-secondary signUpInputs nameInput"
                            placeholder="Name*"
                            //value={name}
                            //onChange={handleNameChange}
                            {...name}
                            required  />
                    </div>
                   
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control bg-dark text-white border border-secondary signUpInputs nameInput"
                            placeholder="Surname*"
                            //value={name}
                            //onChange={handleNameChange}
                            {...surname}
                            required  />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control bg-dark text-white border border-secondary signUpInputs emailInput"
                            aria-describedby="emailHelp"
                            placeholder="E-mail*"
                            //value={email}
                            //onChange={handleEmailChange}
                            {...email}
                            required />
                    </div>

                    <div className="mb-3">
                        <div className="input-group mb-3">
                            <input
                                type={showPassword? "text" : "password"}
                                className="form-control bg-dark text-white border border-secondary signUpInputs passwordInput"
                                placeholder="Password*"
                                //value={password}
                                //onChange={handlePassChange}
                                {...password}
                                required 
                            />
                            <button className="btn btn-outline-secondary seePassword" type="button" id="button-addon2" onClick={handleShowClick}>
                                {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className={`btn btn-warning w-100 m-0 mt-4 ${!name.value || !surname.value || !email.value || !password.value ? 'disabled' : null}`}>
                        Sign up <i className="fa-solid fa-user-plus ps-1"></i>
                        </button>
                    </div>

                    <div className="mb-3">
                    <Link to="/sign-in" className="text-white" style={{textDecoration:"none"}}>
                        <p style={{fontSize:"0.8em"}}>Already have an account? Log in <i className="fa-solid fa-arrow-right-to-bracket ps-1"></i> </p>
                    </Link>
                    </div>

                </form>
            </div>
        </div>

    )
};

export default Register;

