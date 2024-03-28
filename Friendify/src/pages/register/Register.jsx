import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from 'axios'

const Register = () => {
  //sates for inputs..
  const [input,setInput] = useState({
    username : '',
    email : '',
    password : '',
    name : ''
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

  // console.log(input);

  //handleClick..
  const handleClick = async(event)=>{
    // event.preventDefault();

    //make api requeste to backend..

    try{
      // console.log("heee")
      await axios.post('http://localhost:8005/api/auth/register',input)
   
    } 
    catch(erro){
      setErr(erro.response.data)
      console.log(erro.response.data);
    }
  }

  return (
    <div className="register">
      <div className="card">
        {/* left section */}
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleOnChange} />
            <input type="email" placeholder="Email" name="email"  onChange={handleOnChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleOnChange} />
            <input type="text" placeholder="Name" name="name" onChange={handleOnChange} />
            {err && err}
          </form>
          <button type="button" onClick={()=>handleClick()}>Register</button>
        </div>

        {/* right section  */}
        <div className="left">
          <h1>Friendify</h1>
          <p>
          Discover, connect, and share. Experience the joy of connecting with friends on our social platform!
          </p>
          <span>Do you have an account?</span>
          <Link to={"/login"}>
            <button type="button" >Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
