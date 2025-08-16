const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Use cookie

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach to req
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
