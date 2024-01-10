import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        {/* left section */}
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
          </form>
          <button type="button">Register</button>
        </div>

        {/* right section  */}
        <div className="left">
          <h1>Techno Patu</h1>
          <p>
            If you have a specific code editor or IDE in mind, please let me
            know, and I can provide more detailed instructions on enabling
            auto-completion for React-related code in that specific editor.
          </p>
          <span>Do you have an account?</span>
          <Link to={"/login"}>
            <button type="button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
