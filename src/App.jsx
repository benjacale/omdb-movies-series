import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect }      from "react-router-dom";
import axios                            from "axios";
import Navbar                           from "./components/Navbar";
import Register                         from "./components/Register";
import Login                            from "./components/Login";
import Home                             from "./components/Home";
import Me                               from "./components/Me";
import MyFavourites                     from "./components/MyFavourites";
import PersonalInfo                     from "./components/PersonalInfo";
import SearchUsers                      from "./components/SearchUsers";
import FoundUserFav                     from "./components/FoundUserFav";
import Search                           from "./components/Search";
import SingleMovie                      from "./components/SingleMovie";
import { UserContext }                  from "./index";
import { error }                        from "./utils/logs";


const App = () => {
    const {setUser} = useContext(UserContext);

    useEffect(() => {
      axios.get("/api/auth/me")
      .then(res => res.data)
      .then(user => setUser(user) )
      .catch( ({response}) => error(response.status, response.statusText) );
    }, []);

    return (
        <div className="container-fluid p-0">
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/sign-up" component={Register} />
                    <Route exact path="/sign-in" component={Login} />
                    <Route exact path="/me"  component={Me} />
                    <Route exact path="/me/my-favourites" component={MyFavourites} />
                    <Route exact path="/me/search-users" component={SearchUsers} />
                    <Route exact path="/me/search-users/:id/favourites" component={FoundUserFav} />
                    <Route exact path="/me/personal-information" component={PersonalInfo} />
                    <Route exact path="/search/:input" render={() => <Search />} />
                    <Route exact path="/search/:movieTitle/:movieId" render={ ({match}) => <SingleMovie movieId={match.params.id} />} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    )
};

export default App;