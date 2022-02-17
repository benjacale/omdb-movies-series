import React, { useContext } from "react";
import { useEffect }         from "react";
import { useState }          from "react";
import { Link }              from "react-router-dom";
import axios                 from "axios";
import { UserContext }       from "../index";


const MyFavourites = () => {
    const {user}                      = useContext(UserContext);
    const [search, setSearch]         = useState( {input: ""} );
    const [allUsers, setAllUsers]     = useState([]);
    const [usersFound, setUsersFound] = useState([]);

    const handleChange = (e) => {
        setSearch({
            [e.target.localName]: e.target.value,
          });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = allUsers.filter(user => user.name.toLowerCase() === (search.input.toLowerCase()).trim() || user.surname.toLowerCase() === (search.input.toLowerCase()).trim());
        users.length >=1 ? setUsersFound(users) : setUsersFound(false);
    };

    useEffect(() => {
        axios.get(`/api/users`)
        .then(res => setAllUsers(res.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="container2 d-flex flex-column">
            <h2 className="container1 mb-5 mt-5"> Search User </h2>
            <form className="d-flex w-100 mb-5" onSubmit={handleSubmit}>
                <input
                    className="form-control bg-dark border border-secondary text-white searchInput w-75"
                    style={{margin:"0 auto", height:"60px", fontSize:"15px"}}
                    type="search"
                    placeholder="Search by Name or Surname..."
                    aria-label="Search"
                    onChange={handleChange}
                />
            </form>

            <div>
                <div className="d-flex flex-wrap justify-content-center">
                    {usersFound !== false && usersFound?.map(userFound => 
                        <div> 
                           {userFound?.name != user.name && userFound?.surname != user.surname ? (
                               <Link to={`/me/search-users/${userFound?.id}/favourites`} style={{textDecoration:"none"}}>
                               <div className="p-5">
                                       <div className="usersFoundCards">
                                           <div className="pb-5 mb-5 text-light">
                                               <i className="bi bi-person-fill" style={{fontSize:"100px"}}></i>
                                               <h5 className="ps-3 pe-3"> {userFound?.name} {userFound?.surname} </h5>
                                           </div>
                                           <div className="d-flex justify-content-center pe-3 text-secondary">
                                               <p className="fw-bold ps-3 pb-2" style={{fontSize:"15px"}}> VIEW FAVOURITES </p>
                                               <i className="fa-solid fa-circle-chevron-right ms-5"></i>
                                           </div>
                                       </div>
                                   </div>
                               </Link>
                           ) : <i className="bi bi-emoji-frown text-danger"> No matches found. Please, try again. </i>
                           }
                        </div>
                    )
                    }
                    {(usersFound === false) && (<i className="bi bi-emoji-frown text-danger"> No matches found. Please, try again. </i>)}
                </div>

            </div>

        </div>
    )
};


export default MyFavourites;