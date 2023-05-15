import Register from "./Register";
import axios from 'axios';
import { UserContext, UserContextWrapper } from "./UserContext";
import { useContext, useEffect } from "react";

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;


  return (
    <UserContextWrapper>
    <Register/>
    </UserContextWrapper>
  );
}

export default App;
