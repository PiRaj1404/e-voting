const validator = require("validator");
const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(50)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits();


function isValidEmail(email) {
  return validator.isEmail(email);
}

function isValidDate(date) {
  const dob = new Date(date);
  return !isNaN(dob.getTime());
}

function isValidPassword(password) {
  return passwordSchema.validate(password);
}

module.exports = {
  isValidDate,
  isValidEmail,
  isValidPassword,
};
