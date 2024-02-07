import React, { useContext , useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const [input,setInput] = useState({
    username : '',
    password : '',
  })

  //err state...
  const [err,setErr] = useState(null);


  //handleinput function..
  const handleOnChange = (event) =>{
    setInput((prev)=>{
      return {
        ...prev , [event.target.name]: event.target.value
      }
    })
  }

  console.log(input)

  //--------------------------------------------------------------------------------------------
  const {currentUser,login}= useContext(AuthContext)

  const handleLogin = async (e)=>{
    // e.preventDefault();
    try{
      await login(input)
    }catch(err){
      setErr(err.response.data);
    }
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
            <input type="text" placeholder="Username" name="username" onChange={handleOnChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleOnChange} />
            {err && err}
          </form>
          <button type="button" onClick={()=>handleLogin()}>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
