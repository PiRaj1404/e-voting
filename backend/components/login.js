const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../modals/userSchema");
const Cookies = require("js-cookie");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and/or password is incorrect",
        data: null,
        isError: true,
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Email and/or password is incorrect",
        data: null,
        isError: true,
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (passwordMatch) {
      const refreshToken = jwt.sign(
        {
          email,
          voterId: existingUser._id.toString(),
          publicKey: existingUser.publicKey,
        },
        process.env.REFRESH_KEY,
        {
          expiresIn: "1y",
        }
      );
      const accessToken = jwt.sign(
        {
          email,
          voterId: existingUser._id.toString(),
          publicKey: existingUser.publicKey,
        },
        process.env.ACCESS_KEY,
        {
          expiresIn: "7d",
        }
      );

      // Set cookies with secure and sameSite options for improved security
      Cookies.set("rt", refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      Cookies.set("at", accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });

      return res.status(200).json({
        message: "Login successful",
        data: null,
        isError: false,
      });
    } else {
      return res.status(400).json({
        message: "Email and/or password is incorrect",
        data: null,
        isError: true,
      });
    }
  } catch (e) {
    console.error("Error while logging in:", e);
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      isError: true,
    });
  }
};

module.exports = { loginUser };
