import { createContext, useEffect, useState } from "react";
import UserImg from '../assets/logo2.png';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    setCurrentUser({id:1,name:"Patil",profilePicture:"chrome-extension://fcejkolobdcfbhhakbhajcflakmnhaff/static/logo.png"})
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
