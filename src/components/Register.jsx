import React                 from "react";
import {useHistory}          from "react-router";
import {Link}                from "react-router-dom";
import axios                 from "axios";
import useInput              from "../utils/customHook";
import {log, success, error} from "../utils/logs";
import "../index.css";


const Register = () => {
    const history = useHistory();

    // const [name, setName]   = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPass]   = useState("");
    const name      = useInput();
    const email     = useInput();
    const password  = useInput();

    // const handleNameChange = (e) => setName(e.target.value);
    // const handleEmailChange = (e) => setEmail(e.target.value);
    // const handlePassChange = (e) => setPass(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        log("Register attempt...");
        axios.post("api/auth/register", {
            name: name.value,
            email: email.value,
            password: password.value
        })
        .then(res => res.data) 
        .then( () => success(`New user registered.`))
        .then( () => history.push("/sign-in") )
        .catch(err => error(err.status, err.statusText) );
    }


    return(
        <div>
            <div className="container2">
                <h1> Create your account </h1>
            </div>
            
            <div className="container2">
                <form className="signUpContainer" onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            //value={name}
                            //onChange={handleNameChange}
                            {...name}
                            required  />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email address"
                            //value={email}
                            //onChange={handleEmailChange}
                            {...email}
                            required />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            //value={password}
                            //onChange={handlePassChange}
                            {...password}
                            required />
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary"> Sign up </button>
                    </div>

                    <div className="mb-3">
                        Already have an account? <Link to="/sign-in">Sign in</Link>
                    </div>

                </form>
            </div>
        </div>

    )
};

export default Register;

