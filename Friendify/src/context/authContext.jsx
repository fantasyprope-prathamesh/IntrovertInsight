import { createContext, useEffect, useState } from "react";
import UserImg from '../assets/logo2.png';
import axios from 'axios'
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {

    // console.log("i am also trying here",inputs)

    const res = await axios.post("http://localhost:8005/api/auth/login", inputs, {
      withCredentials: true
    })

    console.log('res.data',res.data);
    setCurrentUser(res.data);

    // setCurrentUser({id:1,name:"Patil",profilePicture:"chrome-extension://fcejkolobdcfbhhakbhajcflakmnhaff/static/logo.png"})
  };
  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
