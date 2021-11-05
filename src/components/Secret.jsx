import React, {useContext, useEffect} from "react";
import axios                          from "axios";
import {log, success, error}          from "../utils/logs";
import { UserContext }                from "../index";
import { useHistory }                 from "react-router-dom"
import Movies from "./Movies";


const Secret = () => {
    const {user}    = useContext(UserContext)
    const {setUser} = useContext(UserContext);
    const history   = useHistory()

    useEffect(() => {
        log("Secret attempt...");
        axios.get("/api/auth/secret")
        .then(res => res.data)
        //.then(user => setUser(user))
        .then((user) => {
            console.log("UUUSER", user)
            success(
              `Hello , again, welcome to the Aperture Science computer-aided enrichment center.`
            );
          })
        .catch(({ response }) => {
            error(response.status, response.statusText);
        });
    }, []);


    return (
        <div>
            <div className="container2">
                <h1> My Profile </h1>
            </div>
                
            <div>
                <p className="titleFavMov"> My favourites movies </p>
                {console.log("Usuariooo", user)}

                {user.favourites? <Movies movies={user.favourites} /> : <h2 className='userTitle'>No favorites added</h2>}
            </div>
        </div>
    )
};


export default Secret;