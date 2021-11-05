import React                     from "react";
import {useState, createContext} from "react";
import {render}                  from "react-dom";
import {BrowserRouter}           from 'react-router-dom'
import App                       from "./App";
import "./index.css";


export const UserContext = createContext({});

const Root = () => {
  const [user, setUser] = useState({});

  return(
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
      </UserContext.Provider>
    </BrowserRouter>
  )
};


export default render(<Root />, document.getElementById("root"));