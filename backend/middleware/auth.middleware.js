import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(500).json({ message: "Token not Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ message: "Authorization Failed" });
  }
};

export default auth;
