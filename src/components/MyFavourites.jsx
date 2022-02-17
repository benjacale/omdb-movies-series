import React, { useContext } from "react";
import { Link }              from "react-router-dom";
import { UserContext }       from "../index";
import Movies                from "./Movies";

const MyFavourites = () => {
    const {user}    = useContext(UserContext)

    return (
        <div>
            <h2 className="container1"> My Favourites </h2>
            {(user.favourites.length >= 1) ? <Movies movies={user.favourites} /> : <div className="container2 mt-3 d-flex flex-column">
                <p> No movie or serie has been added. </p>
                <Link to="/">
                    <button className="btn btn-warning m-0 mt-4"> Search something to add </button>
                </Link>
            </div>}
        </div>
    )
};


export default MyFavourites;