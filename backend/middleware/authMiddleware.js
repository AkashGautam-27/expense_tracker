import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.json({ success: false, message: "No token provided" });
  }

  // token format: "Bearer xxxxxx"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded = { id: "...", iat: .., exp: .. }
    next();
  } catch (err) {
    return res.json({ success: false, message: "Invalid token" });
  }
}
