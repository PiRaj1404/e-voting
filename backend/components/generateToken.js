const jwt = require("jsonwebtoken");
const { User } = require("../modals/userSchema");
const Cookies = require("js-cookie");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      voterId: user._id.toString(),
      publicKey: user.publicKey,
    },
    process.env.ACCESS_KEY,
    {
      expiresIn: "7d",
    }
  );
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = Cookies.get("rt");

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token is missing",
        data: null,
        isError: true,
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);

    const user = await User.findById(decoded.voterId);

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
        data: null,
        isError: true,
      });
    }

    const newAccessToken = generateAccessToken(user);

    return res.status(200).json({
      message: "Access token refreshed successfully",
      data: { accessToken: newAccessToken },
      isError: false,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
      data: null,
      isError: true,
    });
  }
};

module.exports = { refreshAccessToken };
