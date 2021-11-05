import React, {useEffect, useContext} from "react";
import {Route, Switch, Redirect}      from "react-router-dom";
import axios                          from "axios";
import {log, success, error}          from "./utils/logs";

import Navbar        from "./components/Navbar";
import Register      from "./components/Register";
import Login         from "./components/Login";
import Home          from "./components/Home";
import Secret        from "./components/Secret";
import Search        from "./components/Search";
import SingleMovie   from "./components/SingleMovie";
import {UserContext} from "./index";


const App = () => {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
      log(`fetching user...`);
      axios
        .get("/api/auth/me")
        .then((res) => res.data)
        .then((user) => {
          success(`found user ${user.email}`);
          setUser(user);
        })
        .catch(({ response }) => {
          error(response.status, response.statusText);
        });
    }, []);

    return(
        <div>
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/home"    component={Home} />
                    <Route exact path="/sign-up" component={Register} />
                    <Route exact path="/sign-in" component={Login} />
                    <Route exact path="/secret"  component={Secret} />
                    <Route exact path="/search/:input" render={() => <Search />} />
                    <Route exact path="/search/:movieTitle/:movieId" render={ ({match}) => <SingleMovie movieId={match.params.id} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        </div>
    )
};

export default App;