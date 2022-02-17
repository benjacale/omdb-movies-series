import React, { useContext } from "react";
import { UserContext }       from "../index";
import { Link }              from "react-router-dom";

const Me = () => {
    const {user} = useContext(UserContext)

    return (
        <div>
            <div className="container container1">
                <i className="bi bi-person-bounding-box" style={{fontSize:"80px"}}></i>
            </div>
            <div className="container2 fs-2">
                <p className="mb-0" style={{fontFamily:"'Rammetto One', cursive"}}> {user.name} {user.surname} </p>
            </div>
            <div className="container2">
                <p style={{fontSize:"16px", letterSpacing:"1px", fontFamily:"'Rammetto One', cursive"}}> MY PROFILE </p>
            </div>


            <div className="bg-secondary d-flex mt-5" style={{height:"100%"}}>
                <div className="row mt-5 mb-5 ps-5 pe-5 text-dark">
                    <div className="col-sm-4 mb-2">
                        <Link to="/me/my-favourites"style={{textDecoration:"none"}} >
                                <div className="card" style={{backgroundColor:"#f8f8ff"}}>
                                    <div className="card-body profileCards pb-0">
                                        <h5 className="card-title text-primary"> My favourites </h5>
                                        <p className="card-text text-dark"> If you like a movie or serie, you can add it to favourites and find it in this section. </p>
                                        <div className="d-flex justify-content-between pe-3 mt-4 text-dark">
                                            <p className="fw-bold" style={{fontSize:"15px"}}> VIEW AND EDIT </p>
                                            <i className="fa-solid fa-circle-chevron-right"></i>
                                        </div>
                                    </div>
                                </div>
                        </Link>
                    </div>
                    <div className="col-sm-4 mb-2">
                        <Link to="/me/search-users" style={{textDecoration:"none"}} >
                                <div className="card" style={{backgroundColor:"#f8f8ff"}}>
                                <div className="card-body profileCards pb-0">
                                    <h5 className="card-title text-primary"> Other users </h5>
                                    <p className="card-text text-dark"> Search and view the profile of a specific user with their favourite movies or series. </p>
                                    <div className="d-flex justify-content-between pe-3 mt-4 text-dark">
                                        <p className="fw-bold" style={{fontSize:"15px"}}> SEARCH </p>
                                        <i className="fa-solid fa-circle-chevron-right"></i>
                                    </div>
                                </div>
                                </div>
                        </Link>
                    </div>

                    <div className="col-sm-4 mb-2">
                        <Link to="/me/personal-information" style={{textDecoration:"none"}} >
                            <div className="card" style={{backgroundColor:"#f8f8ff"}}>
                            <div className="card-body profileCards pb-0">
                                <h5 className="card-title text-primary"> Personal information </h5>
                                <p className="card-text text-dark"> View and change your email and other personal data. </p>
                                <div className="d-flex justify-content-between pe-3 mt-4 text-dark">
                                    <p className="fw-bold" style={{fontSize:"15px"}}> VIEW AND EDIT </p>
                                    <i className="fa-solid fa-circle-chevron-right"></i>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Me;