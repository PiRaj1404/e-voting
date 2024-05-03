const bcrypt = require("bcrypt");
const { User } = require("../modals/userSchema");
const { userValidation } = require("./validations/registerValidations");
const { publicKey, privateKey } = require("./blockchain/walletGeneration");
const { sendRegistrationEmail } = require("./sendEmail");


const registerUser = async (req, res) => {
  // console.log(req.body)
  const errorMsgs = userValidation(req);
  const { name, email, address, dob, password } = req.body;
  if (errorMsgs.length > 0) {
    console.log(errorMsgs);
    return res
      .status(400)
      .json({ message: null, data: errorMsgs, isError: true });
  } else {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        errorMsgs.push("Email already in use");
        return res
          .status(400)
          .json({ message: null, data: errorMsgs, isError: true });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const { success: emailSuccess  } = await sendRegistrationEmail(email, publicKey);

      if (emailSuccess) {
        const newUser = new User({
          name,
          email,
          address,
          dob,
          password: hashedPassword,
          publicKey,
        });
        await newUser.save();

        return res.status(200).json({
          message: "User registered successfully.",
          data: null,
          isError: false,
        });
      } else {
        // console.error("Error sending email:", result.message);
        return res
          .status(500)
          .json({ message: "Error sending registration email", data: null, isError: true });
      }
    } catch (e) {
      // console.log("Error in catch while registering :: ", e);
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: null, isError: true });
    }
  }
};

module.exports = { registerUser };
