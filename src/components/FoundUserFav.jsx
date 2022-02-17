import React, { useEffect }     from "react";
import { useState }             from "react";
import { useParams }            from "react-router";
import { Link }                 from "react-router-dom";
import axios                    from "axios";
import Movies                   from "./Movies";

const FoundUserFav = () => {
    const [selectedUser, setSelectedUser] = useState({});
    const { id }                          = useParams();


    useEffect(() => {
        axios.get(`/api/users/${id}`)
        .then(res => setSelectedUser(res.data))
        .catch(err => console.log(err))
    }, []);
    
    return (
        <div>
            <h2 className="container1 ps-2 pe-2 text-center"> {selectedUser.name?.toUpperCase()} {selectedUser.surname?.toUpperCase()}'s list </h2>
            {(selectedUser.favourites?.length >= 1) ? <Movies movies={selectedUser.favourites} /> : <div className="container2 mt-3 d-flex flex-column">
                <p> No movie or serie has been added. </p>
                <Link to="/me/search-users">
                    <button className="btn btn-warning m-0 mt-4"> Search another user </button>
                </Link>
            </div>}
        </div>
    )
};


export default FoundUserFav;