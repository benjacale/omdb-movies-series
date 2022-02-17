import React                     from "react";
import {useState, createContext} from "react";
import {render}                  from "react-dom";
import {BrowserRouter}           from 'react-router-dom'
import App                       from "./App";
import "./index.css";


export const UserContext         = createContext({});
export const LastLocationContext = createContext("");

const Root = () => {
  const [user, setUser]                 = useState({});
  const [lastLocation, setLastLocation] = useState("");

  return(
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
      <LastLocationContext.Provider value={{lastLocation, setLastLocation}}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </LastLocationContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
};


export default render(<Root />, document.getElementById("root"));