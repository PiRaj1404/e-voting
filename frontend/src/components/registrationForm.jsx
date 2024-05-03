import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { register } from "../apis";



// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  // const [passwordVisible, setPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState([]);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const residentialAddressRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const termsCheckedRef = useRef(null);

  useEffect(() => {
    if (errors.length > 0) {
      switch (errors[0]) {
        case "Name is required":
          fullNameRef.current.focus();
          break;
        case "Email is required":
        case "Invalid email":
          emailRef.current.focus();
          break;
        case "Address is required":
          residentialAddressRef.current.focus();
          break;
        case "Date of birth is required":
        case "Please enter a valid date of birth":
        case "Date of birth cannot be in the future":
        case "You must be at least 10 years old":
          dateOfBirthRef.current.focus();
          break;
        case "Password is required":
        case "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 digit":
          passwordRef.current.focus();
          break;
        case "Re-Password is required":
        case "Passwords do not match":
          confirmPasswordRef.current.focus();
          break;
        case "You must agree to the terms and conditions":
          termsCheckedRef.current.focus();
          break;
        default:
          break;
      }
    }
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const body = {
      name: fullName,
      email,
      address: residentialAddress,
      dob: dateOfBirth,
      password,
      repassword: confirmPassword,
      termsChecked,
    };

   
    try {
      const response = await axios.post(register, body);
      if (response.data.isError) {
        setErrors(response.data.data);
      }
    } catch (e) {
      setErrors(e.response.data.data);
    }
  };
  const renderError = (error) => (
    <div className="invalid-feedback" key={error}>
      {error}
    </div>
  );

  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.includes("Name is required") ? "is-invalid" : ""
                    }`}
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    ref={fullNameRef}
                  />
                  {errors.includes("Name is required") && (
                    <div className="invalid-feedback">Name is required</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.includes("Email is required") ||
                      errors.includes("Invalid email")
                        ? "is-invalid"
                        : ""
                    }`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
                  />
                  {(errors.includes("Email is required") ||
                    errors.includes("Invalid email")) && (
                    <div className="invalid-feedback">
                      {errors.includes("Email is required")
                        ? "Email is required"
                        : "Invalid email"}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="residentialAddress" className="form-label">
                    Residential Address:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.includes("Address is required") ? "is-invalid" : ""
                    }`}
                    id="residentialAddress"
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    ref={residentialAddressRef}
                  />
                  {errors.map(
                    (error) =>
                      error === "Address is required" && renderError(error)
                  )}
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.includes("Date of birth is required") ||
                      errors.includes("Please enter a valid date of birth") ||
                      errors.includes(
                        "Date of birth cannot be in the future"
                      ) ||
                      errors.includes("You must be at least 10 years old")
                        ? "is-invalid"
                        : ""
                    }`}
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    ref={dateOfBirthRef}
                  />
                  {errors.map(
                    (error) =>
                      (error === "Date of birth is required" ||
                        error === "Please enter a valid date of birth" ||
                        error === "Date of birth cannot be in the future" ||
                        error === "You must be at least 10 years old") &&
                      renderError(error)
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>

                  <input
                    // type={passwordVisible ? "text" : "password"}
                    type= "password"
                    className={`form-control ${
                      errors.includes("Password is required") ||
                      errors.includes(
                        "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 digit"
                      )
                        ? "is-invalid"
                        : ""
                    }`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                  />

                  {errors.map(
                    (error) =>
                      (error ===
                        "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 digit" ||
                        error === "Password is required") &&
                      renderError(error)
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>

                  <input
                    // type={confirmPasswordVisible ? "text" : "password"}
                    type="password"
                    className={`form-control ${
                      errors.includes("Re-Password is required") ||
                      errors.includes("Passwords do not match")
                        ? "is-invalid"
                        : ""
                    }`}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={confirmPasswordRef}
                  />

                  {errors.map(
                    (error) =>
                      (error === "Re-Password is required" ||
                        error === "Passwords do not match") &&
                      renderError(error)
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${
                      errors.includes(
                        "You must agree to the terms and conditions"
                      )
                        ? "is-invalid"
                        : ""
                    }`}
                    id="termsChecked"
                    checked={termsChecked}
                    onChange={() => setTermsChecked(!termsChecked)}
                  />
                  <label className="form-check-label" htmlFor="termsChecked">
                    I agree to the terms and conditions
                  </label>
                  {errors.includes(
                    "You must agree to the terms and conditions"
                  ) &&
                    renderError("You must agree to the terms and conditions")}
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
