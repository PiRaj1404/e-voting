const checkUserDetails = require("./userDetails");

const userValidation = (req) => {
  const errorMsgs = [];
  const { name, email, address, dob, password, repassword,termsChecked} = req.body;

  if (!name) {
    errorMsgs.push("Name is required");
  }

  if (!email) {
    errorMsgs.push("Email is required");
  } else if (!checkUserDetails.isValidEmail(email)) {
    errorMsgs.push("Invalid email");
  }

  if (!address) {
    errorMsgs.push("Address is required");
  }

  if (!dob) {
    errorMsgs.push("Date of birth is required");
  } else {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 10);

    if (birthDate > currentDate) {
      errorMsgs.push("Date of birth cannot be in the future");
    } else if (birthDate > minAgeDate) {
      errorMsgs.push("You must be at least 10 years old");
    }
  }

  if (!password) {
    errorMsgs.push("Password is required");
  } else if (!checkUserDetails.isValidPassword(password)) {
    errorMsgs.push(
      "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 digit"
    );
  }

  if (!repassword) {
    errorMsgs.push("Re-Password is required");
  }

  if (password !== repassword) {
    errorMsgs.push("Passwords do not match");
  }

  if(!termsChecked){
    errorMsgs.push("You must agree to the terms and conditions");
  }
  return errorMsgs;
};

module.exports = { userValidation };
