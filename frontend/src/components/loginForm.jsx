import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { login } from "../apis";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [token, setToken] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };


    axios.post(login, body)
  .then(response => {
    if(!response.data.isError){
     
    }
    else{
      
      setErrors(response.data.message)
    }
  
  })
  .catch(error => {
    console.log("Cstch :: ",error.response.data.message)

    setErrors(error.response.data.message)

  });

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>

                  <input
                    // type={passwordVisible ? "text" : "password"}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {errors && <div className="text-danger my-2">{errors}</div>}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!email || !password}
                >
                  Login
                </button>
              </form>
              <p className="mt-3">
                <a href="#forgot-password">Forgot your password?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
