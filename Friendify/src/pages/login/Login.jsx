import React, { useContext } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const {currentUser,login}= useContext(AuthContext)

  const handleLogin = ()=>{
    login();
  }
  
  return (
    <div className="login">
      <div className="card">
        {/* left section */}
        <div className="left">
          <h1>Welcome Here</h1>
          <p>
            If you have a specific code editor or IDE in mind, please let me
            know, and I can provide more detailed instructions on enabling
            auto-completion for React-related code in that specific editor.
          </p>
          <span>Do you have an account?</span>
          <Link to={"/register"}>
            <button type="button">Register</button>
          </Link>
        </div>

        {/* right section  */}
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </form>
          <button type="button" onClick={()=>handleLogin()}>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
