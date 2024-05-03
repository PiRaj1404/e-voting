const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access token is missing", data: null, isError: true });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access token is invalid or expired",
      data: null,
      isError: true,
    });
  }
};

module.exports = { verifyAccessToken };
