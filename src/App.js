import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import UserContext from "./UserContext"; 
import './App.css';
import JoBeeApi from "./api";
import jwt from "jsonwebtoken"

/**
 *  App: 
 *  - Makes API calls to get the current user, stores the user's token, and sets the current user.
 *  - Current user is passed to other components via UserContext
 *  
 *  App -> [NavBar, Routes]
 * 
 */

function App() {
  
  const initialToken = localStorage.getItem("token") || null;  
  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState("fetching");

  /**  
   *   Makes API call to get the current user given a username and token.
   *   Sets the currentUser.
   */
  useEffect(function updateUserWithTokenChange() {   
    async function fetchCurrentUser(token) { 
      setCurrentUser("fetching");

      try {
        // For mock tokens, extract username differently
        let username = "testuser"; // Default mock user
        
        // If token is a real JWT (contains dots), decode it
        if (token.includes(".")) {
          let decoded = jwt.decode(token);
          username = decoded.username || "testuser";
        }
        
        let user = await JoBeeApi.getCurrentUser(username);
        setCurrentUser(user);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setCurrentUser({});
      }
    }
 
    if (token) fetchCurrentUser(token);
    if (!token) setCurrentUser({});
  }, [token]);

  /**  
   *   Makes API call to log in the current user given a username and password.
   *   Sets the token and gets the currentUser.
   */
  async function logIn({ username, password }) {
    let newToken = await JoBeeApi.login(username, password);
    setToken(newToken);
    return localStorage.setItem("token", newToken);
  }

  /**  
   *   Makes API call to register a user given a username, password, firstName, 
   *   lastName and email.
   *   Sets the token and gets the currentUser.
   */
  async function register({ username, password, firstName, lastName, email }) {
    let newToken = await JoBeeApi.register(username, password, firstName, lastName, email);
    setToken(newToken);
    return localStorage.setItem("token", newToken);
  }

  /**  
   *   Logs the currentUser out by resetting the token and currentUser to null.
   */
  function logOut() {
    setToken(null);
    return localStorage.setItem("token", "");
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser }}> 
        <BrowserRouter>
          {currentUser === "fetching" ?
            <i>loading...</i>
            :
            <div>
              <NavBar logOut={logOut} /> 
              <Routes logIn={logIn} register={register} />
            </div> }
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

